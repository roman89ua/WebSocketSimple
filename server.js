const ws = require("ws")

const server = new ws.Server({
    port: 8000
});
server.on("connection", (ws) => {

    ws.on("message", (message) => {
        server.clients.forEach((client) => {
            (client.readyState === ws.OPEN)
                ? client.send(message.toString())
                : client.send(client);
        });
    });
    ws.send("You are connected to web socket server :)");
})
