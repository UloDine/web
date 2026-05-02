import React, { useEffect, useState } from "react";
import styles from "@/styles/components/input/Input.module.css";

function UloDineCheckbox({
  checked = false,
  label,
  onChange,
  disabled,
}: {
  checked?: boolean;
  label?: string | React.ReactNode;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  function handleCheck(value: boolean) {
    setIsChecked((prev) => (prev = value));
    onChange(value);
  }
  return label ? (
    <div className={styles.checkbox_wrapper}>
      <div className={styles.checkbox}>
        <input
          checked={isChecked}
          type="checkbox"
          onChange={(e) => handleCheck(e.target.checked)}
          disabled={disabled}
        />
        <span className={styles.marker} />
      </div>
      {typeof label === "string" ? <p>{label}</p> : label}
    </div>
  ) : (
    <div className={styles.checkbox}>
      <input
        checked={isChecked}
        type="checkbox"
        onChange={(e) => handleCheck(e.target.checked)}
      />
      <span className={styles.marker} />
    </div>
  );
}

export default UloDineCheckbox;
