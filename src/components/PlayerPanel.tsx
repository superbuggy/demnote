import React, { useRef, useCallback, useState } from "react";
import WaveSurferPlayer from "./WaveSurfer";
import { useWaveSurfer } from "../hooks/useWaveSurfer";
import { useRegionsPlugin } from "../hooks/useRegionsPlugin";
import { useCommentEditing } from "../hooks/useCommentEditing";
import { formatSeconds } from "../helpers";
import { CommentWithRelations, Comment } from "../types";
import { Tooltip } from "react-tooltip";
import CommentDetails from "./CommentDetails";
interface WavePlayerProps {
  audioUrl: string;
  comments: CommentWithRelations[];
  showComment: Function;
  shownComment: CommentWithRelations | undefined;
}

export const PlayerPanel: React.FC<WavePlayerProps> = ({
  audioUrl,
  comments,
  showComment,
  shownComment,
}) => {
  const makeHandler = useCallback(
    (id: string | null) => () => showComment(id),
    [showComment]
  );

  const hideComment = useCallback(() => makeHandler(null), [makeHandler]);

  const containerRef = useRef(null);
  const height = 48;
  const { setCommentEditingState, editingState } = useCommentEditing(comments);
  const { regionsPlugin, drawRegions } = useRegionsPlugin(
    comments,
    showComment,
    editingState
  );
  const { isPlaying, hasLoaded, duration, currentTime, onClick } =
    useWaveSurfer(containerRef, audioUrl, regionsPlugin, drawRegions);
  // useWaveSurfer(containerRef, audioUrl, comments, showComment, editingState);

  const commentMarkers = comments.map((comment) => (
    <circle
      key={comment.id}
      data-tooltip-id={`comment-tooltip-${comment.id}`}
      onMouseOver={makeHandler(comment.id)}
      onMouseLeave={hideComment}
      cx={(comment.startTime + comment.endTime) / 2}
      cy={height / 2}
      r="12"
      fill="#FFF"
    />
  ));

  const commentTooltips = comments.map((comment) => (
    <Tooltip
      key={comment.id}
      id={`comment-tooltip-${comment.id}`}
      place="bottom"
      clickable
      isOpen={shownComment?.id === comment.id}
    >
      <CommentDetails
        setCommentEditingState={setCommentEditingState}
        commentEditingState={editingState[comment.id]}
        comment={comment}
        isInTooltip
      />
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
