"use client";

import styles from "./page.module.css";
import WavePlayer from "../components/WavePlayer";
import Comments from "../components/CommentList";
import CommentDetails from "../components/CommentDetails";
import { useEffect, useState, useCallback } from "react";
import { AudioFile, Comment } from "../types";

export default function Home() {
  const [audioFile, setAudioFile] = useState<AudioFile>();
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [shownComment, setShownComment] = useState<Comment>();

  const onUrlChange = useCallback(
    (event) => {
      const nextAudioFile = audioFiles.find(
        ({ url }) => url === event.target.value
      );
      if (nextAudioFile) setAudioFile(nextAudioFile);
      if (!nextAudioFile) console.error("onUrlChange error", event);
    },
    [audioFiles]
  );

  const showComment = useCallback(
    (id) => {
      const commentToShow = audioFile?.comments.find(
        (comment) => id === comment.id
      );
      if (commentToShow) setShownComment(commentToShow);
    },
    [audioFile?.comments]
  );

  useEffect(() => {
    async function fetchAudioFiles() {
      const response = await fetch(`/api/audiofile`);
      const json = await response.json();
      setAudioFiles(() => json);
      setAudioFile(() => json[1]);
    }

    fetchAudioFiles().catch(console.error);
  }, []);
  return (
    <>
      <h1 className={styles.center}>Demnote</h1>
      {audioFile && (
        <main className={styles.main}>
          <Comments comments={audioFile.comments} showComment={showComment} />
          <section className={styles["main-player"]}>
            <select onChange={onUrlChange} value={audioFile.url}>
              {audioFiles.map(({ name, url }) => (
                <option key={name} value={url}>
                  {name}
                </option>
              ))}
            </select>
            <WavePlayer audioUrl={audioFile.url} />
          </section>
          <CommentDetails shownComment={shownComment} />
        </main>
      )}
    </>
  );
}
