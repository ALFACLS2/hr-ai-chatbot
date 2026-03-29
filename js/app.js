let HF_TOKEN;

function getToken() {
  if (!HF_TOKEN) {
    HF_TOKEN = prompt("Masukin HuggingFace token lo:");
  }
  return HF_TOKEN;
}
