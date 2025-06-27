import { GoogleGenAI } from "@google/genai";
import express from "express";
import { config } from "dotenv";

config();
const app = express();
const PORT = process.env.PORT || 3001;

const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY,
});

async function generateReadme(repoUrl) {
    console.log("Generating README for : ", repoUrl);

    const PROMPT = `Given is a github repository link, generate a README.md file for it. ${repoUrl}`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:[{
            parts: [{ text: PROMPT}]
        }]
    });
    
    const text = response.text || "No content generated";
    return text;
}

//GET Route to generate README
app.get("/generate-readme", async (req,res) => {
    const repoUrl = req.query.repo;

    if (!repoUrl) {
        return res.status(400).send("Repository URL is required");
    }

    try {
        const result = await generateReadme(repoUrl);
        res.type("text/plain").send(result);
    } catch (error) {
        console.error("Error generating README:", error);
        res.status(500).send("Error generating README");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);   

});