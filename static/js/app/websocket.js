import { Client } from '@stomp/stompjs';
var clientId = "1";
const client = new Client({
    brokerURL: 'ws://localhost:8080/ws',
});

client.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    client.subscribe(`/sub/result/${clientId}`, (message) => {
        alert(message.body);
        client.deactivate();
        console.log("Disconnected");
    });
    client.subscribe(`/sub/order/${clientId}`, (message) => {
        console.log(message.body);
    });
};
client.activate(); // 중요

client.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

client.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};