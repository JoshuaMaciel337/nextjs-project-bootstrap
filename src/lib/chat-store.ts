import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Conversation, Message } from '@/types/chat';

interface ChatStore {
  conversations: Conversation[];
  currentConversationId: string | null;
  isLoading: boolean;
  addMessage: (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  createConversation: () => string;
  setCurrentConversation: (id: string) => void;
  getCurrentConversation: () => Conversation | undefined;
  setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      conversations: [],
      currentConversationId: null,
      isLoading: false,

      addMessage: (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) => {
        const conversations = get().conversations;
        const conversationIndex = conversations.findIndex((c: Conversation) => c.id === conversationId);
        
        if (conversationIndex === -1) return;

        const newMessage: Message = {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        };

        const updatedConversations = [...conversations];
        updatedConversations[conversationIndex].messages.push(newMessage);
        updatedConversations[conversationIndex].updatedAt = new Date();

        set({ conversations: updatedConversations });
      },

      createConversation: (): string => {
        const newConversation: Conversation = {
          id: crypto.randomUUID(),
          title: 'New Chat',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state: ChatStore) => ({
          conversations: [newConversation, ...state.conversations],
          currentConversationId: newConversation.id,
        }));

        return newConversation.id;
      },

      setCurrentConversation: (id: string) => {
        set({ currentConversationId: id });
      },

      getCurrentConversation: (): Conversation | undefined => {
        const { conversations, currentConversationId } = get();
        return conversations.find((c: Conversation) => c.id === currentConversationId);
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);
