// @ts-check
/**
 * @typedef {import('@initium/shared/types').IChatMessage} IChatMessage
 * @typedef {import('@initium/shared/types').IChatResponse} IChatResponse
 */

// Strategy Interface (Implicit in JS, but conceptual)
class ChatStrategy {
    /**
     * @param {string} message
     * @returns {Promise<IChatResponse>}
     */
    async getResponse(message) {
        throw new Error("Method 'getResponse' must be implemented.");
    }
}

// Strategy A: API
class ApiChatStrategy extends ChatStrategy {
    /**
     * @param {string} apiUrl
     */
    constructor(apiUrl) {
        super();
        this.apiUrl = apiUrl;
    }

    /**
     * @param {string} message
     * @returns {Promise<IChatResponse>}
     */
    async getResponse(message) {
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
            return data; // Expected { text: "...", source: "api" }
        } catch (error) {
            console.warn("ApiChatStrategy failed:", error);
            throw error; // Propagate to trigger fallback
        }
    }
}

// Strategy B: Local Fallback
class LocalChatStrategy extends ChatStrategy {
    /**
     * @param {string} knowledgeBasePath
     */
    constructor(knowledgeBasePath) {
        super();
        this.knowledgeBasePath = knowledgeBasePath;
        /** @type {{ intents: { keywords: string[], response: string }[], default: string } | null} */
        this.knowledgeBase = null;
    }

    async loadKnowledgeBase() {
        if (!this.knowledgeBase) {
            try {
                const response = await fetch(this.knowledgeBasePath);
                this.knowledgeBase = await response.json();
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

    /**
     * @param {string} message
     * @returns {Promise<IChatResponse>}
     */
    async getResponse(message) {
        await this.loadKnowledgeBase();
        const lowerMsg = message.toLowerCase();

        // Simple keyword matching for demo purposes
        // @ts-ignore
        const intent = this.knowledgeBase.intents.find((/** @type {{ keywords: string[]; }} */ i) =>
            i.keywords.some(keyword => lowerMsg.includes(keyword))
        );

        if (intent) {
            return { text: intent.response, source: 'local' };
        }

        // @ts-ignore
        return { text: this.knowledgeBase.default, source: 'local' };
    }
}

// Context
class ChatService {
    constructor() {
        this.strategies = [];
        // Initialize strategies
        // In production, API URL should come from env
        this.strategies.push(new ApiChatStrategy('http://localhost:3001/api/chat'));
        this.strategies.push(new LocalChatStrategy('/knowledge-base.json'));
    }

    /**
     * @param {string} message 
     * @returns {Promise<IChatResponse>}
     */
    async sendMessage(message) {
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
