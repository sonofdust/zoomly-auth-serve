import {Request, Response} from "express";
import {config} from "../config";
import {Configuration, CreateCompletionRequest, OpenAIApi} from "openai";
import getPrompt from "../services/promptService";

const configuration = new Configuration({
  organization: "org-8mjSgvDurZbkl4cnKUfpD2VB",
  apiKey: config.openApiKey,
});
const openai = new OpenAIApi(configuration);

export default async function getOpenAI(req: Request, res: Response) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }
  //console.log("My Data:", req.body);

  const prompt = getPrompt(req.body.prompt);

  try {
    let completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: getPrompt(prompt)}],
      temperature: 0.2,
    });

    res
      .status(200)
      .json(JSON.parse(completion.data.choices[0].message?.content as string));
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
