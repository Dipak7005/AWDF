import React from "react";
import { MeshGradient } from "@paper-design/shaders-react";

export function BackgroundShader({ className = "" }) {
  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden"
      }}
    >
      <MeshGradient
        style={{ height: "100vh", width: "100vw" }}
        distortion={0.8}
        swirl={0.1}
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={1}
        colors={[
          "hsl(216, 90%, 27%)",
          "hsl(243, 68%, 36%)",
          "hsl(205, 91%, 64%)",
          "hsl(211, 61%, 57%)"
        ]}
      />
    </div>
  );
}

export default BackgroundShader;
