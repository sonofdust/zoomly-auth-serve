"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const openai_1 = require("openai");
const promptService_1 = __importDefault(require("../services/promptService"));
const configuration = new openai_1.Configuration({
    organization: "org-8mjSgvDurZbkl4cnKUfpD2VB",
    apiKey: config_1.config.openApiKey,
});
const openai = new openai_1.OpenAIApi(configuration);
async function getOpenAI(req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            },
        });
        return;
    }
    //console.log("My Data:", req.body);
    const prompt = (0, promptService_1.default)(req.body.prompt);
    try {
        let completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: (0, promptService_1.default)(prompt) }],
            temperature: 0.2,
        });
        res
            .status(200)
            .json(JSON.parse(completion.data.choices[0].message?.content));
    }
    catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        }
        else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: "An error occurred during your request.",
                },
            });
        }
    }
}
exports.default = getOpenAI;
//# sourceMappingURL=openAIController.js.map