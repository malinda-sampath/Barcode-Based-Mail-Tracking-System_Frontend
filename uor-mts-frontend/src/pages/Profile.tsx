import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Pencil } from "lucide-react";
import { fetchProfile } from "../services/ProfileService";
import { Eye, EyeOff } from "lucide-react";

interface ProfileData {
  userID: string;
  name: string;
  email: string;
  contact: string;
}

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    userID: "",
    name: "",
    email: "",
    contact: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch profile data
  const fetchProfileData = async () => {
    try {
      const response = await fetchProfile();
      if (response.status === 200) {
        const profileData = response.data;
        setFormData({
          userID: profileData?.data.userID,
          name: profileData?.data.name,
          email: profileData?.data.email,
          contact: profileData?.data.contact,
        } as ProfileData);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
        Profile
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 ">{currentDate}</p>

      <div className="flex items-center justify-center min-h-screen p-4 ">
        <div className="w-full max-w-2xl">
          <div className="overflow-hidden bg-white rounded-xl shadow-xl">
            <div className="flex flex-col items-center p-8 space-y-8">
              {/* Avatar Section */}
              <div className="relative group">
                <Avatar className="w-40 h-40 overflow-hidden border-4 border-white shadow-lg">
                  <AvatarFallback className="text-4xl font-medium bg-gradient-to-r from-cyan-500 to-indigo-600 text-white">
                    MR
                  </AvatarFallback>
                </Avatar>
                {editing && (
                  <label className="absolute flex items-center justify-center p-3 transition-all duration-200 bg-indigo-600 rounded-full cursor-pointer bottom-2 right-2 hover:bg-indigo-700 hover:shadow-md">
                    <Pencil className="w-5 h-5 text-white" />
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                )}
              </div>

              {/* Form Section */}
              <div className="w-full space-y-6">
                <div className="space-y-2">
                  <Label className="text-[#611010] font-medium">Name</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    disabled={!editing}
                    className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none 
              transition duration-300 ease-in-out hover:shadow-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#611010] font-medium">User ID</Label>
                  <Input
                    name="userID"
                    value={formData.userID}
                    disabled
                    className="block w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-200 rounded-lg shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#611010] font-medium">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="block w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-200 rounded-lg shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#611010] font-medium">Contact</Label>
                  <Input
                    name="contact"
                    type="tel"
                    value={formData.contact}
                    disabled={!editing}
                    className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none 
              transition duration-300 ease-in-out hover:shadow-lg"
                  />
                </div>

                {editing && (
                  <>
                    <div className="space-y-2 relative">
                      <Label className="text-[#611010] font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          disabled={!editing}
                          className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm 
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none 
                    transition duration-300 ease-in-out hover:shadow-lg"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 relative">
                      <Label className="text-[#611010] font-medium">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          disabled={!editing}
                          className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm 
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none 
                    transition duration-300 ease-in-out hover:shadow-lg"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-6 pt-4 justify-end w-full">
                {editing ? (
                  <>
                    <Button
                      onClick={() => setEditing(false)}
                      className="w-28 h-10 bg-white text-gray-700 border border-gray-300 font-medium rounded-lg shadow-md 
                transition-all duration-200 transform 
                hover:bg-gray-50 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="w-28 h-10 bg-indigo-600 text-white font-medium rounded-lg shadow-md 
                transition-all duration-200 transform 
                hover:bg-indigo-700 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                      // onClick={handleSave}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-28 h-10 bg-indigo-600 text-white font-medium rounded-lg shadow-md 
              transition-all duration-200 transform 
              hover:bg-indigo-700 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                    onClick={() => setEditing(true)}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
