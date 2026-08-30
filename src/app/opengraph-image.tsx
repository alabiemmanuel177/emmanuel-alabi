import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} | ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card. Typographic and restrained, matching the site itself —
 * no gradients, no stock imagery.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fdfdfc",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              color: "#16161a",
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </div>
          <div style={{ fontSize: 34, color: "#5c5c66", marginTop: 14 }}>
            {site.title}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: "100%",
              height: 1,
              background: "#e4e4e0",
              marginBottom: 26,
            }}
          />
          <div style={{ fontSize: 24, color: "#8a8a94" }}>
            {site.interestLine}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
