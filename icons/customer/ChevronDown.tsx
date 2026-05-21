import React from "react";

function ChevronDown({ color = "#6B6A6A" }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.7276 4.455L10.1826 0L11.4552 1.2726L5.7276 7.0002L0 1.2726L1.2726 0L5.7276 4.455Z"
        fill={color}
      />
    </svg>
  );
}

export default ChevronDown;
