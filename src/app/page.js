import { Suspense } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import VerticalStack from "../shared/VerticalStack";
import Feedback from "./Feedback";

export default function Home() {
  return (
    <VerticalStack
      as="main"
      className={styles.main}
      themeColor="primary"
      framingStyle="topPrimary"
    >
      <Link href="/board">Board</Link>
      <Suspense fallback={<p>Loading feedback</p>}>
        <Feedback />
      </Suspense>
    </VerticalStack>
  );
}
