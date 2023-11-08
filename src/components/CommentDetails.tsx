import { useCallback, useState } from "react";

export default function CommentDetails(props) {
  const { comment, isInTooltip, commentEditingState, setCommentEditingState } = props;
  const { id } = comment;

  // ???: Do I need local state here?
  const [isEditingText, setIsEditingText] = useState(
    commentEditingState.isEditingText
  );
  const [isEditingSelection, setIsEditingSelection] = useState(
    commentEditingState.isEditingSelection
  );

  const handleEditClick = useCallback(() => {
    setCommentEditingState(id, "isEditingText", !isEditingText);
    setIsEditingText(!isEditingText);
  }, [setCommentEditingState, isEditingText, id]);

  const handleSelectionClick = useCallback(() => {
    setCommentEditingState(id, "isEditingSelection", !isEditingSelection);
    setIsEditingSelection(!isEditingSelection);
  }, [setCommentEditingState, isEditingSelection, id]);

  const handleSaveClick = useCallback(async () => {
    const response = await fetch(`/api/comment/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: commentEditingState.title,
        text: commentEditingState.text,
        startTime: commentEditingState.startTime,
        endTime: commentEditingState.endTime,
      }),
    });
    const data = await response.json();
    console.log(data);
    setCommentEditingState(id, "isEditingText", !isEditingText);
  }, [setCommentEditingState, isEditingText, id, commentEditingState]);

  // const handleDeleteClick
  

  return (
    comment && (
      <section>
        {isEditingText ? (
          <input
            type="text"
            onInput={(event) => {
              setCommentEditingState(id, "title", event.currentTarget.value);
            }}
            value={commentEditingState.title}
          />
        ) : (
          <h2>{comment.title}</h2>
        )}
        <p className="byline">{comment.author.name}</p>
        {isEditingText ? (
          <textarea
            className="comment-text"
            onInput={(event) => {
              console.log(event.currentTarget.value);
              setCommentEditingState(id, "text", event.currentTarget.value);
            }}
            value={comment.text}
          />
        ) : (
          <p className="comment-text">{comment.text}</p>
        )}
        <nav>
          <button onClick={handleEditClick}>
            {isEditingText ? "Cancel" : "Edit Text"}
          </button>
          <button onClick={handleSelectionClick}>Change Selection</button>
          {isEditingText && <button>Save Changes</button>}
          <button>Delete</button>
        </nav>
        <style jsx>{`
          p.byline {
            margin-bottom: 1rem;
            font-size: 0.75rem;
            font-style: italic;
          }
          p.comment-text {
            font-size: 0.75rem;
            max-width: 400px;
          }
          nav {
            margin-top: 1rem;
          }
          button:not(:last-of-type) {
            margin-right: 0.5rem;
          }

          section {
            padding: ${isInTooltip ? ".25rem" : "1rem"};
          }
        `}</style>
      </section>
    )
  );
}
