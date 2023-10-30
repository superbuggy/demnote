import { useCallback } from "react";
import styles from "../app/page.module.css";

export default function Comments(props) {
  console.log(props)
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
            •{comment.title}
          </li>
        ))}
        {/* <li>Comment #1</li>
        <li>Comment #2</li>
        <li>Comment #3</li> */}
      </ul>
      <style jsx>{`
        aside {
          grid-column: 1 / 2;
        }
      `}</style>
    </aside>
  );
}
