import React from "react";
import { Star } from "lucide-react";

/**
 * StarRating
 * Props:
 *  - value: number (0-5)
 *  - size: number
 *  - showValue: boolean
 *  - outOf: number (default 5)
 */
const StarRating = ({ value = 0, size = 14, showValue = false, outOf = 5 }) => {
  const stars = Array.from({ length: outOf }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {stars.map((s) => (
          <Star
            key={s}
            size={size}
            className={
              s <= Math.round(value)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs text-gray-500 ml-1">{value.toFixed(1)}</span>
      )}
    </div>
  );
};

export default StarRating;
