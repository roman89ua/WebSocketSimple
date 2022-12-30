const status = document.getElementById("status");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

function setStatus(value) {
    status.innerHTML = value;
}

function printMessage(value) {
    const liElement = document.createElement("li");

    liElement.innerHTML = value;
    messages.appendChild(liElement)
}

const webSocket = new WebSocket("ws://localhost:8000");

webSocket.onopen = () => setStatus("ONLINE");
webSocket.onmessage = (response) => printMessage(response.data);

webSocket.onclose = () => {
    setStatus("OFFLINE");
    printMessage("You have been disconnected from the server :( ");
};

webSocket.onerror = (error) => printMessage(error);
form.addEventListener("submit", (event) => {
    event.preventDefault();

    webSocket.send(input.value);
    input.value = "";
})