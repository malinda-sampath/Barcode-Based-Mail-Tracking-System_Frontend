import React, { useState, useEffect } from "react";
import { HiOutlineBell } from "react-icons/hi";
import { ProfileMenu } from "../components/headerComponents/ProfileMenu";
import { fetchHeader } from "../services/HeaderService";
import { Skeleton } from "../components/ui/skeleton"; // Assuming you have a skeleton component
import { Tooltip } from "../components/ui/tooltip"; // Assuming you have a tooltip component

interface HeaderData {
  name?: string;
  profilePicture?: string;
}

const Header: React.FC = () => {
  const [headerData, setHeaderData] = useState<HeaderData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchHeader();
      if (response.status === 200) {
        const profileData = response.data;
        setHeaderData({
          name: profileData?.data?.name || "",
          profilePicture: profileData?.data?.profilePicture || "",
        });
      } else {
        setError("Failed to load profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setError("Error loading profile information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <header className="flex items-center justify-between w-full h-16 px-6 bg-white shadow-sm">
      {/* Left spacer for balance */}
      <div className="flex-1"></div>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        {/* Notification icon with tooltip
        <Tooltip text="Notifications">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <HiOutlineBell fontSize={24} className="text-[#F99C30]" />
          </button>
        </Tooltip> */}

        {/* Profile section */}
        <div className="flex items-center gap-3">
          {loading ? (
            <>
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-24 h-4 rounded" />
            </>
          ) : error ? (
            <div className="text-sm text-red-500">{error}</div>
          ) : (
            <>
              <ProfileMenu
                name={headerData.name || ""}
                profilePicture={headerData.profilePicture || ""}
              />
              <span className="text-sm font-medium text-gray-700 hidden md:inline">
                {headerData.name || "User"}
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
