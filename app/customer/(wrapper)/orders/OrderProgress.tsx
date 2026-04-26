import React from "react";
import styles from "./styles/styles.module.css";

function OrderProgress({
  status = "pending",
}: {
  status?: CustomerOrder["status"];
}) {
  const steps = ["Ordered", "Preparing", "Ready", "Delivered"] as const;

  const statusToIndex: Record<CustomerOrder["status"], number> = {
    pending: 0,
    preparing: 1,
    ready: 2,
    done: 3,
    cancelled: 0,
  };

  const currentStep = statusToIndex[status];

  return (
    <div className={styles.order_progress} aria-label="Order progress">
      {steps.map((step, index) => {
        const isCompleted = index <= currentStep;
        const isLast = index === steps.length - 1;
        const isConnectorCompleted = index < currentStep;

        return (
          <div key={step} className={styles.progress_step}>
            <div className={styles.progress_step_top}>
              <span
                className={`${styles.progress_dot} ${
                  isCompleted
                    ? styles.progress_dot_done
                    : styles.progress_dot_todo
                }`}
              >
                {isCompleted ? "✓" : null}
              </span>

              {!isLast && (
                <span
                  className={`${styles.progress_line} ${
                    isConnectorCompleted
                      ? styles.progress_line_done
                      : styles.progress_line_todo
                  }`}
                />
              )}
            </div>

            <small
              className={`${styles.progress_label} ${
                isCompleted
                  ? styles.progress_label_done
                  : styles.progress_label_todo
              }`}
            >
              {step}
            </small>
          </div>
        );
      })}
    </div>
  );
}

export default OrderProgress;
