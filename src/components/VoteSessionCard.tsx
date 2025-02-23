"use client";

import { VoteSession } from "@/lib/types";
import { useVoteStore } from "@/lib/store";
import { motion } from "framer-motion";

export default function VoteSessionCard({ session }: { session: VoteSession }) {
  const vote = useVoteStore((state) => state.vote);
  const getVoteCount = useVoteStore((state) => state.getVoteCount);
  const totalVotes = session.options.reduce((acc, opt) => 
    acc + getVoteCount(session.id, opt.id), 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-bold mb-2">{session.title}</h3>
      <p className="text-gray-600 mb-4">{session.description}</p>

      <div className="space-y-3">
        {session.options.map((option) => {
          const voteCount = getVoteCount(session.id, option.id);
          const percentage = totalVotes ? (voteCount / totalVotes) * 100 : 0;

          return (
            <div key={option.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{option.text}</span>
                <span>{getVoteCount(session.id, option.id)} votes</span>
              </div>
              <div className="relative h-8">
                <div className="absolute inset-0 bg-gray-200 rounded">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className="h-full bg-blue-600 rounded"
                  />
                </div>
                <button
                  onClick={() => vote(session.id, option.id)}
                  className="absolute inset-0 hover:bg-black hover:bg-opacity-5 transition-colors rounded"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Created {session.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
}
