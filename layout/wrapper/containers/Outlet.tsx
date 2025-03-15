import React, { ReactNode } from "react";

function Outlet({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default Outlet;
