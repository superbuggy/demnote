import styles from "./page.module.css";
import WavePlayer from "../components/WavePlayer";

export default function Home() {
  return (
    <>
      <h1 className={styles.center}>Demnote</h1>
      <main className={styles.main}>
        <aside className={styles["main-aside"]}>
          Comments:
          <ul>
            <li>Comment #1</li>
            <li>Comment #2</li>
            <li>Comment #3</li>
          </ul>
        </aside>
        <section className={styles["main-player"]}>
          <WavePlayer />
        </section>
      </main>
    </>
  );
}
