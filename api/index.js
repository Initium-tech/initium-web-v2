import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/chat', (req, res) => {
    // Simulate AI processing delay
    setTimeout(() => {
        // Strategy A: Return API response
        res.json({
            text: "I am Initium Assistant (Running on Strategy A - Live API). How can I help you with Act 60 or our AI services today?",
            source: "api"
        });
    }, 1000);
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
