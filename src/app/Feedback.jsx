import { auth } from "google-auth-library";

async function getIdToken() {
  // https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest#loading-credentials-from-environment-variables

  console.log(process.env);
  const authObject = {
    // Non-NEXT_PUBLIC_ environment variables are only available in the Node.js environment, meaning they aren't accessible to the browser (the client runs in a different environment).
    // https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser
    client_id: process.env.CLIENT_ID,
    client_email: process.env.CLIENT_EMAIL,
    project_id: process.env.PROJECT_ID,
    // https://stackoverflow.com/a/74668003
    private_key: process.env.PRIVATE_KEY.split(String.raw`\n`).join("\n"),
  };

  const keys = JSON.parse(JSON.stringify(authObject));

  const client = auth.fromJSON(keys);
  client.scopes = ["https://www.googleapis.com/auth/cloud-platform"];

  // known warning that this throws a node fetch in next server components
  const accessToken = await client.getAccessToken();
  return accessToken.token;
}

async function fetchData() {
  const MODEL_ID = process.env.MODEL_ID;
  const PROJECT_ID = process.env.PROJECT_ID;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${await getIdToken()}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    instances: [
      {
        context:
          "You are a friendly tutor coaching someone on how to give co-workers feedback in a professional setting. Evaluate the provided statement and provide a suggestion for that includes whether this statement is effective feedback and how it could be improved. Make sure to include emojis.Feedback should be: be specific; be prescriptive; be actionable; show references or evidence; be kind. Do not provide any further [user] inputs.", // still seeing [user] after?
        examples: [
          {
            input: {
              content: "John is incompetent",
            },
            output: {
              content:
                "In a professional setting, effective feedback is kind, specific, and prescriptive. The statement 'John is incompetent' is not kind 😞. Think about you might feel if you got that feedback. Sad, right? Next, the feedback can be specific by including a particular behavior that was observed. Like, what actually happened? Then explain the impact of that behavior. Finally, provide guidance for how John could improve next time. Let’s get started!",
            },
          },
          {
            input: {
              content:
                "John did not set the proper expectations with his stakeholders on his project which caused another team to miss an important deadline. In the future, he should set clear expectations and adjust them quickly if they change.",
            },
            output: {
              content:
                "This is good feedback, well done! 👍 You provided specific, kind, feedback and also included guidance for how John could improve in the future.",
            },
          },
        ],
        messages: [
          {
            author: "user",
            content: "Jack's PR was bad", // take this input
          },
        ],
      },
    ],
    parameters: {
      temperature: 0.3,
      maxOutputTokens: 200,
      topP: 0.8,
      topK: 40,
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // using node fetch in server component
  const data = await fetch(
    `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL_ID}:predict`,
    requestOptions
  );

  const responseBody = await data.text();
  const responseJson = JSON.parse(responseBody);

  return responseJson.predictions[0].candidates[0].content;
}

export default async function Feedback() {
  // make fetch call to google cloud to ai platform
  const response = await fetchData();

  // todo: make this dynamic
  // todo: style this with like a text bubble or something
  return <p>{response}</p>;
}
