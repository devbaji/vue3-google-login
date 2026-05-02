import { vi } from "vitest";
import type { Google } from "@/types";
import type { CodePopupResponse, TokenPopupResponse } from "@/callbackTypes";
import config from "@/config";

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

  const initCodeClient = vi.fn(
    (cfg: { callback?: (r: CodePopupResponse) => void }) => ({
      requestCode: vi.fn(() => {
        const response: CodePopupResponse = {
          code: "test-auth-code",
          authuser: "0",
          prompt: "",
          scope: config.scopes,
        };
        cfg.callback?.(response);
      }),
    })
  );

  const initTokenClient = vi.fn(
    (cfg: { callback?: (r: TokenPopupResponse) => void }) => ({
      requestAccessToken: vi.fn(() => {
        const response: TokenPopupResponse = {
          access_token: "test-access-token",
          authuser: "0",
          expires_in: 3600,
          prompt: "",
          scope: config.scopes,
          token_type: "Bearer",
        };
        cfg.callback?.(response);
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
