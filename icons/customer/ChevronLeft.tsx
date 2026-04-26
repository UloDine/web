import React from "react";

function ChevronLeft({ color = "#000000" }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.21967 0.21967C6.51256 -0.0732233 6.98732 -0.0732233 7.28022 0.21967C7.57311 0.512563 7.57311 0.987323 7.28022 1.28022L1.81049 6.74994L7.28022 12.2197C7.57311 12.5126 7.57311 12.9873 7.28022 13.2802C6.98732 13.5731 6.51256 13.5731 6.21967 13.2802L0.21967 7.28022C-0.0732233 6.98732 -0.0732233 6.51256 0.21967 6.21967L6.21967 0.21967Z"
        fill={color}
      />
    </svg>
  );
}

export default ChevronLeft;
