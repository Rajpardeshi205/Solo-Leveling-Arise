"use client";

import { useTooltip } from "@/context/TooltipContext";

export default function GlobalTooltip() {
  const { tooltip } = useTooltip();

  if (!tooltip) return null;

  return (
    <div
      className="fixed z-[999999] pointer-events-none"
      style={{
        left: tooltip.x + 18,
        top: tooltip.y - 12,
      }}
    >
      <div className="w-80 bg-[#08111d]/95 border border-cyan-400 rounded-xl p-4 text-xs shadow-2xl backdrop-blur-xl">
        <div className="flex gap-3 mb-3">
          {tooltip.image && (
            <img
              src={tooltip.image}
              alt={tooltip.title}
              className="w-14 h-14 rounded-lg border border-cyan-400/40 object-cover"
            />
          )}

          <div>
            <h3 className="text-cyan-400 font-bold text-sm leading-tight">
              {tooltip.title}
            </h3>
          </div>
        </div>

        <div className="text-purple-300 whitespace-pre-wrap leading-relaxed max-h-[260px] overflow-y-auto pr-1">
          {tooltip.description}
        </div>
      </div>
    </div>
  );
}
