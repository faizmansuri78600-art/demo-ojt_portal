import React, { useState } from "react";
import { CloseIcon, StarIcon } from "./facultyIcons";

const FeedbackModal = ({ report, onClose, onSubmit }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    onSubmit({ text, rating }); // static/dummy submission — no backend yet
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900 text-lg">
            Add Feedback {report ? `— ${report.name}` : ""}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <label className="text-sm font-medium text-gray-700">Feedback</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Write your feedback for the student..."
          className="w-full mt-1 mb-4 border border-gray-200 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

        <label className="text-sm font-medium text-gray-700">Rating</label>
        <div className="flex items-center gap-1 mt-1 mb-5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setRating(n)} aria-label={`Rate ${n} star`}>
              <StarIcon
                filled={n <= rating}
                className={`w-6 h-6 ${n <= rating ? "text-yellow-400" : "text-gray-300"}`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-medium hover:bg-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;