import type * as types from "@/types";

/** Merges install/component options: undefined and null do not overwrite existing keys. */
export const mergeObjects = (obj1: unknown, obj2: unknown): types.Options => {
  const mergedObj = { ...(obj1 as types.Options) };
  const b = obj2 as Record<string, unknown>;
  for (const key in b) {
    b[key] !== undefined &&
      b[key] !== null &&
      ((mergedObj as Record<string, unknown>)[key] = b[key]);
  }
  return mergedObj as types.Options;
};
