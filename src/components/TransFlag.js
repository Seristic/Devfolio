import React from "react";

const STRIPES = [
    "#55CDFC", // blue
    "#F7A8B8", // pink
    "#FFFFFF",  // white
    "#F7A8B8", // pink
    "#55CDFC", // blue
];

/**
 * Renders the five-stripe trans flag as horizontal bars.
 * stripeWidth / stripeHeight / gap control sizing.
 */
export const TransFlag = ({ stripeWidth = 28, stripeHeight = 4, gap = 2, opacity = 0.75 }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: `${gap}px`, opacity }}>
        {STRIPES.map((color, i) => (
            <span
                key={i}
                style={{
                    display: "block",
                    width: `${stripeWidth}px`,
                    height: `${stripeHeight}px`,
                    background: color,
                    borderRadius: "100px",
                }}
            />
        ))}
    </div>
);

export const TRANS_BLUE = "#55CDFC";
export const TRANS_PINK = "#F7A8B8";
export const TRANS_WHITE = "#FFFFFF";

export default TransFlag;