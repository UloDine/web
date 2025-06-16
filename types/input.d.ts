interface Input {
  type: string;
  placeholder?: string;
  id?: string | number;
  className?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextAreaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  strict?: boolean;
  value: string;
  onComplete?: (otp: string[]) => void;
  sending?: boolean;
  errorMessage?: string;
  invalid?: boolean;
  disabled?: boolean;
  otpLoading?: boolean;
  timer?: number;
}

type item = {
  label: string;
  value: string;
};

interface Select {
  items: item[];
  onChange: (selected: item) => void;
  label?: string;
  placeholder?: string;
  defaultSelected?: string;
}

interface UloDineSearch {
  type: "home-page" | "normal";
  placeholder: string;
  onSearchChange: (query: string) => void;
  width?: number | string;
}
