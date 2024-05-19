import React from 'react';

const SuccessModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Success</h2>
        <p className="text-gray-800 dark:text-gray-300 mb-4">Feedback submitted successfully!</p>
        <button
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;