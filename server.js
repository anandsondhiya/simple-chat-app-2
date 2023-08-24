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

const slashCommands = {
    "/help": "Emoji codes:- smile:😄 happy: 😃 react: ⚛️  woah: 😲 hey: 👋 lol: 😂 like: ❤️ congratulations: 🎉",
    "/about": "This is information about the chat application.",
    "/clear": clearChat,
    // Add more slash commands and responses as needed
};


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

function clearChat() {
    io.emit('clear chat');
}


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // socket.on('chat message', (msg) => {
        
    //     io.emit('chat message', msg); // Broadcast the message to all connected clients
    // });
    
    // socket.on('chat message', (msg) => {
    //     const words = msg.split(' ');
    //     const transformedWords = words.map(word => {
    //         if (emojiDictionary[word])  {
    //             return emojiDictionary[word];
    //         }
    //         return word;
    //     });
    //     const transformedMessage = transformedWords.join(' ');

    //     io.emit('chat message', transformedMessage); // Broadcast the message to all connected clients
    // });


    // socket.on('chat message', (msg) => {
    //     if (msg.startsWith('/')) {
    //         const command = msg.split(' ')[0]; // Extract the command from the message
    //         if (slashCommands[command]) {
    //             socket.emit('chat message', slashCommands[command]);
    //         }
    //     } else {
    //         const words = msg.split(' ');
    //         const transformedWords = words.map(word => {
    //             if (emojiDictionary[word]) {
    //                 return emojiDictionary[word];
    //             }
    //             return word;
    //         });
    //         const transformedMessage = transformedWords.join(' ');

    //         io.emit('chat message', transformedMessage); // Broadcast the message to all connected clients
    //     }
    // });

    //latest update:

    socket.on('chat message', (msg) => {
        if (msg.startsWith('/')) {
            const command = msg.split(' ')[0]; // Extract the command from the message
            if (slashCommands[command]) {
                if (typeof slashCommands[command] === 'function') {
                    slashCommands[command](); // Call the function associated with the command
                } else {
                    // socket.emit('chat message', slashCommands[command]); // Send response message

                    io.emit('chat message', slashCommands[command]);
                }
            }
        } else {
            // ... emoji replacement and regular message handling ...
            const words = msg.split(' ');
            const transformedWords = words.map(word => {
                if (emojiDictionary[word]) {
                    return emojiDictionary[word];
                }
                return word;
            });
            const transformedMessage = transformedWords.join(' ');

            io.emit('chat message', transformedMessage); // Broadcast the message to all connected clients
        }
    });







    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

