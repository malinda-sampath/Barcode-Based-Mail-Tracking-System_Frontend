import React from "react";
import { FaQuestionCircle, FaPhone, FaBug, FaTools, FaSignOutAlt, FaClock } from "react-icons/fa";

const HelpAndSupport = () => {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="m-12">
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010] ml-12">Help & Support</h1>
        <p className="text-xs sm:text-sm text-gray-500 ml-12">{currentDate}</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200 ml-12">
        <div className="mb-8">
          <p className="text-gray-600 mb-8">
            Welcome to the Barcode-Based Mail Tracking System help center. If you need assistance, 
            please refer to the following resources.
          </p>

          {/* FAQ Section */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-black-500">
              <FaQuestionCircle className="mr-2" /> Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {/* Login FAQ */}
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-[#f8f0f0] transition-colors">
                <h3 className="font-medium text-black-500 mb-2">How do I log in?</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Go to the login page and enter your <span className="text-black-500 font-medium">username</span> and <span className="text-black-500 font-medium">password</span></li>
                  <li>If you forgot your password, click <span className="text-black-500 font-medium">"Forgot Password?"</span> to reset it</li>
                </ul>
              </div>

              {/* Tracking FAQ */}
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-[#f8f0f0] transition-colors">
                <h3 className="font-medium text-black-500 mb-2">How do I track a mail item?</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Enter the <span className="text-black-500 font-medium">barcode number</span> in the search field</li>
                  <li>Click <span className="text-black-500 font-medium">"Track"</span> to view the mail status and location</li>
                </ul>
              </div>

              {/* Barcode FAQ */}
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-[#f8f0f0] transition-colors">
                <h3 className="font-medium text-black-500 mb-2">Why can't I scan a barcode?</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Ensure your device camera has permission to scan</li>
                  <li>Check that the barcode is <span className="text-black-500 font-medium">not damaged or blurry</span></li>
                  <li>Try manual entry if scanning fails</li>
                </ul>
              </div>

              {/* Logout FAQ */}
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-[#f8f0f0] transition-colors">
                <h3 className="font-medium text-black-500 mb-2 flex items-center">
                  <FaSignOutAlt className="mr-2" /> How do I log out?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Click the <span className="text-black-500 font-medium">"Logout"</span> button in the top-right corner</li>
                  <li>You will be redirected to the login page</li>
                </ul>
              </div>

              {/* Session FAQ */}
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-[#f8f0f0] transition-colors">
                <h3 className="font-medium text-black-500 mb-2 flex items-center">
                  <FaClock className="mr-2" /> What if my session expires?
                </h3>
                <p className="text-gray-700 pl-6">
                  Simply log in again. Sessions expire after <span className="text-black-500 font-medium">30 minutes</span> of inactivity for security.
                </p>
              </div>
            </div>
          </div>

          {/* Contact and Support Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Contact Support */}
            <div className="border border-gray-200 rounded-lg p-5 hover:bg-[#f8f0f0] transition-colors">
              <h2 className="text-lg font-semibold text-black-500 mb-3 flex items-center">
                <FaPhone className="mr-2" /> Contact Support
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">📧</span>
                  <div>
                    <strong className="text-black-500">Email:</strong><br/>
                    support@mailtracking.com
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">📱</span>
                  <div>
                    <strong className="text-black-500">Phone:</strong><br/>
                    +94 (41) 123-4567
                  </div>
                </li>
              </ul>
            </div>

            {/* Report Issues */}
            <div className="border border-gray-200 rounded-lg p-5 hover:bg-[#f8f0f0] transition-colors">
              <h2 className="text-lg font-semibold text-black-500 mb-3 flex items-center">
                <FaBug className="mr-2" /> Report Issues
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">📧</span>
                  <div>
                    <strong className="text-black-500">Technical Support:</strong><br/>
                    techsupport@mailtracking.com
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* System Requirements */}
          <div className="border border-gray-200 rounded-lg p-5 hover:bg-[#f8f0f0] transition-colors mb-8">
            <h2 className="text-lg font-semibold text-black-500 mb-3 flex items-center">
              <FaTools className="mr-2" /> System Requirements
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong className="text-black-500">Browser:</strong> Chrome, Firefox, Edge</li>
              <li><strong className="text-black-500">Internet:</strong> Stable connection required</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-6 ml-12">
        <p className="text-lg text-black-500 font-medium">
          Thank you for using our Barcode Mail Tracking System!
        </p>
      </div>
    </div>
  );
};

export default HelpAndSupport;