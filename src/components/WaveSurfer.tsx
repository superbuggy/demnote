// Import React hooks
import React from "react";

const { useRef, useState, useEffect, useCallback } = React;

// Import WaveSurfer
import WaveSurfer from "wavesurfer.js";

const formatSeconds = (durationInSeconds: number): string => {
  const minutesExact = durationInSeconds / 60;
  const minutes = Math.floor(minutesExact);
  const seconds = `${Math.round(60 * (minutesExact - minutes))}`.padStart(
    2,
    "0"
  );
  return `${minutes}:${seconds}`;
};

// WaveSurfer hook
const useWaveSurfer = (containerRef, options) => {
  const [waveSurfer, setWaveSurfer] = useState(null);

  // Initialize waveSurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return;

    const waveSurferInstance = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });

    setWaveSurfer(waveSurferInstance);

    return () => {
      waveSurferInstance.destroy();
    };
  }, [options, containerRef]);

  return waveSurfer;
};

// Create a React component that will render waveSurfer.
// Props are waveSurfer options.
export const WaveSurferPlayer = (props) => {
  const containerRef = useRef();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const waveSurfer = useWaveSurfer(containerRef, props);

  // On play button click
  const onPlayClick = useCallback(() => {
    waveSurfer.isPlaying() ? waveSurfer.pause() : waveSurfer.play();
  }, [waveSurfer]);

  // Initialize waveSurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!waveSurfer) return;
    console.log(waveSurfer);
    setCurrentTime(0);
    setIsPlaying(false);

    const subscriptions = [
      waveSurfer.on("ready", () => {
        setHasLoaded(true);
        setDuration(waveSurfer.decodedData.duration);
      }),
      waveSurfer.on("play", () => setIsPlaying(true)),
      waveSurfer.on("pause", () => setIsPlaying(false)),
      waveSurfer.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [waveSurfer]);

  return (
    <>
      <div
        ref={containerRef}
        style={{ minHeight: "120px", display: hasLoaded ? "block" : "none" }}
      />
      {!hasLoaded && <h1>Loading...</h1>}
      <svg viewBox={`0 0 ${duration} 48`} width="100%" height="48px">
        <circle cx={duration/2} cy={48/2} r="20" fill="#FFF" />
      </svg>
      <button onClick={onPlayClick} style={{ marginTop: "1em" }}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <p>{formatSeconds(currentTime)}</p>
    </>
  );
};
