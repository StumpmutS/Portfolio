import { useEffect, useState } from "react";
import {Size2D} from "@/lib/types/geometry";

export default function useWindowDimensions() {
  const [size, setSize] = useState<Size2D>({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      if (!window) return;

      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    if (!window) return;

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
