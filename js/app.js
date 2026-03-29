async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value;
  if (!userText) return;

  // ✅ tampilkan user dulu
  chatBox.innerHTML += `<div class="message user">${userText}</div>`;
  input.value = "";

  chatBox.innerHTML += `<div class="message bot" id="loading">...</div>`;

  // ✅ baru cek knowledge
  let found = null;

  for (let key in knowledge) {
    if (userText.toLowerCase().includes(key)) {
      found = knowledge[key];
      break;
    }
  }

  // ✅ kalau ketemu → stop di sini
  if (found) {
    chatBox.innerHTML += `<div class="message bot">${found}</div>`;
    return;
  }

  // 🤖 kalau ga ketemu → lanjut ke AI
  const response = await fetch(
    "https://huggingface.co/spaces/komanglegolas/chatbot-hr/run",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [userText] })
    }
  );

  const result = await response.json();
  // hapus loading
document.getElementById("loading").remove();

chatBox.innerHTML += `<div class="message bot">${botText}</div>`;
  const botText = result.data[0];

  chatBox.innerHTML += `<div class="message bot">${botText}</div>`;
}
