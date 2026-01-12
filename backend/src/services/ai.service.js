const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: "You are a senior code reviewer. Provide detailed feedback on code quality, bugs, improvements, and best practices."
});


async function generateContent(prompt) {
    try {
        // Add a 2-second delay to avoid hitting AI rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.error('AI service error:', error);
        if (error.status === 429) {
            return 'AI service is rate limited. Please wait a few minutes and try again.';
        }
        return 'An error occurred while generating the review. Please try again later.';
    }
}

module.exports = generateContent    