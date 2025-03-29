// src/services/openai.js
import { OpenAI } from "openai";

// Initialize the OpenAI client with your environment variable
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Function to get a response from Elise
export const getChatbotResponse = async (message, conversationHistory = []) => {
  try {
    // Format the conversation history for the API
    const formattedMessages = [
      {
        role: "system",
        content:
          "You are Elise, an eco-friendly AI assistant for ecoQuest. You help users understand sustainable practices, answer questions about eco-friendly behaviors, and explain how the ecoQuest platform works. Keep responses concise, friendly, and focused on sustainability topics.",
      },
      ...conversationHistory,
      { role: "user", content: message },
    ];

    // Make the API call
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: formattedMessages,
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};
