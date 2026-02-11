
import { IChatResponse } from '@initium/shared/types';

interface IChatStrategy {
    getResponse(message: string): Promise<IChatResponse>;
}

// Strategy A: API
class ApiChatStrategy implements IChatStrategy {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async getResponse(message: string): Promise<IChatResponse> {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const data = await response.json();
            return data as IChatResponse;
        } catch (error) {
            console.warn("ApiChatStrategy failed:", error);
            throw error; // Propagate to trigger fallback
        }
    }
}

// Strategy B: Local Fallback
interface KnowledgeBase {
    intents: { keywords: string[], response: string }[];
    default: string;
}

class LocalChatStrategy implements IChatStrategy {
    private knowledgeBasePath: string;
    private knowledgeBase: KnowledgeBase | null;

    constructor(knowledgeBasePath: string) {
        this.knowledgeBasePath = knowledgeBasePath;
        this.knowledgeBase = null;
    }

    async loadKnowledgeBase() {
        if (!this.knowledgeBase) {
            try {
                const response = await fetch(this.knowledgeBasePath);
                this.knowledgeBase = await response.json() as KnowledgeBase;
            } catch (error) {
                console.error("Failed to load local knowledge base:", error);
                // Fallback to minimal hardcoded default
                this.knowledgeBase = {
                    intents: [],
                    default: "I am currently offline and unable to access my knowledge base."
                };
            }
        }
    }

    async getResponse(message: string): Promise<IChatResponse> {
        await this.loadKnowledgeBase();

        if (!this.knowledgeBase) {
            return { text: "System Error: KB not loaded", source: 'error' };
        }

        const lowerMsg = message.toLowerCase();

        const intent = this.knowledgeBase.intents.find(i =>
            i.keywords.some(keyword => lowerMsg.includes(keyword))
        );

        if (intent) {
            return { text: intent.response, source: 'local' };
        }

        return { text: this.knowledgeBase.default, source: 'local' };
    }
}

// Context
class ChatService {
    private strategies: IChatStrategy[];

    constructor() {
        this.strategies = [];
        // Initialize strategies
        // In production, API URL should come from env
        this.strategies.push(new ApiChatStrategy('http://localhost:3001/api/chat'));
        this.strategies.push(new LocalChatStrategy('/knowledge-base.json'));
    }

    async sendMessage(message: string): Promise<IChatResponse> {
        // Iterate through strategies
        for (const strategy of this.strategies) {
            try {
                const response = await strategy.getResponse(message);
                return response;
            } catch (error) {
                continue; // Try next strategy
            }
        }
        return { text: "All systems offline. Please try again later.", source: 'error' };
    }
}

export const chatService = new ChatService();
