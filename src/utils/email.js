/**
 * Email obfuscation utilities.
 *
 * The raw email address is never present as a string in the rendered HTML.
 * Bots that scrape static markup cannot harvest it.
 * The address is assembled at runtime in the browser only.
 */

import React, { useEffect, useRef } from "react";

// Split so the full address never exists as a literal string in source
const PARTS = ["contact", "seristic.com"];
const SEP = "@";

/** Returns the full email — only called in browser JS, never in static HTML */
export const getEmail = () => `${PARTS[0]}${SEP}${PARTS[1]}`;
export const getMailto = () => `mailto:${getEmail()}`;

/**
 * ObfuscatedEmail
 * Renders the address via useEffect so it's never in the initial HTML.
 * Bots see only <a href="#">, humans see the real address after JS runs.
 */
export const ObfuscatedEmail = ({ style, className, children }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.textContent = children || getEmail();
            ref.current.href = getMailto();
        }
    }, [children]);

    return (
        <a
            ref={ref}
            href="#contact"
            style={style}
            className={className}
            onClick={(e) => {
                e.preventDefault();
                window.location.href = getMailto();
            }}
            aria-label="Send me an email"
        />
    );
};

export default ObfuscatedEmail;