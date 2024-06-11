import React, { useState } from 'react';
import SuccessModal from './SuccessModal';

const FeedbackButton = ({ onFeedback }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState('');
  const [rating, setRating] = useState('');
  const [reason, setReason] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleSubmit = () => {
    onFeedback({ feedbackType, rating, reason, suggestions });
    setShowModal(false);
    setShowSuccessModal(true);
    setFeedbackType('');
    setRating('');
    setReason('');
    setSuggestions('');
  };

  return (
    <>
      <button
        className="mt-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark"
        onClick={() => setShowModal(true)}
      >
        Provide Feedback
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Provide Feedback</h2>
            
            <label className="block text-sm font-bold mb-2 text-gray-800 dark:text-gray-300">
              Type of Feedback:
            </label>
            <select
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 py-2 px-3"
            >
              <option value="">Select Feedback Type</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>

            <label className="block text-sm font-bold mt-4 mb-2 text-gray-800 dark:text-gray-300">
              Rating:
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 py-2 px-3"
            >
              <option value="">Select Rating</option>
              <option value="1">1 - Very Poor</option>
              <option value="2">2 - Poor</option>
              <option value="3">3 - Average</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Excellent</option>
            </select>

            <label className="block text-sm font-bold mt-4 mb-2 text-gray-800 dark:text-gray-300">
              Reason:
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 py-2 px-3"
              rows="4"
              placeholder="Please provide the reason for your feedback..."
            ></textarea>

            <label className="block text-sm font-bold mt-4 mb-2 text-gray-800 dark:text-gray-300">
              Suggestions:
            </label>
            <textarea
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 py-2 px-3"
              rows="4"
              placeholder="Any suggestions for improvement?"
            ></textarea>

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark"
                onClick={handleSubmit}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </>
  );
};

export default FeedbackButton;
