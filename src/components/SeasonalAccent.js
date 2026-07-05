import React from "react";

// ── Trans Flag (Pride) ─────────────────────────────────────────────────────
const TRANS_STRIPES = ["#55CDFC", "#F7A8B8", "#FFFFFF", "#F7A8B8", "#55CDFC"];

export const TransFlag = ({ stripeWidth = 28, stripeHeight = 4, gap = 2, opacity = 0.75 }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: `${gap}px`, opacity }}>
        {TRANS_STRIPES.map((color, i) => (
            <span key={i} style={{
                display: "block", width: `${stripeWidth}px`, height: `${stripeHeight}px`,
                background: color, borderRadius: "100px",
            }} />
        ))}
    </div>
);

// ── Halloween Spider Web (SVG) ────────────────────────────────────────────
export const SpiderWeb = ({ size = 120, opacity = 0.18 }) => (
    <svg width={size} height={size} viewBox="0 0 120 120"
        style={{ opacity }} aria-hidden="true">
        {/* Radial lines */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
            const r = deg * Math.PI / 180;
            return (
                <line key={i}
                    x1="60" y1="60"
                    x2={60 + 55 * Math.cos(r)} y2={60 + 55 * Math.sin(r)}
                    stroke="#C084FC" strokeWidth="0.7" />
            );
        })}
        {/* Concentric rings */}
        {[12, 24, 36, 48, 56].map((r) => (
            <circle key={r} cx="60" cy="60" r={r}
                fill="none" stroke="#C084FC" strokeWidth="0.7"
                strokeDasharray="4 3" />
        ))}
        {/* Spider */}
        <ellipse cx="60" cy="16" rx="4" ry="5" fill="#FF6B35" opacity="0.9" />
        <ellipse cx="60" cy="24" rx="5" ry="6" fill="#FF6B35" opacity="0.9" />
        {/* Legs */}
        {[-1, 1].map((side) => [0, 1, 2, 3].map((i) => (
            <line key={`${side}${i}`}
                x1={60 + side * 5} y1={20 + i * 3}
                x2={60 + side * 14} y2={16 + i * 4}
                stroke="#FF6B35" strokeWidth="0.8" opacity="0.8" />
        )))}
    </svg>
);

// ── Christmas Snowflake (SVG) ─────────────────────────────────────────────
export const Snowflake = ({ size = 40, color = "#FFD700", opacity = 0.25 }) => {
    const arms = [0, 60, 120, 180, 240, 300];
    return (
        <svg width={size} height={size} viewBox="0 0 40 40"
            style={{ opacity }} aria-hidden="true">
            {arms.map((deg) => {
                const r = deg * Math.PI / 180;
                const ex = 20 + 18 * Math.cos(r);
                const ey = 20 + 18 * Math.sin(r);
                const b1x = 20 + 10 * Math.cos(r) + 5 * Math.cos(r + Math.PI / 2);
                const b1y = 20 + 10 * Math.sin(r) + 5 * Math.sin(r + Math.PI / 2);
                const b2x = 20 + 10 * Math.cos(r) + 5 * Math.cos(r - Math.PI / 2);
                const b2y = 20 + 10 * Math.sin(r) + 5 * Math.sin(r - Math.PI / 2);
                return (
                    <g key={deg}>
                        <line x1="20" y1="20" x2={ex} y2={ey} stroke={color} strokeWidth="1.2" />
                        <line x1={20 + 8 * Math.cos(r)} y1={20 + 8 * Math.sin(r)} x2={b1x} y2={b1y} stroke={color} strokeWidth="0.8" />
                        <line x1={20 + 8 * Math.cos(r)} y1={20 + 8 * Math.sin(r)} x2={b2x} y2={b2y} stroke={color} strokeWidth="0.8" />
                    </g>
                );
            })}
            <circle cx="20" cy="20" r="2" fill={color} />
        </svg>
    );
};

// ── Section label rule gradients ──────────────────────────────────────────
export const SEASONAL_RULE = {
    pride: "linear-gradient(90deg, #55CDFC 0%, #F7A8B8 35%, #FFFFFF 50%, #F7A8B8 65%, #55CDFC 100%)",
    halloween: "linear-gradient(90deg, #FF6B35 0%, #C084FC 50%, #FF6B35 100%)",
    christmas: "linear-gradient(90deg, #C41E3A 0%, #FFD700 50%, #165B33 100%)",
};

// ── Accent colours per theme ──────────────────────────────────────────────
export const THEME = {
    pride: {
        primary: "#55CDFC",
        secondary: "#F7A8B8",
        badge: "rgba(247,168,184,0.06)",
        badgeBorder: "rgba(247,168,184,0.3)",
        badgeText: "#F7A8B8",
        label: "Happy Pride Month 🏳️‍⚧️",
        nameFirst: "#55CDFC",
        nameLast: "#F7A8B8",
        nameGradient: null,
        barGradient: "linear-gradient(90deg, #55CDFC, #F7A8B8)",
        btnBg: "#F7A8B8",
        btnColor: "#1A1118",
        pillColor: null, // alternating handled separately
    },
    halloween: {
        primary: "#FF6B35",
        secondary: "#C084FC",
        badge: "rgba(255,107,53,0.08)",
        badgeBorder: "rgba(255,107,53,0.3)",
        badgeText: "#FF6B35",
        label: "Happy Halloween 🎃",
        nameFirst: "#FF6B35",
        nameLast: "#C084FC",
        nameGradient: null,
        barGradient: "linear-gradient(90deg, #FF6B35, #C084FC)",
        btnBg: "#FF6B35",
        btnColor: "#1A0A2E",
        pillColor: null,
    },
    christmas: {
        primary: "#C41E3A",
        secondary: "#165B33",
        tertiary: "#FFD700",
        badge: "rgba(196,30,58,0.08)",
        badgeBorder: "rgba(255,215,0,0.35)",
        badgeText: "#FFD700",
        label: "Happy Christmas 🎄",
        // Alyssa = gradient across all three xmas colours
        nameFirst: null,
        nameGradient: "linear-gradient(90deg, #C41E3A, #FFD700, #165B33)",
        nameLast: null, // no surname shown
        barGradient: "linear-gradient(90deg, #C41E3A, #FFD700, #165B33)",
        btnBg: "#C41E3A",
        btnColor: "#F8F4E3",
        pillColor: null,
    },
};

export const getTheme = (theme) => (theme ? THEME[theme] : null);