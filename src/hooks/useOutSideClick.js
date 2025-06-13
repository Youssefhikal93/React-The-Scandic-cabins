import { useEffect, useRef } from "react";

export function useOutSideClick(close) {
  const ref = useRef();
  useEffect(
    function () {
      function handeClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }
      function handleKeyDown(e) {
        if (e.key === "Escape") {
          // Corrected: "Escape" instead of "ESCAPE"
          close();
        }
      }
      document.addEventListener("click", handeClick, true);
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("click", handeClick, true);
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [close]
  );
  return ref;
}
