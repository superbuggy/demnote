// Import WaveSurfer
import { useState, useEffect, useCallback } from "react";
import { WaveSurferOptions } from "wavesurfer.js";

import WaveSurfer from "wavesurfer.js";
import Timeline from "wavesurfer.js/dist/plugins/timeline.js";

// WaveSurfer hook
export const useWaveSurfer = (containerRef, audioUrl) => {
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const waveSurferInstance = WaveSurfer.create({
      height: 100,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: audioUrl,
      plugins: [Timeline.create()],
      container: containerRef.current,
    } as WaveSurferOptions);

    setWaveSurfer(() => waveSurferInstance);

    return () => {
      waveSurferInstance.destroy();
    };
  }, [audioUrl, containerRef, setWaveSurfer]);

  const onClick = useCallback(() => {
    setIsPlaying((isPlaying) => !isPlaying);
  }, [setIsPlaying]);

  useEffect(() => {
    isPlaying ? waveSurfer?.play() : waveSurfer?.pause();
  }, [isPlaying, waveSurfer]);

  useEffect(() => {
    if (!waveSurfer) return;

    const subscriptions = [
      waveSurfer.on("ready", () => {
        setHasLoaded(true);
        // @ts-ignore: Private `decodedData` overridden
        setDuration(waveSurfer.decodedData.duration);
      }),
      waveSurfer.on("play", () => setIsPlaying(true)),
      waveSurfer.on("pause", () => setIsPlaying(false)),
      waveSurfer.on("timeupdate", setCurrentTime),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
      setHasLoaded(false);
    };
  }, [waveSurfer]);

  return {
    waveSurfer,
    currentTime,
    duration,
    hasLoaded,
    isPlaying,
    setCurrentTime,
    setDuration,
    setHasLoaded,
    setIsPlaying,
    onClick,
  };
};
