import { computed } from "vue";
import { libraryState } from "@/state";

/**
 * Composable that exposes reactive Google SDK state.
 * Returns `{ isLoaded }` — a computed ref that becomes `true` once the
 * Google Identity Services script is fully loaded and ready to use.
 */
export function useGoogleSdk() {
  const isLoaded = computed(() => libraryState.apiLoaded);

  return { isLoaded };
}
