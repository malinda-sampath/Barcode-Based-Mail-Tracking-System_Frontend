import React, { useState } from "react";
import { FiEye, FiUser, FiUsers, FiMail, FiCircle, FiPhone, FiMapPin } from "react-icons/fi";

interface User {
  id: string;
  name: string;
  insertDate: string;
  isOnline: boolean;
  role: string;
  lastActivity: string;
  email: string;
  phone?: string;
  address?: string;
  branch: string;
  managedSince?: string;
  vehicles?: string[];
}

const Button = ({ text, bgColor, hoverColor, height, width, onClick }: { 
  text: string; 
  bgColor: string; 
  hoverColor: string; 
  height: string; 
  width: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`${bgColor} ${height} ${width} rounded text-white font-medium transition-colors hover:${hoverColor} flex items-center justify-center`}
  >
    {text}
  </button>
);

const UserActivityLogs = () => {
  // Sample data with TypeScript typing
  const adminLogs: User[] = [
    {
      id: "AD001",
      name: "John Admin",
      insertDate: "2023-05-15 09:30:00",
      isOnline: true,
      role: "Super Admin",
      lastActivity: "2023-05-15 14:45:00",
      email: "john.admin@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY",
      branch: "Headquarters"
    },
    {
      id: "AD002",
      name: "Sarah Manager",
      insertDate: "2023-05-14 10:15:00",
      isOnline: false,
      role: "Admin",
      lastActivity: "2023-05-14 17:30:00",
      email: "sarah.manager@example.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Boston, MA",
      branch: "Main Office"
    }
  ];

  const branchManagerLogs: User[] = [
    {
      id: "BM001",
      name: "Mike Branch",
      insertDate: "2023-05-15 08:45:00",
      isOnline: true,
      role: "Branch Manager",
      lastActivity: "2023-05-15 15:20:00",
      email: "mike.branch@example.com",
      phone: "+1 (555) 456-7890",
      address: "789 Pine Rd, Chicago, IL",
      branch: "North Branch",
      managedSince: "2022-01-10"
    },
    {
      id: "BM002",
      name: "Lisa Supervisor",
      insertDate: "2023-05-16 09:15:00",
      isOnline: false,
      role: "Branch Manager",
      lastActivity: "2023-05-16 18:30:00",
      email: "lisa.supervisor@example.com",
      phone: "+1 (555) 789-0123",
      address: "321 Elm Blvd, Houston, TX",
      branch: "South Branch",
      managedSince: "2021-11-05"
    }
  ];

  const mailHandlerLogs: User[] = [
    {
      id: "MH001",
      name: "David Courier",
      insertDate: "2023-05-15 11:20:00",
      isOnline: true,
      role: "Mail Handler",
      lastActivity: "2023-05-15 11:25:00",
      email: "david.courier@example.com",
      phone: "+1 (555) 234-5678",
      address: "159 Maple Ln, Phoenix, AZ",
      branch: "Central Hub",
      vehicles: ["Truck-05", "Van-12"]
    },
    {
      id: "MH002",
      name: "Emily Delivery",
      insertDate: "2023-05-14 13:10:00",
      isOnline: false,
      role: "Mail Handler",
      lastActivity: "2023-05-14 18:00:00",
      email: "emily.delivery@example.com",
      phone: "+1 (555) 345-6789",
      address: "753 Cedar St, Philadelphia, PA",
      branch: "East Distribution",
      vehicles: ["Van-08"]
    }
  ];

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<"admin" | "branch" | "mail">("admin");

  const handleViewClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  const StatusIndicator = ({ isOnline }: { isOnline: boolean }) => (
    <div className="flex items-center">
      {isOnline ? (
        <FiCircle
          className="mr-1 text-green-500 fill-current"
          size={12}
        />
      ) : (
        <FiCircle
          className="mr-1 text-gray-600"
          size={12}
        />
      )}
      <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
    </div>
  );

  const renderTable = (data: User[]) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">ID</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Insert Date</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 text-sm">{user.id}</td>
              <td className="py-3 px-4 text-sm font-medium">{user.name}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{user.insertDate}</td>
              <td className="py-3 px-4 text-sm">
                <StatusIndicator isOnline={user.isOnline} />
              </td>
              <td className="py-3 px-4 text-sm">
                <button
                  onClick={() => handleViewClick(user)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  aria-label="View details"
                >
                  <FiEye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          No activity logs available
        </div>
      )}
    </div>
  );

  const getCurrentData = () => {
    switch (activeTab) {
      case "admin":
        return adminLogs;
      case "branch":
        return branchManagerLogs;
      case "mail":
        return mailHandlerLogs;
      default:
        return adminLogs;
    }
  };
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="m-12">
      {!selectedUser ? (
        <>
          <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010] ml-12">Activity Logs</h1>
          <p className="text-xs sm:text-sm text-gray-500 ml-12">{currentDate}</p>
          <br />
          
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6 ml-12 text-xl sm:text-2xl font-semibold">
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === "admin" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("admin")}
            >
              <div className="flex items-center text-xl sm:text-l font-semibold">
                <FiUser className="mr-2" />
                Admins
              </div>
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === "branch" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("branch")}
            >
              <div className="flex items-center text-xl sm:text-l font-semibold">
                <FiUsers className="mr-2" />
                Branch Managers
              </div>
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === "mail" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("mail")}
            >
              <div className="flex items-center text-xl sm:text-l font-semibold">
                <FiMail className="mr-2" />
                Mail Handlers
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow p-6 ml-12">
            {renderTable(getCurrentData())}
          </div>
        </>
      ) : (
        <div className="ml-12">
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
            <h2 className="text-xl font-semibold mb-6 text-[#611010]">User Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <FiUser className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-sm mt-1 text-[#611010]">{selectedUser.name}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FiMail className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm mt-1 text-[#611010]">{selectedUser.email}</p>
                </div>
              </div>
              
              {selectedUser.phone && (
                <div className="flex items-center">
                  <FiPhone className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm mt-1 text-[#611010]">{selectedUser.phone}</p>
                  </div>
                </div>
              )}
              
              {selectedUser.address && (
                <div className="flex items-start">
                  <FiMapPin className="text-gray-500 mr-2 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-sm mt-1 text-[#611010]">{selectedUser.address}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center">
                <FiCircle className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <div className="text-sm mt-1">
                    <StatusIndicator isOnline={selectedUser.isOnline} />
                  </div>
                </div>
              </div>

              {selectedUser.vehicles && selectedUser.vehicles.length > 0 && (
                <div className="flex items-start">
                  <FiCircle className="text-gray-500 mr-2 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Assigned Vehicles</p>
                    <p className="text-sm mt-1 text-[#611010]">{selectedUser.vehicles.join(", ")}</p>
                  </div>
                </div>
              )}

              {selectedUser.managedSince && (
                <div className="flex items-start">
                  <FiCircle className="text-gray-500 mr-2 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Managed Since</p>
                    <p className="text-sm mt-1 text-[#611010]">{selectedUser.managedSince}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <Button
                text="Back"
                bgColor="bg-[#F93058]"
                hoverColor="bg-[#f60f3d]"
                height="h-8"
                width="w-28"
                onClick={handleBackClick}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActivityLogs;