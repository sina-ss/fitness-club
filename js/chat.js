document.addEventListener("DOMContentLoaded", function() {
    // Load chat data from the local JSON file
    const data = [
      {
        "Id": "chat1",
        "SenderUsername": "Trainer1",
        "ReceiverUsername": "Member1",
        "Date": "2023-07-06T09:30:00Z",
        "Text": "Hello, how can I assist you?"
      },
      {
        "Id": "chat2",
        "SenderUsername": "Member1",
        "ReceiverUsername": "Trainer1",
        "Date": "2023-07-06T09:35:00Z",
        "Text": "I have a question about the training schedule."
      },
      {
        "Id": "chat3",
        "SenderUsername": "Trainer2",
        "ReceiverUsername": "Member1",
        "Date": "2023-07-06T10:15:00Z",
        "Text": "Good morning! Are you ready for today's session?"
      }
    ];
  
    const chatList = document.getElementById("chat-list");
    data.forEach(chat => {
      const chatItem = document.createElement("div");
      chatItem.className = "chat-item";
      chatItem.textContent = `${chat.SenderUsername} - ${chat.ReceiverUsername}`;
      chatItem.addEventListener("click", function() {
        loadChatHistory(chat);
      });
      chatList.appendChild(chatItem);
    });
  
    function loadChatHistory(chat) {
      const chatHistory = document.getElementById("chat-history");
      chatHistory.innerHTML = "";
  
      // Create accordion item for the selected chat
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item";
  
      // Create accordion button (header) for the selected chat
      const accordionButton = document.createElement("h2");
      accordionButton.className = "accordion-header";
      accordionButton.innerHTML = `
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${chat.Id}">
          ${chat.SenderUsername} - ${chat.ReceiverUsername}
        </button>
      `;
  
      // Create accordion collapse (body) for the selected chat
      const accordionCollapse = document.createElement("div");
      accordionCollapse.id = `collapse-${chat.Id}`;
      accordionCollapse.className = "accordion-collapse collapse";
      accordionCollapse.setAttribute("data-bs-parent", "#chat-history");
      accordionCollapse.innerHTML = `
        <div class="accordion-body">
          <ul id="message-list-${chat.Id}" class="list-group"></ul>
          <form id="message-form-${chat.Id}">
            <div class="mb-3">
              <label for="message-${chat.Id}" class="form-label">New Message:</label>
              <textarea class="form-control" id="message-${chat.Id}" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send</button>
          </form>
        </div>
      `;
  
      // Attach event listener to the message form submission
      const messageForm = accordionCollapse.querySelector(`#message-form-${chat.Id}`);
      messageForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const messageInput = accordionCollapse.querySelector(`#message-${chat.Id}`);
        const messageText = messageInput.value;
        sendMessage(chat.Id, chat.SenderUsername, chat.ReceiverUsername, messageText);
        messageInput.value = "";
      });
  
      // Append accordion button and collapse to the accordion item
      accordionItem.appendChild(accordionButton);
      accordionItem.appendChild(accordionCollapse);
  
      // Append the accordion item to the chat history section
      chatHistory.appendChild(accordionItem);
    }
  
    function sendMessage(chatId, senderUsername, receiverUsername, messageText) {
      const date = new Date().toISOString();
      const message = {
        Id: generateUniqueId(),
        SenderUsername: senderUsername,
        ReceiverUsername: receiverUsername,
        Date: date,
        Text: messageText
      };
  
      console.log("Message sent successfully:");
      console.log(message);
  
      displaySentMessage(chatId, message);
    }
  
    function generateUniqueId() {
      return Math.random().toString(36).substr(2, 9);
    }
  
    function displaySentMessage(chatId, message) {
      const messageList = document.getElementById(`message-list-${chatId}`);
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.textContent = `${message.SenderUsername} (${message.Date}): ${message.Text}`;
      messageList.appendChild(listItem);
    }
  });
  