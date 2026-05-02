import React from "react";

function Edit({ color = "#00BB95" }: React.SVGProps<SVGAElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
    >
      <path
        d="M7.12171 12.8713H13.4934M10.3076 1.18987C10.5892 0.908227 10.9712 0.75 11.3695 0.75C11.5667 0.75 11.762 0.788846 11.9442 0.86432C12.1264 0.939793 12.292 1.05042 12.4315 1.18987C12.5709 1.32933 12.6815 1.49489 12.757 1.6771C12.8325 1.85931 12.8713 2.0546 12.8713 2.25182C12.8713 2.44905 12.8325 2.64434 12.757 2.82655C12.6815 3.00876 12.5709 3.17432 12.4315 3.31377L3.58188 12.1634L0.750015 12.8713L1.45798 10.0395L10.3076 1.18987Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Edit;
