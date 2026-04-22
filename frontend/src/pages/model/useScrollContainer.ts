import { useRef } from "react";

export const useScrollContainer = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return {
    scrollContainer: ref,
  };
};
