"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useVoteStore } from "@/lib/store";
import { X } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  options: z.array(z.string()).min(2, "At least 2 options are required"),
});

type FormData = z.infer<typeof schema>;

export default function CreateSessionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [options, setOptions] = useState<string[]>([""]);
  const addSession = useVoteStore((state) => state.addSession);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (!isOpen) return null;

  const onSubmit = (data: FormData) => {
    addSession({
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      description: data.description,
      options: options.map((text) => ({
        id: Math.random().toString(36).substr(2, 9),
        text,
      })),
      createdAt: new Date(),
      votes: {},
    });
    reset();
    setOptions([""]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create New Vote Session</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("title")}
              placeholder="Session Title"
              className="w-full p-2 border rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("description")}
              placeholder="Session Description"
              className="w-full p-2 border rounded"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-medium">Options</label>
            {options.map((_, index) => (
              <div key={index} className="flex gap-2">
                <input
                  {...register(`options.${index}`)}
                  placeholder={`Option ${index + 1}`}
                  className="w-full p-2 border rounded"
                />
                {index > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setOptions(options.filter((_, i) => i !== index))
                    }
                    className="text-red-500"
                  >
                    <X size={24} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setOptions([...options, ""])}
              className="text-blue-600 hover:text-blue-700"
            >
              + Add Option
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
}
