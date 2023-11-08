export default function CommentDetails(props) {
  const { shownComment, isInTooltip } = props;

  return (
    shownComment && (
      <section>
        <h2>{shownComment.title}</h2>
        <p className="byline">{shownComment.author.name}</p>
        <p className="comment-text">{shownComment.text}</p>
        <nav>
          <button>Edit Text</button>
          <button>Change Selection</button>
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
            padding: 1rem;
          }
        `}</style>
      </section>
    )
  );
}
