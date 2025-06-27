import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";

config();
const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
    console.log("Starting AI content generation...");
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Given is a github repository link, generate a README.md file for it. https://github.com/MeeetPandya/portfolio",
    });
    console.log(response.text);
}

main()