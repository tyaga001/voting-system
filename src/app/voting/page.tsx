"use client";

import { useState } from "react";
import { useVoteStore } from "@/lib/store";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import CreateSessionModal from "@/components/CreateSessionModal";
import VoteSessionCard from "@/components/VoteSessionCard";
import { useRouter } from "next/navigation";

export default function VotingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sessions, user } = useVoteStore();
  const router = useRouter();

  // Redirect to login if no user
  if (!user) {
    if (typeof window !== "undefined") {
      router.push("/");
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Vote Sessions</h1>
            <p className="text-gray-600 mt-2">Welcome, {user.name}!</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            New Session
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {sessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VoteSessionCard session={session} />
            </motion.div>
          ))}
        </div>

        {sessions.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl text-gray-600 mb-4">No voting sessions yet</h2>
            <p className="text-gray-500">Create a new session to get started!</p>
          </div>
        )}

        <CreateSessionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
