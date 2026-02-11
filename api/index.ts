import express from 'express';
import cors from 'cors';
import type { IChatResponse } from '@initium/shared/types';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

interface ChatRequest {
    message: string;
}

app.post('/api/chat', (req, res) => {
    const { message } = req.body as ChatRequest;

    // Simulate AI processing delay
    setTimeout(() => {
        // Strategy A: Return API response
        const response: IChatResponse = {
            text: "I am Initium Assistant (Running on Strategy A - Live API). How can I help you with Act 60 or our AI services today?",
            source: "api"
        };
        res.json(response);
    }, 1000);
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
