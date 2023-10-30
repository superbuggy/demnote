export default function CommentDetails(props) {
  const { shownComment } = props;

  return (
    shownComment && (
      <section>
        <h2>{shownComment.title}</h2>
        <p>{shownComment.author.name}</p>
        <p>{shownComment.text}</p>
      </section>
    )
  );
}
