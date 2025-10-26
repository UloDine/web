type buttonColor =
  | "green"
  | "green-light"
  | "grey"
  | "light"
  | "transparent"
  | "red"
  | "white";

  type buttonType = "primary"| "main" | "outline" | "secondary";
interface Button {
  type: buttonType;
  label: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color: buttonColor;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  labelColor?: buttonColor;
  icon?: React.ReactNode;
}

interface UloDineLink {
  path: string;
  style?: React.CSSProperties;
  color: buttonColor;
  disabled?: boolean;
  className?: string;
  label: string;
  type?: "main" | "outline";
  icon?: React.ReactNode;
  underline?: boolean;
  labelColor?: buttonColor;
}
