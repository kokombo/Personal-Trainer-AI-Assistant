import * as dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "openai";

(async () => {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = "gpt-4o-mini";

  // Create an assistant
  const personalTrainerAssistance = await client.beta.assistants.create({
    name: "Personal Trainer",
    instructions:
      "You are the best personal trainer and nutritionist in the world. You are helping a client who wants to lose weight. You've trained high-caliber athletes and movie stars.",
    model,
  });

  console.log(personalTrainerAssistance.id);

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

  console.log(thread.id);
})();
