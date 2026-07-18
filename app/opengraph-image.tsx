import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          color: "#ffffff",
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        {siteConfig.name}
      </div>
    ),
    size,
  );
}
