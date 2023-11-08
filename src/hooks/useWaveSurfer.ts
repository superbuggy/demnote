// Import WaveSurfer
import { useState, useEffect, useCallback } from "react";
import { WaveSurferOptions } from "wavesurfer.js";

import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";

// WaveSurfer hook
export const useWaveSurfer = (
  containerRef,
  audioUrl,
  comments,
  showComment,
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

  useEffect(() => {
    const regionsPlugin = RegionsPlugin.create();
    const timelinePlugin = TimelinePlugin.create();

    const waveSurferInstance = WaveSurfer.create({
      height: 100,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: audioUrl,
      plugins: [timelinePlugin, regionsPlugin],
      container: containerRef.current,
    } as WaveSurferOptions);

    setWaveSurfer(() => waveSurferInstance);
    waveSurferInstance.on("decode", () => {
      comments.forEach((comment) => {
        const region = regionsPlugin.addRegion({
          start: comment.startTime,
          end: comment.endTime,
          content: comment.title,
          color: "#8ABA7855",
          drag: true, // TODO: isAuthorCurrentUser
          resize: true, // TODO: isAuthorCurrentUser
          id: `comment-region-${comment.id}`,
        });
        region.on("over", () => showComment(comment.id));
        region.on("leave", () => showComment(null));
      });
    });
    return () => {
      waveSurferInstance.destroy();
    };
  }, [audioUrl, containerRef, comments, setWaveSurfer, showComment]);

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
