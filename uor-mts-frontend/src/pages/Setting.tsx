import React, { useState, useEffect } from "react";
import Button from "../components/buttonComponents/Button";
import { FaDownload, FaTrash, FaUpload, FaClock, FaCog, FaExclamationTriangle, FaArchive } from "react-icons/fa";
import ToggleSetting from "../components/popupComponent/ToggleSetting";

interface BackupData {
  totalFiles: number;
  totalSize: string;
  lastUpdated: string;
  backups: {
    id: string;
    name: string;
    size: string;
    createdAt: string;
    type: string;
  }[];
}

interface AccountInfo {
  storageUsed: string;
  accountCreated: string;
  storageLimit: string;
}

const Settings = () => {
  const [backupData, setBackupData] = useState<BackupData | null>(null);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock function to simulate fetching from database
  const fetchBackupData = async (): Promise<BackupData> => {
    return {
      totalFiles: 8,
      totalSize: "156.4 MB",
      lastUpdated: "2023-11-15 14:30:45",
      backups: [
        { id: "b001", name: "full_backup_20231115", size: "78.2 MB", createdAt: "2023-11-15 14:30:45", type: "Full" },
        { id: "b002", name: "incremental_20231114", size: "12.5 MB", createdAt: "2023-11-14 09:15:22", type: "Incremental" },
      ]
    };
  };

  const fetchAccountInfo = async (): Promise<AccountInfo> => {
    return {
      storageUsed: "142.7 MB",
      accountCreated: "2021-03-10",
      storageLimit: "500 MB"
    };
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [backupData, accountInfo] = await Promise.all([
          fetchBackupData(),
          fetchAccountInfo()
        ]);
        setBackupData(backupData);
        setAccountInfo(accountInfo);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDownloadBackup = (backupId: string) => {
    alert(`Downloading backup ${backupId}`);
  };

  const handleDownloadAll = () => {
    alert(`Downloading all ${backupData?.totalFiles} backups (${backupData?.totalSize})...`);
  };

  const handleDeleteAccount = () => {
    alert("Account deletion initiated");
  };

  if (loading) {
    return <div className="p-8 text-center">Loading backup data...</div>;
  }

  if (!backupData || !accountInfo) {
    return <div className="p-8 text-center text-red-500">Failed to load data</div>;
  }

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="m-12">
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010] ml-12">Settings</h1>
        <p className="text-xs sm:text-sm text-gray-500 ml-12">{currentDate}</p>
      </div>

      {/* Backup Summary Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200 ml-12">
        <h2 className="text-lg font-semibold mb-4">Backup Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Total Backups</p>
            <p className="text-2xl font-bold">{backupData.totalFiles}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Total Size</p>
            <p className="text-2xl font-bold">{backupData.totalSize}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Last Backup</p>
            <p className="text-2xl font-bold">
              {new Date(backupData.lastUpdated).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600">Storage Used</p>
            <p className="text-2xl font-bold">
              {accountInfo.storageUsed} of {accountInfo.storageLimit}
            </p>
          </div>
        </div>

        {/* Backup List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {backupData.backups.map((backup) => (
                <tr key={backup.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{backup.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{backup.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{backup.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(backup.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleDownloadBackup(backup.id)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      <FaDownload className="inline mr-1" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Download All Backups Section */}
      <ToggleSetting
        actionType="downloadAll"
        buttonText="Download"
        dialogTitle="Download All Backups"
        dialogDescription={
          <>
            <p>This will download all {backupData.totalFiles} backups ({backupData.totalSize}) as a single archive.</p>
            <ul className="list-disc list-inside pl-4 text-blue-500 space-y-1 mt-2">
              <li>Large download (may take several minutes)</li>
              <li>Archive will be in ZIP format</li>
              <li>Contains all backup versions</li>
            </ul>
          </>
        }
        onConfirm={handleDownloadAll}
        icon={<FaDownload className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white "size={14} />}
      />

      {/* Delete Account Section */}
      <ToggleSetting
        actionType="deleteAccount"
        buttonText="Delete"
        dialogTitle="Delete Account"
        dialogDescription={
          <>
            <p>This will immediately:</p>
            <ul className="list-disc list-inside pl-4 text-red-500 space-y-1 mt-2">
              <li>Delete your account permanently</li>
              <li>Remove all stored data and backups</li>
              <li>Cancel any active subscriptions</li>
            </ul>
          </>
        }
        onConfirm={handleDeleteAccount}
        icon={<FaTrash className="absolute left-7 top-1/2 transform -translate-y-1/2 text-white " size={14} />}
      />
    </div>
  );
};

export default Settings;