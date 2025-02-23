"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVoteStore } from "@/lib/store";
import { initializeStream } from "@/lib/stream";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const setUser = useVoteStore((state) => state.setUser);
  const user = useVoteStore((state) => state.user);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      try {
        const channel = await initializeStream(username.trim());
        
        // Listen for new messages
        channel.on('message.new', (event: any) => {
          if (event.user?.id !== username.trim()) {
            const customData = event.message.data;
            if (customData?.type === 'new_question') {
              useVoteStore.getState().addQuestionFromStream(customData);
            }
            if (customData?.type === 'new_vote') {
              const { questionId, userId, option } = customData;
              useVoteStore.getState().addVoteFromStream(questionId, userId, option);
            }
          }
        });

        setUser({ username: username.trim() });
        router.replace("/vote");
      } catch (error) {
        console.error('Failed to initialize Stream:', error);
        // Handle error appropriately
      }
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/vote");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Welcome to VoteHub
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter your name to continue
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Your name"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Join Voting
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
