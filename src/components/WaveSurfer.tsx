import React from "react";

function WaveSurferPlayer({hasLoaded}, containerRef) {
  return (
    <>
      <div
        ref={containerRef}
        id="#ws-container"
        style={{
          minHeight: "120px",
          display: hasLoaded ? "block" : "none",
        }}
      />
      {!hasLoaded && <h1>Loading...</h1>}
    </>
  );
}
export default React.forwardRef(WaveSurferPlayer);
