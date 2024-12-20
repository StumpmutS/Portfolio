import { RefObject, useMemo, useSyncExternalStore } from "react";

export function useRefDimensions(ref: RefObject<HTMLElement>) {
  const dimensions = useSyncExternalStore(
    subscribe,
    () => JSON.stringify({
      width: ref.current?.offsetWidth ?? 0,
      height: ref.current?.offsetHeight ?? 0,
    }),
    () => JSON.stringify({
      width: ref.current?.offsetWidth ?? 0,
      height: ref.current?.offsetHeight ?? 0,
    }),
  );

  return useMemo(() => JSON.parse(dimensions), [dimensions]);
}

function subscribe(callback: (e: Event) => void) {
  window.addEventListener("resize", callback);

  return () => window.removeEventListener("resize", callback);
}
