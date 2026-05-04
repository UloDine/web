import React, { useCallback, useEffect, useRef } from "react";
import styles from "./styles/style.module.css";

function BottomDrawer({ isOpen, onClose, title, children }: BottomDrawerProps) {
  const startYRef = useRef<number | null>(null);
  const closingRef = useRef(false);

  const resetDragState = useCallback(() => {
    startYRef.current = null;
    closingRef.current = false;
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (startYRef.current === null || closingRef.current) {
        return;
      }

      const distance = event.clientY - startYRef.current;
      if (distance >= 100) {
        closingRef.current = true;
        resetDragState();
        onClose();
      }
    },
    [onClose, resetDragState],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", resetDragState);
    window.addEventListener("pointercancel", resetDragState);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", resetDragState);
      window.removeEventListener("pointercancel", resetDragState);
    };
  }, [handlePointerMove, isOpen, resetDragState]);

  function handleHandlePointerDown(event: React.PointerEvent<HTMLSpanElement>) {
    startYRef.current = event.clientY;
    closingRef.current = false;
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return isOpen ? (
    <section className={styles.bottom_drawer} onClick={handleBackdropClick}>
      <div
        className={styles.drawer}
        onClick={(event) => event.stopPropagation()}
      >
        <span
          className={styles.drawer_btn}
          onPointerDown={handleHandlePointerDown}
          onClick={(event) => event.stopPropagation()}
          role="presentation"
          aria-hidden="true"
        />
        <h3>{title}</h3>
        {children}
      </div>
    </section>
  ) : null;
}

export default BottomDrawer;
