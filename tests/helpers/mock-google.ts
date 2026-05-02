import { vi } from "vitest";
import type { Google } from "../../src/plugin/types";
import config from "../../src/plugin/config";

export type MockGoogleHandles = {
  google: Google;
  initialize: ReturnType<typeof vi.fn>;
  renderButton: ReturnType<typeof vi.fn>;
  prompt: ReturnType<typeof vi.fn>;
  disableAutoSelect: ReturnType<typeof vi.fn>;
  initCodeClient: ReturnType<typeof vi.fn>;
  initTokenClient: ReturnType<typeof vi.fn>;
};

/**
 * Minimal fake Google Identity Services object used across tests.
 */
export function createMockGoogle(): MockGoogleHandles {
  const initialize = vi.fn();
  const renderButton = vi.fn();
  const prompt = vi.fn();
  const disableAutoSelect = vi.fn();

  const initCodeClient = vi.fn((cfg: { callback?: (r: { code: string }) => void }) => ({
    requestCode: vi.fn(() => {
      cfg.callback?.({
        code: "test-auth-code",
        authuser: "0",
        prompt: "",
        scope: config.scopes,
      });
    }),
  }));

  const initTokenClient = vi.fn(
    (cfg: {
      callback?: (r: {
        access_token: string;
        authuser: string;
        expires_in: number;
        prompt: string;
        scope: string;
        token_type: string;
      }) => void;
    }) => ({
      requestAccessToken: vi.fn(() => {
        cfg.callback?.({
          access_token: "test-access-token",
          authuser: "0",
          expires_in: 3600,
          prompt: "",
          scope: config.scopes,
          token_type: "Bearer",
        });
      }),
    })
  );

  const google = {
    accounts: {
      id: {
        initialize,
        renderButton,
        prompt,
        disableAutoSelect,
      },
      oauth2: {
        initCodeClient,
        initTokenClient,
      },
    },
  } as unknown as Google;

  return {
    google,
    initialize,
    renderButton,
    prompt,
    disableAutoSelect,
    initCodeClient,
    initTokenClient,
  };
}

/**
 * Intercepts GIS script injection and fires `load` so `loadGApi()` resolves without a network call.
 */
export function installGsiScriptLoadInterceptor(
  getMockGoogle: () => Google
): () => void {
  const headAppend = document.head.appendChild.bind(document.head);
  const spy = vi
    .spyOn(document.head, "appendChild")
    .mockImplementation((node: Node) => {
      const el = node as HTMLScriptElement;
      if (
        el.tagName === "SCRIPT" &&
        typeof el.src === "string" &&
        el.src.includes("accounts.google.com/gsi/client")
      ) {
        (window as unknown as { google: Google }).google = getMockGoogle();
        queueMicrotask(() => {
          el.dispatchEvent(new Event("load"));
        });
        return el;
      }
      return headAppend(node) as HTMLElement;
    });

  return () => {
    spy.mockRestore();
  };
}
