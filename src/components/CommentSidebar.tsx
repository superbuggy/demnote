import { useCallback } from "react";
import { formatSeconds } from "../helpers";

export default function CommentsSideBar(props) {
  const makeHandler = useCallback(
    (id) => () => {
      props.showComment(id);
    },
    [props]
  );

  return (
    <aside>
      Comments:
      <ul>
        {props.comments.map((comment) => (
          <li onMouseOver={makeHandler(comment.id)} key={comment.id}>
            [{formatSeconds(comment.startTime)} - {formatSeconds(comment.endTime)}] {comment.title}{" "}
            <span>({comment.author.name})</span>
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          padding-left: 2em;
        }
        aside {
          grid-column: 1 / 2;
        }
        li span {
          font-style: italic;
        }
      `}</style>
    </aside>
  );
}
