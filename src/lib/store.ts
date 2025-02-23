"use client";

import { create } from "zustand";
import { sessionChannel } from "./stream";
import { generateId } from "./utils";

// Define our store types
interface User {
  username: string;
}

export interface VotingQuestion {
  id: string;
  question: string;
  options: string[];
  votes: Record<string, string>; // userId -> optionId
}

interface VoteStore {
  user: User | null;
  questions: VotingQuestion[];
  setUser: (user: User | null) => void;
  addQuestion: (question: Omit<VotingQuestion, "id" | "votes">) => void;
  vote: (questionId: string, option: string) => void;
  addQuestionFromStream: (question: VotingQuestion) => void;
  addVoteFromStream: (questionId: string, userId: string, option: string) => void;
}

// Create the store
export const useVoteStore = create<VoteStore>((set) => ({
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
  questions: typeof window !== 'undefined' ? [] : [], // Start with empty questions, will receive from stream
  setUser: (user) => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }
    set({ user });
  },
  addQuestion: (questionData) => {
    const newQuestion = {
      ...questionData,
      id: generateId(),
      votes: {}
    };
    
    // Update local state first
    set((state) => ({
      questions: [...state.questions, newQuestion]
    }));

    // Then broadcast to other users
    if (sessionChannel) {
      void sessionChannel.sendMessage({
        text: JSON.stringify(newQuestion),
        data: {
          type: 'new_question',
          ...newQuestion
        }
      });
    }
  },
  vote: (questionId, option) => {
    const username = useVoteStore.getState().user?.username;
    if (!username) return;

    // Send vote to stream
    sessionChannel?.sendMessage({
      text: 'New vote cast',
      type: 'regular',
      data: {
        type: 'new_vote',
        questionId,
        userId: username,
        option
      }
    });

    set((state) => ({
      questions: state.questions.map(q => 
        q.id === questionId
          ? {
              ...q,
              votes: {
                ...q.votes,
                [username]: option
              }
            }
          : q
      )
    }));
  },

  // Handle incoming stream events
  addQuestionFromStream: (question) =>
    set((state) => ({
      questions: [...state.questions, question]
    })),

  addVoteFromStream: (questionId, userId, option) =>
    set((state) => ({
      questions: state.questions.map(q =>
        q.id === questionId
          ? {
              ...q,
              votes: {
                ...q.votes,
                [userId]: option
              }
            }
          : q
      )
    }))
}));
