import Image from "next/image";
import React from "react";

function EmptyImage({
  width = 100,
  height = 100,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ebebeb",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        src={"/placeholder.png"}
        alt="Empty"
        width={width}
        height={height}
        quality={100}
      />
    </div>
  );
}

export default EmptyImage;
