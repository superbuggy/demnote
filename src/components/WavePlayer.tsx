"use client";

import React from "react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.js";
import { WaveSurferPlayer } from "./WaveSurfer";
// Another React component that will render two wavesurfers

const { useState, useCallback } = React;

export default function Player() {
  const urls = [
    "https://cdn.freesound.org/previews/692/692930_1648170-lq.mp3",
    "https://cdn.freesound.org/previews/692/692930_1648170-hq.mp3",
  ];
  const [audioUrl, setAudioUrl] = useState(urls[0]);

  // Swap the audio URL
  const onUrlChange = useCallback(() => {
    urls.reverse();
    setAudioUrl(urls[0]);
  }, []);

  // Render the wavesurfer component
  // and a button to load a different audio file
  return (
    <>
      <WaveSurferPlayer
        height={100}
        waveColor="rgb(200, 0, 200)"
        progressColor="rgb(100, 0, 100)"
        url={audioUrl}
        plugins={[Timeline.create()]}
      />

      <button onClick={onUrlChange}>Change audio</button>
    </>
  );
}
