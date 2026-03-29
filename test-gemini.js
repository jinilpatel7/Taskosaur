const apiKey = process.env.GEMINI_API_KEY || "AIzaSy..."; // Fake key just to see the HTTP error
const model = "gemini-2.0-flash";
const apiUrl = "https://generativelanguage.googleapis.com/v1beta";

const messages = [
  {
    role: "user",
    content: "Hello, this is a connection test. Please respond with \"Connection successful.\"",
  },
];

const requestUrl = `${apiUrl}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

const requestBody = {
  contents: messages.map((m) => ({
    role: m.role === "assistant" ? "model" : m.role == "system" ? "model" : m.role,
    parts: [{ text: m.content }],
  })),
  generationConfig: {
    temperature: 0.1,
    maxOutputTokens: 50,
  },
};

console.log("Fetching: ", requestUrl);
console.log("Body: ", JSON.stringify(requestBody));

async function run() {
  try {
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Status: ", response.status);
    const data = await response.json();
    console.log("Data: ", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Fetch threw error:", error);
  }
}

run();
