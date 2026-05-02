import React, { useEffect, useState } from "react";
import styles from "@/styles/components/input/Input.module.css";

function UloDineRadioButton({
  selected = false,
  label,
  onChange,
  disabled,
  name,
}: {
  selected?: boolean;
  label?: string | React.ReactNode;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  name: string;
}) {
  const [isSelected, setIsSelected] = useState<boolean>(selected);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  function handleCheck(value: boolean) {
    setIsSelected(value);
    onChange(value);
  }
  return label ? (
    <div className={styles.radio_wrapper}>
      <div className={styles.radio}>
        <input
          checked={isSelected}
          type="radio"
          onChange={(e) => handleCheck(e.target.checked)}
          disabled={disabled}
          name={name}
        />
        <span className={styles.marker} />
      </div>
      {typeof label === "string" ? <p>{label}</p> : label}
    </div>
  ) : (
    <div className={styles.radio}>
      <input
        checked={isSelected}
        type="radio"
        onChange={(e) => handleCheck(e.target.checked)}
        name={name}
      />
      <span className={styles.marker} />
    </div>
  );
}

export default UloDineRadioButton;
