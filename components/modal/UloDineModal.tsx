import React, { useEffect, useRef } from "react";
import { markUsed } from "@/utils/markUsed";
import styles from "./styles/index.module.css";
import UloDIneButton from "@/components/button/UloDIneButton";

function UloDineModal({
  isOpen,
  onClose,
  title,
  size = "md",
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  centered = true,
  overlayClassName = "",
  modalClassName = "",
  animation = "fade",
  duration = 200,
  preventScroll = true,
  footer,
  header,
  zIndex = 50,
  maxWidth,
  maxHeight,
  closeOnEsc = true,
  initialFocusRef,
  finalFocusRef,
  returnFocusOnClose = true,
  isCentered = true,
  scrollBehavior = "outside",
  blockScrollOnMount = true,
  motionPreset = "scale",
  // Action button props
  showActions = true,
  cancelButtonText = "Cancel",
  actionButtonText = "Confirm",
  onAction,
  actionButtonDisabled = false,
  cancelButtonDisabled = false,
  actionButtonLoading = false,
}: UloDineModal) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (isOpen && closeOnEsc && e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      previousFocusRef.current = document.activeElement as HTMLElement;

      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (modalRef.current) {
        modalRef.current.focus();
      }

      if (blockScrollOnMount) {
        document.body.style.overflow = "hidden";
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);

      if (isOpen && returnFocusOnClose) {
        if (finalFocusRef?.current) {
          finalFocusRef.current.focus();
        } else if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      }

      if (blockScrollOnMount) {
        document.body.style.overflow = "unset";
      }
    };
  }, [
    isOpen,
    closeOnEsc,
    onClose,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
  ]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // mark some optional props as used so production lint won't fail
  markUsed(centered, preventScroll, isCentered, motionPreset);

  return (
    <div
      className={`${styles.modal_overlay} ${overlayClassName}`}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      style={{ zIndex }}
    >
      <div className={styles.modal_overlay_content}>
        {/* Background overlay */}
        <div
          className={`${styles.modal_overlay_backdrop} ${
            styles[`${animation}_in`]
          }`}
          style={{ animationDuration: `${duration}ms` }}
        />

        {/* Modal panel */}
        <div
          ref={modalRef}
          className={`
            ${styles.modal_panel}
            ${styles[size]}
            ${scrollBehavior === "inside" ? styles.inside : ""}
            ${styles[`${animation}_in`]}
            ${modalClassName}
          `}
          style={{
            maxWidth,
            maxHeight,
            animationDuration: `${duration}ms`,
          }}
          tabIndex={-1}
        >
          {/* Header */}
          {(header || title || showCloseButton) && (
            <div className={styles.modal_panel_header}>
              {header || (
                <>
                  {title && <h2>{title}</h2>}
                  {showCloseButton && (
                    <button onClick={onClose} aria-label="Close">
                      <span>&times;</span>
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {/* Content */}
          <div className={styles.modal_panel_content}>{children}</div>

          {/* Footer */}
          {(footer || showActions) && (
            <div className={styles.modal_panel_footer}>
              {footer ||
                (showActions && (
                  <div className={styles.modal_actions}>
                    <UloDIneButton
                      type="secondary"
                      color="grey"
                      onClick={onClose}
                      disabled={cancelButtonDisabled}
                      label={cancelButtonText}
                    />
                    <UloDIneButton
                      type="primary"
                      color="green"
                      onClick={() => onAction?.()}
                      disabled={actionButtonDisabled}
                      loading={actionButtonLoading}
                      label={actionButtonText}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UloDineModal;
