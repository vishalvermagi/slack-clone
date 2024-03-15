 
let channels = [
    { name: "General", description: "General discussion" },
    { name: "Random", description: "Random chat" }
];

let messages = [
    { sender: "User1", timestamp: "12:00 PM", content: "Hello everyone!", channel: "General" },
    { sender: "User2", timestamp: "12:05 PM", content: "Hi User1!", channel: "General" }
];

let directMessages = [
    { sender: "User3", recipient: "User1", timestamp: "12:10 PM", content: "Hey, how are you?" }
];

let notifications = [
    { type: "mention", sender: "User2", channel: "General" },
    { type: "direct", sender: "User3", recipient: "Current User" }
];

 
function renderChannels() {
    const channelList = document.getElementById("channel-list");
    channelList.innerHTML = "";
    channels.forEach(channel => {
        const li = document.createElement("li");
        li.textContent = `${channel.name} - ${channel.description}`;
        channelList.appendChild(li);
    });

  
    const channelSelect = document.getElementById("channel-select");
    channelSelect.innerHTML = "";
    channels.forEach(channel => {
        const option = document.createElement("option");
        option.value = channel.name;
        option.textContent = channel.name;
        channelSelect.appendChild(option);
    });
}

 
function renderMessages() {
    const messageList = document.getElementById("message-list");
    messageList.innerHTML = "";
    messages.forEach(message => {
        const div = document.createElement("div");
        div.textContent = `${message.sender} (${message.timestamp}): ${message.content}`;
        messageList.appendChild(div);
    });
}

 
function renderDirectMessages() {
    const directMessageList = document.getElementById("direct-message-list");
    directMessageList.innerHTML = "";
    directMessages.forEach(dm => {
        const div = document.createElement("div");
        div.textContent = `${dm.sender} (${dm.timestamp}): ${dm.content} (To: ${dm.recipient})`;
        directMessageList.appendChild(div);
    });
}

 
function renderNotifications() {
    const notificationList = document.getElementById("notification-list");
    notificationList.innerHTML = "";
    notifications.forEach(notification => {
        const li = document.createElement("li");
        li.classList.add("notification");
        let message;
        if (notification.type === "mention") {
            message = `${notification.sender} mentioned you in ${notification.channel}`;
        } else if (notification.type === "direct") {
            message = `${notification.sender} sent you a direct message`;
            if (notification.recipient) {
                message += ` (To: ${notification.recipient})`;
            }
        }
        li.textContent = message;
        notificationList.appendChild(li);
    });
}

 
renderChannels();
renderMessages();
renderDirectMessages();
renderNotifications();

 
document.getElementById("create-channel-btn").addEventListener("click", function() {
    const channelName = prompt("Enter channel name:");
    const channelDescription = prompt("Enter channel description:");
    if (channelName && channelDescription) {
        channels.push({ name: channelName, description: channelDescription });
        renderChannels();
    }
});

 
document.getElementById("send-message-btn").addEventListener("click", function() {
    const messageContent = document.getElementById("message-input").value;
    const channelName = document.getElementById("channel-select").value;
    if (messageContent.trim() !== "" && channelName) {
        const sender = channelName;  
        const timestamp = new Date().toLocaleTimeString();
        messages.push({ sender, timestamp, content: messageContent, channel: channelName });
        renderMessages();
    }
});

 
document.getElementById("send-direct-message-btn").addEventListener("click", function() {
    
    const messageContent = document.getElementById("direct-message-input").value;
    const channelName = document.getElementById("direct-message-user").value;
    if (messageContent.trim() !== "" && channelName) {
        const sender = channelName; 
        const timestamp = new Date().toLocaleTimeString();
        messages.push({ sender, timestamp, content: messageContent, channel: channelName });
        renderMessages();
    }
});
