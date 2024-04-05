async function sendRequest(userInput) {
  try {
    const response = await fetch("localhost:3000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: userInput,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from the API");
    }

    const responseData = await response.json();
    appendMessage("Chatbot", responseData.answer, true);
  } catch (error) {
    console.error("Error during API call:", error);
    appendMessage("Chatbot", "Oops! Something went wrong.", true);
  }
}

function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") {
    return;
  }

  appendMessage("User", userInput, true);

  sendRequest(userInput);

  document.getElementById("user-input").value = "";
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
}

function appendMessage(sender, message, animate) {
  const chatContainer = document.getElementById("chat-container");
  const messageElement = document.createElement("div");
  messageElement.className = sender.toLowerCase() + "-message";

  if (animate) {
    messageElement.style.animation = "bubbleAppear 0.5s ease-out";
  }
  var converter = new showdown.Converter(),
    text = message,
    html = converter.makeHtml(text);

  messageElement.innerHTML = html;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
