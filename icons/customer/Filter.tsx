import React from "react";

function Filter({ color = "#959595" }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="17"
      height="11"
      viewBox="0 0 17 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.3 10.8H9.9V9H6.3V10.8ZM0 0V1.8H16.2V0H0ZM2.7 6.3H13.5V4.5H2.7V6.3Z"
        fill="#959595"
      />
    </svg>
  );
}

export default Filter;
