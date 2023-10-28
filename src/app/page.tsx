import Image from "next/image";
import styles from "./page.module.css";
import WavePlayer from '../components/WavePlayer'

export default function Home() {
  return (
    <main>
      <h1 className={styles.center}>Demnote</h1>
      <WavePlayer/>
    </main>
  );
}
