"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVoteStore } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { Vote, BarChart } from "lucide-react";

export default function VotePage() {
  const router = useRouter();
  const { user, questions } = useVoteStore();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user.username}!
          </h1>
          <button
            onClick={() => router.push("/vote/new")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Create New Question
          </button>
        </div>

        <div className="space-y-6">
          {questions.map((question) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {question.question}
              </h2>

              <div className="space-y-3">
                {question.options.map((option) => {
                  const voteCount = Object.values(question.votes).filter(v => v === option).length;
                  const totalVotes = Object.keys(question.votes).length;
                  const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                  const hasVoted = question.votes[user.username];
                  const isSelected = question.votes[user.username] === option;

                  return (
                    <div key={option} className="relative">
                      <button
                        onClick={() => !hasVoted && useVoteStore.getState().vote(question.id, option)}
                        disabled={hasVoted ? true : undefined}
                        className={`w-full p-3 rounded-md text-left transition-colors duration-200 ${
                          isSelected
                            ? "bg-blue-100 border-2 border-blue-500"
                            : hasVoted
                            ? "bg-gray-50 cursor-default"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Vote className={`w-4 h-4 mr-2 ${
                              isSelected ? "text-blue-500" : "text-gray-400"
                            }`} />
                            <span>{option}</span>
                          </div>
                          {hasVoted && (
                            <div className="flex items-center text-sm text-gray-500">
                              <BarChart className="w-4 h-4 mr-1" />
                              <span>{percentage}% ({voteCount} votes)</span>
                            </div>
                          )}
                        </div>
                      </button>
                      {hasVoted && (
                        <div 
                          className="absolute left-0 top-0 h-full bg-blue-50 rounded-md transition-all duration-500"
                          style={{ width: `${percentage}%`, zIndex: -1 }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
