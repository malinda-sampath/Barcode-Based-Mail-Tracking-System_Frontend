import React, { useState } from 'react';

const MailTypeForm = () => {
  const [mailType, setMailType] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [registerPostCode, setRegisterPostCode] = useState('');

  // Function to generate a random tracking number
  const generateTrackingNumber = () => {
    return 'M' + Math.floor(100000 + Math.random() * 900000);
  };

  // Handle click on Regular Mail
  const handleRegularMailClick = () => {
    setMailType('REGULAR MAIL');
    setTrackingNumber(generateTrackingNumber());
    setRegisterPostCode('');
  };

  // Handle click on Register Post Mail
  const handleRegisterPostMailClick = () => {
    setMailType('REGISTER POST MAIL');
    setTrackingNumber('');
    setRegisterPostCode('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md border border-gray-200">
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mailType">
              Choose Your Mail Type <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-between mb-4 space-x-4">
              <button 
                type="button" 
                onClick={handleRegularMailClick}
                className={`bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded ${mailType === 'REGULAR MAIL' ? 'bg-gray-500 text-white' : ''}`}>
                REGULAR MAIL
              </button>
              <button 
                type="button" 
                onClick={handleRegisterPostMailClick}
                className={`bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded ${mailType === 'REGISTER POST MAIL' ? 'bg-gray-500 text-white' : ''}`}>
                REGISTER POST MAIL
              </button>
            </div>
            {mailType === 'REGULAR MAIL' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trackingNumber">
                  Your Tracking Number
                </label>
                <p className="text-gray-600">{trackingNumber}</p>
              </div>
            )}
            {mailType === 'REGISTER POST MAIL' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registerPostCode">
                  Register Post Code <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="registerPostCode" 
                  value={registerPostCode} 
                  onChange={(e) => setRegisterPostCode(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Register Post Code"
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MailTypeForm;
