import * as dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = "gpt-4o-mini";

(async () => {
  // Create an assistant
  const personalTrainerAssistance = await client.beta.assistants.create({
    name: "Personal Trainer",
    instructions:
      "You are the best personal trainer and nutritionist in the world. You are helping a client who wants to lose weight. You've trained high-caliber athletes and movie stars.",
    model,
  });

  console.log("assistant id", personalTrainerAssistance.id);

  // Create a thread
  const thread = await client.beta.threads.create({
    messages: [
      {
        role: "user",
        content:
          "How do I get started working out to lose fat and build muscles?",
      },
    ],
  });

  console.log("thread id", thread.id);

  const assistantId = personalTrainerAssistance.id;
  const threadId = thread.id;

  //Create a message
  const messageP =
    "What are the best exercises to lose fat and build lean muscles?";

  const message = await client.beta.threads.messages.create(threadId, {
    role: "user",
    content: messageP,
  });

  //Run the assistant
  const run = await client.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    instructions: "Please address the user as Samuel",
  });

  const runId = run.id;

  console.log("run id", runId);

  const runsRetrieval = await client.beta.threads.runs.retrieve(
    threadId,
    runId
  );

  console.log(runsRetrieval);

  if (runsRetrieval.completed_at) {
    console.log(
      "elapsed time",
      runsRetrieval.completed_at - runsRetrieval.created_at
    );
  }

  const messagesResponse = await client.beta.threads.messages.list(threadId);
  const response = messagesResponse.data[0].content[0];
  console.log("Final response:", response);

  //Steps logs
  const steps = await client.beta.threads.runs.steps.list(threadId, runId);
  console.log("steps", steps);
})();
