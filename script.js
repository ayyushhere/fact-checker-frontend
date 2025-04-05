const checkButton = document.getElementById("checkBtn");
const inputField = document.getElementById("factInput");
const resultDiv = document.getElementById("result");

// Event listener for the button
checkButton.addEventListener("click", handleFactCheck);

// Trigger on Enter key as well
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleFactCheck();
  }
});

async function handleFactCheck() {
  const userFact = inputField.value.trim();

  // Validate input
  if (!userFact) {
    resultDiv.textContent = "⚠️ Please enter a fact to check.";
    return;
  }

  // Show loader text
  resultDiv.textContent = "⏳ Checking...";

  try {
    const response = await fetch("https://fact-checker-8nfys9qyd-ayushs-projects-fbb8c3e6.vercel.app/api/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fact: userFact })
    });

    const data = await response.json();

    if (data?.result) {
      resultDiv.textContent = `✅ ${data.result}`;
    } else {
      resultDiv.textContent = "❌ The fact appears to be incorrect.";
    }
  } catch (error) {
    resultDiv.textContent = "🚫 Error checking fact. Please try again.";
    console.error("Error:", error);
  }
}
