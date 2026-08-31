import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Favicon: an "EA" monogram, not a logo.
 *
 * The site's positioning is academic rather than commercial, so this identifies
 * the tab without branding it. Ink tile with canvas letterforms reads at 16px
 * against both light and dark browser chrome, which a light-on-light or
 * outlined mark would not.
 *
 * Rendered through ImageResponse rather than a hand-authored SVG so the
 * letterforms rasterise identically everywhere. The renderer ships its own
 * sans, which is why no font family is set here: it matches the site's body
 * face, and sans holds together at 16px where a serif's thin strokes vanish.
 */
export default function Icon() {
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
                    fontSize: 47,
          fontWeight: 700,
          letterSpacing: "-0.06em",
          borderRadius: 11,
        }}
      >
        EA
      </div>
    ),
    size,
  );
}
