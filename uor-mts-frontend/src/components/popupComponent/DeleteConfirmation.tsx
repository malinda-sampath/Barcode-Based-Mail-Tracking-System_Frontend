import React from 'react'

type DeleteConfirmationProps = {
    mailId: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ mailId, onConfirm, onCancel }) => {
   
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="p-6 bg-white rounded shadow-lg">
        <h2 className="text-lg font-bold">Confirm Deletion</h2>
        <p>Are you sure you want to delete mail with ID: <strong>{mailId}</strong>?</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 bg-gray-300 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation;
