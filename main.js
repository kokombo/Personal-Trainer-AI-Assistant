"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var openai_1 = require("openai");
var client = new openai_1.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
var model = "gpt-4o-mini";
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var personalTrainerAssistance, thread, assistantId, threadId, messageP, message, run, runId, runsRetrieval, messagesResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.beta.assistants.create({
                    name: "Personal Trainer",
                    instructions: "You are the best personal trainer and nutritionist in the world. You are helping a client who wants to lose weight. You've trained high-caliber athletes and movie stars.",
                    model: model,
                })];
            case 1:
                personalTrainerAssistance = _a.sent();
                console.log("assistant id", personalTrainerAssistance.id);
                return [4 /*yield*/, client.beta.threads.create({
                        messages: [
                            {
                                role: "user",
                                content: "How do I get started working out to lose fat and build muscles?",
                            },
                        ],
                    })];
            case 2:
                thread = _a.sent();
                console.log("thread id", thread.id);
                assistantId = personalTrainerAssistance.id;
                threadId = thread.id;
                messageP = "What are the best exercises to lose fat and build lean muscles?";
                return [4 /*yield*/, client.beta.threads.messages.create(threadId, {
                        role: "user",
                        content: messageP,
                    })];
            case 3:
                message = _a.sent();
                return [4 /*yield*/, client.beta.threads.runs.create(threadId, {
                        assistant_id: assistantId,
                        instructions: "Please address the user as Samuel",
                    })];
            case 4:
                run = _a.sent();
                runId = run.id;
                console.log("run id", runId);
                return [4 /*yield*/, client.beta.threads.runs.retrieve(threadId, runId)];
            case 5:
                runsRetrieval = _a.sent();
                console.log(runsRetrieval);
                if (runsRetrieval.completed_at) {
                    console.log("elapsed time", runsRetrieval.completed_at - runsRetrieval.created_at);
                }
                return [4 /*yield*/, client.beta.threads.messages.list(threadId)];
            case 6:
                messagesResponse = _a.sent();
                response = messagesResponse.data[0].content[0];
                console.log("Final response:", response);
                return [2 /*return*/];
        }
    });
}); })();
// const assistantId = "asst_HVdVKNDQrjSbvOuR4szAK4Q6";
// const threadId = "thread_cHhaIo4d5ExkMkjEp3O2jnlW";
// //Create a message
// const messageP =
//   "What are the best exercises to lose fat and build lean muscles?";
// const message = await client.beta.threads.messages.create(threadId, {
//   role: "user",
//   content: messageP,
// });
// //Run the assistant
// const run = await client.beta.threads.runs.create(threadId, {
//   assistant_id: assistantId,
//   instructions: "Please address the user as Samuel",
// });
// const runId = run.id;
// //client, threadId, runId, sleepInterval
// const waitForRunCompletion = async () => {
//   const runsRetrieval = await client.beta.threads.runs.retrieve(
//     threadId,
//     runId
//   );
//   if (runsRetrieval.completed_at) {
//     console.log(
//       "elapsed time",
//       runsRetrieval.completed_at - runsRetrieval.created_at
//     );
//   }
//   const messagesResponse = await client.beta.threads.messages.list(threadId);
//   const response = messagesResponse.data[0].content[0];
//   console.log("Final response:", response);
// };
// waitForRunCompletion();
