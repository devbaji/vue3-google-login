import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { nextTick, defineComponent } from "vue";
import { mount, flushPromises } from "@vue/test-utils";
import { decodeCredential } from "@/utils/decodeCredential";
import { mergeObjects } from "@/utils/mergeOptions";
import {
  googleSdkLoaded,
  googleLogout,
  googleOneTap,
} from "@/google/client";
import { useGoogleSdk } from "@/composables/useGoogleSdk";
import state, { libraryState } from "@/state";
import {
  createMockGoogle,
  installGsiScriptLoadInterceptor,
} from "./helpers/mock-google";
import { resetPluginAndLibraryState } from "./helpers/reset-state";
import type { Google } from "@/types";

describe("decodeCredential", () => {
  it("decodes a valid JWT payload", () => {
    const payload = { sub: "user-1", email: "u@example.com" };
    const encoded = btoa(JSON.stringify(payload))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    const jwt = `header.${encoded}.sig`;
    expect(decodeCredential(jwt)).toEqual(payload);
  });

  it("throws when JWT is invalid", () => {
    expect(() => decodeCredential("not-a-jwt")).toThrow("JWT provided is invalid");
  });
});

describe("mergeObjects", () => {
  it("merges defined values and skips undefined and null", () => {
    const base = { a: 1, b: 2, c: 3 };
    const merged = mergeObjects(base, {
      b: undefined,
      c: null,
      d: 4,
    } as Record<string, unknown>);
    expect(merged).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });
});

describe("googleSdkLoaded", () => {
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

  it("invokes action after GIS loads on first googleSdkLoaded call", async () => {
    const action = vi.fn();
    googleSdkLoaded(action);
    await flushPromises();
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith(mock.google);
  });

  it("invokes action synchronously when GIS is already loaded", async () => {
    googleSdkLoaded(() => undefined);
    await flushPromises();
    const second = vi.fn();
    googleSdkLoaded(second);
    expect(second).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledWith(mock.google);
  });

  it("waits via watch when load was initiated but not yet complete", async () => {
    const late = createMockGoogle();
    restoreAppend?.();
    resetPluginAndLibraryState();

    libraryState.apiLoadIntitited = true;
    libraryState.apiLoaded = false;
    (window as unknown as { google: Google }).google = late.google;

    const action = vi.fn();
    googleSdkLoaded(action);
    expect(action).not.toHaveBeenCalled();

    libraryState.apiLoaded = true;
    await nextTick();
    await nextTick();

    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith(late.google);
  });
});

describe("googleLogout", () => {
  let restoreAppend: (() => void) | undefined;
  let mock: ReturnType<typeof createMockGoogle>;

  beforeEach(() => {
    resetPluginAndLibraryState();
    mock = createMockGoogle();
    restoreAppend = installGsiScriptLoadInterceptor(() => mock.google);
    state.clientId = "client-for-logout";
  });

  afterEach(() => {
    restoreAppend?.();
    resetPluginAndLibraryState();
  });

  it("calls disableAutoSelect after the SDK is ready", async () => {
    googleLogout();
    await flushPromises();
    expect(mock.disableAutoSelect).toHaveBeenCalledTimes(1);
  });
});

describe("googleOneTap", () => {
  let restoreAppend: (() => void) | undefined;
  let mock: ReturnType<typeof createMockGoogle>;

  beforeEach(() => {
    resetPluginAndLibraryState();
    mock = createMockGoogle();
    restoreAppend = installGsiScriptLoadInterceptor(() => mock.google);
    state.clientId = "client-one-tap";
  });

  afterEach(() => {
    restoreAppend?.();
    resetPluginAndLibraryState();
  });

  it("resolves when credential is returned", async () => {
    mock.initialize.mockImplementation((cfg: { callback?: (r: unknown) => void }) => {
      cfg.callback?.({
        clientId: "x",
        credential: "jwt-here",
        select_by: "btn",
      });
    });
    mock.prompt.mockImplementation(() => undefined);

    const p = googleOneTap();
    await flushPromises();
    await expect(p).resolves.toMatchObject({ credential: "jwt-here" });
    expect(mock.initialize).toHaveBeenCalled();
    expect(mock.prompt).toHaveBeenCalled();
  });

  it("rejects when credential is missing", async () => {
    mock.initialize.mockImplementation((cfg: { callback?: (r: unknown) => void }) => {
      cfg.callback?.({ clientId: "x", credential: "", select_by: "btn" });
    });
    mock.prompt.mockImplementation(() => undefined);

    const settled = googleOneTap().then(
      () => ({ ok: true as const, value: undefined }),
      (reason) => ({ ok: false as const, reason })
    );
    await flushPromises();
    const result = await settled;
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toMatchObject({ credential: "" });
    }
  });
});

describe("useGoogleSdk", () => {
  let restoreAppend: (() => void) | undefined;

  beforeEach(() => {
    resetPluginAndLibraryState();
    const mock = createMockGoogle();
    restoreAppend = installGsiScriptLoadInterceptor(() => mock.google);
  });

  afterEach(() => {
    restoreAppend?.();
    resetPluginAndLibraryState();
  });

  it("exposes isLoaded that tracks libraryState.apiLoaded", async () => {
    const Comp = defineComponent({
      setup() {
        return useGoogleSdk();
      },
      template: "<div />",
    });
    const wrapper = mount(Comp);
    expect(wrapper.vm.isLoaded).toBe(false);

    googleSdkLoaded(() => undefined);
    await flushPromises();
    await nextTick();

    expect(wrapper.vm.isLoaded).toBe(true);
  });
});
