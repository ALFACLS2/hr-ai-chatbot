async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value;
  if (!userText) return;

  chatBox.innerHTML += `<div class="message user">${userText}</div>`;
  input.value = "";

  const response = await fetch(
    "https://huggingface.co/spaces/komanglegolas/chatbot-hr/run",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [userText] })
    }
  );

  const result = await response.json();
  const botText = result.data[0];

  chatBox.innerHTML += `<div class="message bot">${botText}</div>`;
}
