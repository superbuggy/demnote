import React, { useRef, useCallback } from "react";
import WaveSurferPlayer from "./WaveSurfer";
import { useWaveSurfer } from "../hooks/wavesurfer";
import { formatSeconds } from "../helpers";
import { CommentWithRelations } from "../types";
import { Tooltip } from "react-tooltip";
interface WavePlayerProps {
  audioUrl: string;
  comments: CommentWithRelations[];
  showComment: Function;
}

const Player: React.FC<WavePlayerProps> = function Player(props) {
  const makeHandler = useCallback(
    (id) => () => {
      props.showComment(id);
    },
    [props]
  );

  const containerRef = useRef(null);
  const height = 48;
  const { isPlaying, hasLoaded, duration, currentTime, onClick } =
    useWaveSurfer(containerRef, props.audioUrl);
  const commentMarkers = props.comments.map((comment, index) => (
    <circle
      key={index}
      data-tooltip-id={`comment-tooltip-${index}`}
      onMouseOver={makeHandler(comment.id)}
      cx={comment.startTime}
      cy={height / 2}
      r="12"
      fill="#FFF"
    />
  ));

  const commentTooltips = props.comments.map((comment, index) => (
    <Tooltip key={index} id={`comment-tooltip-${index}`} place="bottom">
      <h3>{comment.title}</h3>
      <p>{comment.author.name}</p>
      <p>{comment.text}</p>
    </Tooltip>
  ));

  return (
    <>
      <WaveSurferPlayer hasLoaded={hasLoaded} ref={containerRef} />
      <svg viewBox={`0 0 ${duration} ${height}`} width="100%" height="48px">
        {commentMarkers}
      </svg>
        {commentTooltips}
      <p>{formatSeconds(currentTime)}</p>
      <button onClick={onClick} style={{ marginTop: "1em" }}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </>
  );
};

export default Player;
