// Import WaveSurfer
import { useState, useEffect, useCallback } from "react";
import { WaveSurferOptions } from "wavesurfer.js";

import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.js";

// WaveSurfer hook
export const useWaveSurfer = (
  containerRef,
  audioUrl,
  regionsPlugin,
  drawRegions
) => {
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer>();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

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

  // Draw Regions after audio file is decoded
  useEffect(() => {
    if (!waveSurfer) return;

    waveSurfer.registerPlugin(regionsPlugin);
    waveSurfer.on("decode", drawRegions);
  }, [waveSurfer, regionsPlugin, drawRegions]);

  // Draw regions after there's been an update to the drawRegions function
  // ie after and editing state change for comments
  useEffect(() => {
    if (!waveSurfer) return;
    drawRegions();
  }, [waveSurfer, drawRegions]);

  useEffect(() => {
    const timelinePlugin = TimelinePlugin.create();
    const waveSurferInstance = WaveSurfer.create({
      height: 100,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: audioUrl,
      plugins: [timelinePlugin],
      container: containerRef.current,
    } as WaveSurferOptions);

    setWaveSurfer(() => waveSurferInstance);
    return () => {
      waveSurferInstance.destroy();
    };
  }, [audioUrl, containerRef, setWaveSurfer]);

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
