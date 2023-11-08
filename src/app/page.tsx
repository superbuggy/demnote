"use client";

import styles from "./page.module.css";
import { PlayerPanel } from "../components/PlayerPanel";
import CommentsSidebar from "../components/CommentSidebar";
import CommentDetails from "../components/CommentDetails";
import { useEffect, useState, useCallback } from "react";
import { AudioFileWithRelations, Comment } from "../types";

export default function Home() {
  const [audioFile, setAudioFile] = useState<AudioFileWithRelations>();
  const [audioFiles, setAudioFiles] = useState<AudioFileWithRelations[]>([]);
  const [shownComment, setShownComment] = useState<Comment | null>(null);

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
    (id: string | null) => {
      const commentToShow = audioFile?.comments.find(
        (comment) => id === comment.id
      );
      // if (commentToShow) 
      setShownComment(commentToShow || null);
    },
    [audioFile?.comments]
  );

  useEffect(() => {
    async function fetchAudioFiles() {
      const response = await fetch(`/api/audiofile`);
      const json = await response.json();
      setAudioFiles(() => json);
      setAudioFile(() => json[0]);
    }

    fetchAudioFiles().catch(console.error);
  }, []);
  return (
    <>
      <h1 className={styles.center}>Demnote</h1>
      {audioFile && (
        <main className={styles.main}>
          <CommentsSidebar
            comments={audioFile.comments}
            showComment={showComment}
          />
          <section className={styles["main-player"]}>
            <select onChange={onUrlChange} value={audioFile.url}>
              {audioFiles.map(({ name, url }) => (
                <option key={name} value={url}>
                  {name}
                </option>
              ))}
            </select>
            <PlayerPanel
              audioUrl={audioFile.url}
              comments={audioFile.comments}
              showComment={showComment}
              shownComment={shownComment}
            />
          </section>
          <CommentDetails shownComment={shownComment} />
        </main>
      )}
    </>
  );
}
