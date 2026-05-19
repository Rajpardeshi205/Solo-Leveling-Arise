"use client";

import { useTooltip } from "@/context/TooltipContext";

export default function GameTooltip({ children, title, description, image }) {
  const { setTooltip } = useTooltip();

  return (
    <div
      className="inline-flex"
      onMouseMove={(e) => {
        setTooltip({
          title,
          description,
          image,
          x: e.clientX,
          y: e.clientY,
        });
      }}
      onMouseLeave={() => {
        setTooltip(null);
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") {
          setTooltip((prev) =>
            prev
              ? null
              : {
                  title,
                  description,
                  image,
                  x: e.clientX,
                  y: e.clientY,
                },
          );
        }
      }}
    >
      {children}
    </div>
  );
}
