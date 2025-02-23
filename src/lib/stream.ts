"use client";

import { StreamChat, MessageResponse } from 'stream-chat';
import { useVoteStore } from './store';
import type { VotingQuestion } from './store';

// Initialize Stream Chat client
const chatClient = StreamChat.getInstance('YOUR_API_KEY');

// Create a singleton instance for the session channel
let sessionChannel: any = null;

export const initializeStream = async (username: string) => {
  try {
    // Connect user to Stream
    await chatClient.connectUser(
      {
        id: username,
        name: username,
      },
      chatClient.devToken(username)
    );

    // Create or connect to the session channel if not already connected
    if (!sessionChannel) {
      sessionChannel = chatClient.channel('messaging', 'voting-session', {
        name: 'Voting Session',
        members: [username],
      });
    }
    
    // Watch channel and get channel state
    await sessionChannel.watch();
    
    // Get all messages from the channel
    const response = await sessionChannel.query({
      messages: { limit: 100 },
      state: true
    });

    // Get questions from channel state
    const channelState = response.channel?.state || {};
    const messages = response.messages || [];

    // Process messages to get questions and votes
    const questions: VotingQuestion[] = [];
    const seenQuestions = new Set();

    // Process from oldest to newest to maintain order and get latest state
    messages.reverse().forEach((msg: MessageResponse) => {
      if (msg.type === 'regular') {
        const customData = msg.data as any;
        if (customData?.type === 'new_question' && !seenQuestions.has(customData.id)) {
          questions.push({
            id: customData.id,
            question: customData.question,
            options: customData.options,
            votes: customData.votes || {}
          });
          seenQuestions.add(customData.id);
        }
      }
    });

    // Update store with existing questions
    if (questions.length > 0) {
      useVoteStore.setState({ questions });
    }

    return sessionChannel;
  } catch (error) {
    console.error('Error connecting to Stream:', error);
    throw error;
  }
};

export const disconnectStream = async () => {
  try {
    if (chatClient.userID) {
      await chatClient.disconnectUser();
    }
  } catch (error) {
    console.error('Error disconnecting from Stream:', error);
  }
};

export { chatClient, sessionChannel };
