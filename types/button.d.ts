import { CSSProperties } from "react";

type buttonColor = "green" | "green-light" | "grey" | "light" | "transparent";
interface Button {
  type: string;
  label: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color: buttonColor;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

interface UloDineLink {
  path: string;
  style: CSSProperties;
  color: buttonColor;
  disabled?: boolean;
  className?: string;
  label: string;
  type?: string;
}
