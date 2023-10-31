import React, { useRef } from "react";
import WaveSurferPlayer from "./WaveSurfer";
import { useWaveSurfer } from "../hooks/wavesurfer";
interface WavePlayerProps {
  audioUrl: string;
}

const formatSeconds = (durationInSeconds: number): string => {
  const minutesExact = durationInSeconds / 60;
  const minutes = Math.floor(minutesExact);
  const seconds = `${Math.round(60 * (minutesExact - minutes))}`.padStart(
    2,
    "0"
  );
  return `${minutes}:${seconds}`;
};

const Player: React.FC<WavePlayerProps> = function Player(props) {
  const containerRef = useRef(null);

  const { isPlaying, hasLoaded, duration, currentTime, onClick } =
    useWaveSurfer(containerRef, props.audioUrl);

  return (
    <>
      <WaveSurferPlayer hasLoaded={hasLoaded} ref={containerRef} />
      <svg viewBox={`0 0 ${duration} 48`} width="100%" height="48px">
        <circle cx={duration / 2} cy={48 / 2} r="20" fill="#FFF" />
      </svg>
      <p>{formatSeconds(currentTime)}</p>
      <button onClick={onClick} style={{ marginTop: "1em" }}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </>
  );
};

export default Player;
