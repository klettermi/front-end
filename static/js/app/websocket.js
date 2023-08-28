// const stompClient = new StompJs.Client({
//     brokerURL: 'ws://localhost:8080/ws-chat'
// });

// var clientId = "1";

// stompClient.onConnect = (frame) => {
//     setConnected(true);
//     console.log('Connected: ' + frame);
//     // stompClient.subscribe('/queue/registration', (response) => {
//     //     console.log(JSON.parse(response.body).content);
//     // });
//     stompClient.subscribe(`/user/${clientId}/queue/updates`, (response) => {
//         console.log(JSON.parse(response.body).content);
//     });
// };

// stompClient.onWebSocketError = (error) => {
//     console.error('Error with websocket', error);
// };

// stompClient.onStompError = (frame) => {
//     console.error('Broker reported error: ' + frame.headers['message']);
//     console.error('Additional details: ' + frame.body);
// };

var socket = new WebSocket('ws://localhost:8080/ws-chat/websocket');

socket.onopen = function() {
    console.log('WebSocket connection opened.');
    subscribeToUserUpdates('1'); // Replace with the actual user ID
};

socket.onmessage = function(event) {
    // Handle the received update
    var updateMessage = event.data;
    console.log('Received update: ' + updateMessage);
};

function subscribeToUserUpdates(userId) {
    socket.send('/queue/updates');
    // socket.send('/user/' + userId + '/queue/updates');
}
