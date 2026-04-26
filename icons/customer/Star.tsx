import React from "react";

function Star({ color = "#FFB302" }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 0L8.5085 3.94953L13 4.58675L9.75 7.65931L10.517 12L6.5 9.94953L2.483 12L3.25 7.65931L0 4.58675L4.4915 3.94953L6.5 0Z"
        fill={color}
      />
    </svg>
  );
}

export default Star;
