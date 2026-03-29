let HF_TOKEN;

function getToken() {
  if (!HF_TOKEN) {
    HF_TOKEN = prompt("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:");
  }
  return HF_TOKEN;
}
