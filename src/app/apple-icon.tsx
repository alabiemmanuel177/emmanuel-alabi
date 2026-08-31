import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon. Full-bleed — iOS applies its own corner mask, so a
 * pre-rounded tile would be clipped twice.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16161a",
          color: "#fdfdfc",
                    fontSize: 128,
          fontWeight: 700,
          letterSpacing: "-0.06em",
        }}
      >
        EA
      </div>
    ),
    size,
  );
}
