/* script.js */
const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const imageBtn = document.getElementById("image-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value;
  addMessage("Du", userMessage);
  input.value = "";

  const botReply = await getBotReply(userMessage);
  addMessage("FckMe", botReply);
});

imageBtn.addEventListener("click", async () => {
  const imageDescription = prompt("Was soll FckMe darstellen?");
  if (!imageDescription) return;
  const imageUrl = await generateImage(imageDescription);
  addMessage("FckMe", `<img src='${imageUrl}' style='max-width:100%'>`);
});

function addMessage(sender, text) {
  const message = document.createElement("div");
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

async function getBotReply(text) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `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`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Du bist FckMe, ein sexy, flirtender KI-Chatbot." },
        { role: "user", content: text }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

async function generateImage(promptText) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `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`
    },
    body: JSON.stringify({
      prompt: promptText,
      n: 1,
      size: "512x512"
    })
  });
  const data = await response.json();
  return data.data[0].url;
}
