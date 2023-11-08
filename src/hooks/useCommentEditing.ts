import { lexicalizeWith, selectIn } from "../helpers";
import { useCallback, useState } from "react";

enum CommentEditingKeys {
  IsEditingText = "isEditingText",
  IsEditingSelection = "isEditingSelection",
  IsDeletionConfirmed = "isDeletionConfirmed",
  Text = "text",
  Title = "title",
  StartTime = "startTime",
  EndTime = "endTime",
}

export function useCommentEditing(comments) {
  const [editingState, setEditingState] = useState(
    lexicalizeWith(
      selectIn("id", comments),
      Array.from({ length: comments.length }, (_, index) => ({
        isEditingText: false,
        isEditingSelection: false,
        isDeletionConfirmed: false,
        text: comments[index].text,
        title: comments[index].title,
        startTime: comments[index].startTime,
        endTime: comments[index].endTime,
      }))
    )
  );
  const setCommentEditingState = useCallback(
    (id: string, key: CommentEditingKeys, value: boolean) => {
      setEditingState(() => ({
        ...editingState,
        [id]: {
          ...editingState[id],
          [key]: value,
        },
      }));
    },
    [setEditingState]
  );
  return {
    editingState,
    setCommentEditingState,
  };
}
