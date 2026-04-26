"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type DashedLineProps = {
  size?: number;
  gap?: number;
  thickness?: number;
  color?: string;
  className?: string;
};

function DashedLine({
  size = 10,
  gap = 6,
  thickness = 1,
  color = "#d3d3d3",
  className,
}: DashedLineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const element = containerRef.current;
    const measure = () => {
      setContainerWidth(element.clientWidth);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const safeSize = Math.max(1, size);
  const safeGap = Math.max(0, gap);

  const dashCount = useMemo(() => {
    if (containerWidth <= 0) {
      return 0;
    }

    // count = (total width + gap) / (dash width + gap)
    const count = Math.floor((containerWidth + safeGap) / (safeSize + safeGap));
    return Math.max(1, count);
  }, [containerWidth, safeGap, safeSize]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: `${safeGap}px`,
      }}
    >
      {Array.from({ length: dashCount }).map((_, index) => (
        <span
          key={`dash-${index}`}
          style={{
            width: `${safeSize}px`,
            height: `${Math.max(1, thickness)}px`,
            borderRadius: "999px",
            backgroundColor: color,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

export default DashedLine;
