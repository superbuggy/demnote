import { useState, useCallback, useEffect } from "react";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";

export function useRegionsPlugin(comments, showComment, editingState) {
  const [regionsPlugin] = useState<RegionsPlugin>(RegionsPlugin.create());

  console.log(editingState, "in useRegions");

  const drawRegions = useCallback(() => {

    console.log("drawRegions");

    regionsPlugin.clearRegions();
    comments.forEach((comment) => {

      const region = regionsPlugin.addRegion({
        start: comment.startTime,
        end: comment.endTime,
        content: comment.title,
        color: "#8ABA7855",
        drag: editingState[comment.id].isEditingSelection, // TODO: isAuthorCurrentUser
        resize: editingState[comment.id].isEditingSelection, // TODO: isAuthorCurrentUser
        id: `comment-region-${comment.id}`,
      });
      region.on("over", () => showComment(comment.id));
      region.on("leave", () => showComment(null));
    });
  }, [regionsPlugin, comments, showComment, editingState]);

  // useEffect(drawRegions, [editingState, drawRegions])

  return {
    regionsPlugin,
    drawRegions,
  };
}
