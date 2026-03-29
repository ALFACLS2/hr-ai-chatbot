async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value;
  if (!userText) return;
  let found = null;

for (let key in knowledge) {
  if (userText.toLowerCase().includes(key)) {
    found = knowledge[key];
    break;
  }
}

if (found) {
  chatBox.innerHTML += `<div class="message bot">${found}</div>`;
  return;
}

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
