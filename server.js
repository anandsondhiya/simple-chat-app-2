const emojiDictionary = {
    "smile": "😄",
    "happy": "😃",
    "react": "⚛️",
    "woah": "😲",
    "hey": "👋",
    "lol": "😂",
    "like": "❤️",
    "congratulations": "🎉",
    
    // Add more word-emoji pairs as needed
};



const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // socket.on('chat message', (msg) => {
        
    //     io.emit('chat message', msg); // Broadcast the message to all connected clients
    // });
    
    socket.on('chat message', (msg) => {
        const words = msg.split(' ');
        const transformedWords = words.map(word => {
            if (emojiDictionary[word])  {
                return emojiDictionary[word];
            }
            return word;
        });
        const transformedMessage = transformedWords.join(' ');

        io.emit('chat message', transformedMessage); // Broadcast the message to all connected clients
    });


    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
