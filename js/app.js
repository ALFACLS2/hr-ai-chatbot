async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value;
  if (!userText) return;

  // tampilkan user
  chatBox.innerHTML += `<div class="message user">${userText}</div>`;
  input.value = "";

  // loading
  chatBox.innerHTML += `<div class="message bot" id="loading">...</div>`;

  // cek knowledge
  let found = null;

  for (let key in knowledge) {
    if (userText.toLowerCase().includes(key)) {
      found = knowledge[key];
      break;
    }
  }

  if (found) {
    document.getElementById("loading").remove(); // 🔥 WAJIB
    chatBox.innerHTML += `<div class="message bot">${found}</div>`;
    return;
  }

  // AI call
  const response = await fetch(
    "https://huggingface.co/spaces/komanglegolas/chatbot-hr/run",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [userText] })
    }
  );

  const result = await response.json();
  const botText = result.data[0]; // ✅ taruh sebelum dipakai

  // hapus loading
  document.getElementById("loading").remove();

  // tampilkan bot (cuma sekali)
  chatBox.innerHTML += `<div class="message bot">${botText}</div>`;
}
