import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Avatar } from "../components/ui/avatar/avatar";
import { AvatarFallback } from "../components/ui/avatar/avatarFallback";
import { AvatarImage } from "../components/ui/avatar/avatarImage";
import { Pencil, Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { fetchProfile, updateProfile } from "../services/ProfileService";
import ToastContainer from "../components/ui/toast/toastContainer";
import { Skeleton } from "../components/ui/skeleton";
import { Progress } from "../components/ui/progress";

interface ProfileData {
  userID: string;
  name: string;
  email: string;
  contact: string;
  profilePicture?: string;
}

export default function Profile() {
  const [toasts, setToasts] = useState<
    { message: string; type: "success" | "error" | "info" | "warning" }[]
  >([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    userID: "",
    name: "",
    email: "",
    contact: "",
    profilePicture: "",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

  const triggerToast = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    setToasts((prev) => [...prev, { message, type }]);
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return (strength / 4) * 100;
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  const fetchProfileData = async () => {
    setIsFetching(true);
    try {
      const response = await fetchProfile();
      if (response.status === 200) {
        const profileData = response.data;
        setFormData({
          userID: profileData?.data.userID,
          name: profileData?.data.name,
          email: profileData?.data.email,
          contact: profileData?.data.contact,
          profilePicture: profileData?.data.profilePicture,
        } as ProfileData);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      triggerToast("Failed to load profile data", "error");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      triggerToast("Passwords do not match", "error");
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    // Simulate upload progress (replace with actual upload progress in a real app)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const response = await updateProfile(
        {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          password,
          profilePicture,
        },
        formData.userID
      );

      clearInterval(interval);
      setUploadProgress(100);

      if (response.status === 200) {
        triggerToast("Profile updated successfully", "success");
        setEditing(false);
        setPassword("");
        setConfirmPassword("");
        setProfilePicture(null);
        fetchProfileData();
      } else if (response.status === 409) {
        triggerToast("Email already exists", "error");
      } else {
        triggerToast("Failed to update profile", "error");
      }
    } catch (error) {
      clearInterval(interval);
      console.error("Error updating profile:", error);
      triggerToast("Error updating profile", "error");
    } finally {
      setIsLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 30) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
          Profile
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 ">{currentDate}</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isFetching ? (
            <div className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center space-y-4">
                  <Skeleton className="w-40 h-40 rounded-full" />
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="md:w-2/3 space-y-6">
                  <div className="space-y-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                  <Skeleton className="h-10 w-32 ml-auto" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              {/* Avatar Section with Right Border */}
              <div className="md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold text-[#611010] mb-4">
                    User Details
                  </h2>
                  <div className="relative group mb-4">
                    <Avatar className="w-40 h-40 border-4 border-white shadow-lg relative">
                      {profilePicture ? (
                        <AvatarImage
                          src={URL.createObjectURL(profilePicture)}
                          alt="Profile"
                          className="object-cover"
                        />
                      ) : formData.profilePicture ? (
                        <AvatarImage
                          src={`data:image/jpeg;base64,${formData.profilePicture}`}
                          alt="Profile"
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="text-4xl font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                          {formData.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>

                    {editing && (
                      <label className="absolute bottom-2 right-2 flex items-center justify-center p-2 bg-indigo-600 rounded-full cursor-pointer shadow-md hover:bg-indigo-700 transition-colors duration-200 group">
                        <Pencil className="w-4 h-4 text-white" />
                        <span className="absolute -bottom-8 hidden group-hover:block text-xs bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap">
                          Change Photo
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setProfilePicture(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>

                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {formData.name}
                    </h2>
                    <p className="text-gray-500 text-sm">{formData.email}</p>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="md:w-2/3 p-8">
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-[#611010]">
                        Saving changes...
                      </span>
                      <span className="text-sm text-gray-500">
                        {uploadProgress}%
                      </span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[#611010] font-medium flex items-center">
                      Name
                      {editing && (
                        <span className="ml-2 text-xs text-gray-500">
                          (Required)
                        </span>
                      )}
                    </Label>
                    <Input
                      name="name"
                      value={formData.name}
                      disabled={!editing || isLoading}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#611010] font-medium">
                      User ID
                    </Label>
                    <Input
                      name="userID"
                      value={formData.userID}
                      disabled
                      className="w-full bg-gray-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#611010] font-medium flex items-center">
                      Email
                      {editing && (
                        <span className="ml-2 text-xs text-gray-500">
                          (Required)
                        </span>
                      )}
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      disabled={!editing || isLoading}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                    {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
                      formData.email && (
                        <span className="text-red-500 text-xs flex items-center mt-1">
                          <X className="w-3 h-3 mr-1" />
                          Invalid email format
                        </span>
                      )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#611010] font-medium">
                      Contact Number
                    </Label>
                    <Input
                      name="contact"
                      type="tel"
                      value={formData.contact}
                      disabled={!editing || isLoading}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="+94 77 123 4567"
                    />
                  </div>

                  {editing && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-[#611010] font-medium flex items-center">
                          Password
                          <span className="ml-2 text-xs text-gray-500">
                            (Leave blank to keep current)
                          </span>
                        </Label>
                        <div className="relative">
                          <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={password}
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pr-10"
                            onCopy={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                        {password && (
                          <div className="mt-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium text-green-500">
                                Password Strength:
                              </span>
                              <span className="text-xs text-gray-500">
                                {passwordStrength < 30
                                  ? "Weak"
                                  : passwordStrength < 70
                                  ? "Medium"
                                  : "Strong"}
                              </span>
                            </div>
                            <Progress
                              value={passwordStrength}
                              className={`h-1 ${getPasswordStrengthColor(
                                passwordStrength
                              )}`}
                            />
                            <div className="grid grid-cols-4 gap-2 mt-2">
                              <div className="flex items-center">
                                {password.length >= 8 ? (
                                  <Check className="w-3 h-3 text-green-500 mr-1" />
                                ) : (
                                  <X className="w-3 h-3 text-red-500 mr-1" />
                                )}
                                <span className="text-xs text-gray-500">
                                  8+ chars
                                </span>
                              </div>
                              <div className="flex items-center">
                                {/[A-Z]/.test(password) ? (
                                  <Check className="w-3 h-3 text-green-500 mr-1" />
                                ) : (
                                  <X className="w-3 h-3 text-red-500 mr-1" />
                                )}
                                <span className="text-xs text-gray-500">
                                  Uppercase
                                </span>
                              </div>
                              <div className="flex items-center">
                                {/[0-9]/.test(password) ? (
                                  <Check className="w-3 h-3 text-green-500 mr-1" />
                                ) : (
                                  <X className="w-3 h-3 text-red-500 mr-1" />
                                )}
                                <span className="text-xs text-gray-500">
                                  Number
                                </span>
                              </div>
                              <div className="flex items-center">
                                {/[^A-Za-z0-9]/.test(password) ? (
                                  <Check className="w-3 h-3 text-green-500 mr-1" />
                                ) : (
                                  <X className="w-3 h-3 text-red-500 mr-1" />
                                )}
                                <span className="text-xs text-gray-500">
                                  Special
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[#611010] font-medium">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            disabled={isLoading}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pr-10"
                            onCopy={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                        {password && confirmPassword && (
                          <div className="text-xs mt-1 flex items-center">
                            {password === confirmPassword ? (
                              <>
                                <Check className="w-3 h-3 text-green-500 mr-1" />
                                <span className="text-green-500">
                                  Passwords match
                                </span>
                              </>
                            ) : (
                              <>
                                <X className="w-3 h-3 text-red-500 mr-1" />
                                <span className="text-red-500">
                                  Passwords don't match
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="flex justify-end space-x-3 pt-4">
                    {editing ? (
                      <>
                        <Button
                          onClick={() => {
                            setEditing(false);
                            setPassword("");
                            setConfirmPassword("");
                            setProfilePicture(null);
                          }}
                          variant="outline"
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  );
}
