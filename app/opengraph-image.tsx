import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [bgData, logoData] = await Promise.all([
    readFile(join(process.cwd(), "public", "og_image.jpg"), "base64"),
    readFile(join(process.cwd(), "public", "logo_white_small.png"), "base64"),
  ]);
  const bgSrc = `data:image/jpeg;base64,${bgData}`;
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgSrc}
          alt=""
          width={size.width}
          height={size.height}
          style={{ position: "absolute", inset: 0, objectFit: "cover" }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "44%",
            height: "100%",
            paddingLeft: 72,
            paddingRight: 32,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="Velcor Engineering" width={340} height={109} />

          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              fontWeight: 600,
              color: "#F7F6F2",
              lineHeight: 1.3,
            }}
          >
            Multidisciplinary Engineering Partner
          </div>

          <div
            style={{
              marginTop: 14,
              fontSize: 20,
              fontWeight: 500,
              color: "#D6E4E7",
            }}
          >
            Product Design &nbsp;·&nbsp; Plant Engineering
          </div>
        </div>
      </div>
    ),
    size,
  );
}
