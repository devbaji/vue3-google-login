import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createApp, nextTick } from "vue";
import { mount, flushPromises } from "@vue/test-utils";
import vue3GoogleLogin from "@/index";
import GoogleLogin from "@/components/GoogleLogin.vue";
import {
  createMockGoogle,
  installGsiScriptLoadInterceptor,
} from "./helpers/mock-google";
import { resetPluginAndLibraryState } from "./helpers/reset-state";

describe("vue3GoogleLogin plugin install", () => {
  let restoreAppend: (() => void) | undefined;
  let mock: ReturnType<typeof createMockGoogle>;

  beforeEach(() => {
    resetPluginAndLibraryState();
    mock = createMockGoogle();
    restoreAppend = installGsiScriptLoadInterceptor(() => mock.google);
  });

  afterEach(() => {
    restoreAppend?.();
    resetPluginAndLibraryState();
  });

  it("initializes GIS with client id and FedCM flag", async () => {
    const callback = vi.fn();
    const app = createApp({ template: "<div/>" });
    app.use(vue3GoogleLogin, {
      clientId: "plugin-client-id",
      callback,
    });
    await flushPromises();

    expect(mock.initialize).toHaveBeenCalled();
    const cfg = mock.initialize.mock.calls[0][0] as {
      client_id: string;
      use_fedcm_for_prompt: boolean;
      callback: unknown;
    };
    expect(cfg.client_id).toBe("plugin-client-id");
    expect(cfg.use_fedcm_for_prompt).toBe(true);
    expect(cfg.callback).toBe(callback);
  });

  it("calls prompt when plugin option prompt is true", async () => {
    const app = createApp({ template: "<div/>" });
    app.use(vue3GoogleLogin, {
      clientId: "plugin-client-id",
      callback: vi.fn(),
      prompt: true,
    });
    await flushPromises();
    expect(mock.prompt).toHaveBeenCalled();
  });

  it("invokes install error handler when the GIS script fails to load", async () => {
    restoreAppend?.();
    resetPluginAndLibraryState();

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
          queueMicrotask(() => {
            el.dispatchEvent(new Event("error"));
          });
          return el;
        }
        return headAppend(node) as HTMLElement;
      });

    const onError = vi.fn();
    const app = createApp({ template: "<div/>" });
    app.use(vue3GoogleLogin, {
      clientId: "plugin-client-id",
      callback: vi.fn(),
      error: onError,
    });
    await flushPromises();
    expect(onError).toHaveBeenCalled();

    spy.mockRestore();
  });
});

describe("GoogleLogin component", () => {
  let restoreAppend: (() => void) | undefined;
  let mock: ReturnType<typeof createMockGoogle>;

  beforeEach(() => {
    resetPluginAndLibraryState();
    mock = createMockGoogle();
    restoreAppend = installGsiScriptLoadInterceptor(() => mock.google);
  });

  afterEach(() => {
    restoreAppend?.();
    resetPluginAndLibraryState();
  });

  it("calls renderButton with the host element and merged button config", async () => {
    const callback = vi.fn();
    mount(GoogleLogin, {
      props: {
        clientId: "comp-client",
        callback,
        buttonConfig: { theme: "filled_blue", size: "small" },
      },
    });
    await flushPromises();
    await nextTick();

    expect(mock.renderButton).toHaveBeenCalledTimes(1);
    const [el, cfg] = mock.renderButton.mock.calls[0] as [
      HTMLElement,
      Record<string, unknown>
    ];
    expect(el).toBeInstanceOf(HTMLElement);
    expect(cfg.theme).toBe("filled_blue");
    expect(cfg.size).toBe("small");
  });

  it("uses custom slot click to run auth code login", async () => {
    const callback = vi.fn();
    const wrapper = mount(GoogleLogin, {
      props: {
        clientId: "comp-client",
        callback,
      },
      slots: {
        default: "<button type=\"button\" class=\"custom\">Sign in</button>",
      },
      attachTo: document.body,
    });
    await flushPromises();
    await nextTick();

    await wrapper.get(".custom").trigger("click");
    await flushPromises();

    expect(mock.initCodeClient).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ code: "test-auth-code" })
    );

    wrapper.unmount();
  });

  it("uses popupType TOKEN for token client when slot is present", async () => {
    const callback = vi.fn();
    const wrapper = mount(GoogleLogin, {
      props: {
        clientId: "comp-client",
        callback,
        popupType: "TOKEN",
      },
      slots: {
        default: "<button type=\"button\" class=\"tok\">Token</button>",
      },
      attachTo: document.body,
    });
    await flushPromises();
    await nextTick();

    await wrapper.get(".tok").trigger("click");
    await flushPromises();

    expect(mock.initTokenClient).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ access_token: "test-access-token" })
    );

    wrapper.unmount();
  });

  it("routes credential-less responses to error when error prop is set", async () => {
    const callback = vi.fn();
    const onError = vi.fn();

    mount(GoogleLogin, {
      props: {
        clientId: "comp-client",
        callback,
        error: onError,
      },
    });
    await flushPromises();
    await nextTick();

    const initArg = mock.initialize.mock.calls.find(
      (c) => (c[0] as { client_id?: string }).client_id === "comp-client"
    )?.[0] as { callback?: (r: { credential?: string }) => void };

    expect(typeof initArg?.callback).toBe("function");
    initArg.callback?.({ credential: undefined } as { credential?: string });

    expect(onError).toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
  });
});
