import React from "react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.js";
import { WaveSurferPlayer } from "./WaveSurfer";

interface WavePlayerProps {
  audioUrl: string;
}

const Player: React.FC<WavePlayerProps> = React.memo(function Player(props) {
  return (
    <>
      <WaveSurferPlayer
        height={100}
        waveColor="rgb(200, 0, 200)"
        progressColor="rgb(100, 0, 100)"
        url={props.audioUrl}
        plugins={[Timeline.create()]}
      />
    </>
  );
});
export default Player;
