import styles from "./page.module.css";
import Link from "next/link";
import VerticalStack from "../shared/VerticalStack";

export default function Home() {
  return (
    <VerticalStack
      as="main"
      className={styles.main}
      themeColor="primary"
      framingStyle="topPrimary"
    >
      <Link href="/board">Board</Link>
    </VerticalStack>
  );
}
