import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#10312b",
          borderRadius: 42,
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <svg height="132" viewBox="0 0 32 32" width="132" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" fill="#dff36b" r="11.5" />
          <path d="M17.6 5.9 8.8 17.1h6l-1.2 9 8.8-12.1h-6.1l1.3-8.1Z" fill="#10312b" />
          <circle cx="25.5" cy="6.5" fill="#f2674f" r="2.4" />
        </svg>
      </div>
    ),
    size,
  );
}
