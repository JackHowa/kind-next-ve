"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import VerticalStack from "../shared/VerticalStack";
import getReponse from "./actions";

export default function Home() {
  const [feedback, setFeedback] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    // todo: get the target properly in case other form fields
    const response = await getReponse(e.target[0].value);
    setFeedback(response);
    return response;
  }

  return (
    <VerticalStack
      as="main"
      className={styles.main}
      themeColor="primary"
      framingStyle="topPrimary"
    >
      <Link href="/board">Boards</Link>
      <h1>Kind</h1>
      <h2>A retrospective app with an emphaisis on effective communication.</h2>
      <h3>
        Instructions: Type in your feedback to your co-worker in the box. Then
        Kind AI will give you advice on how to improve your feedback based on
        five principles of good feedback:
      </h3>
      <ul>
        <li>Point to specifics</li>
        <li>Be prescriptive</li>
        <li>Be actionable</li>
        <li>Show references or evidence</li>
        <li>Be kind</li>
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="feedback">Your Feedback</label>
        <textarea id="feedback"></textarea>
        <button type="submit">Submit</button>
      </form>
      <p>Kind AI: {feedback}</p>
    </VerticalStack>
  );
}
