import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from  "../components/ui/button";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Pencil } from "lucide-react";

export default function ProfileSettings() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Manuri Rasara",
    email: "manuri@example.com",
    password: "",
    avatar: "https://via.placeholder.com/150",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, avatar: URL.createObjectURL(file) });
    }
  };

  const handleSave = () => {
    setEditing(false);
    console.log("Updated Profile:", formData);
  };

  return (
    <>
      <div className="justify-start px-8 ml-8 sm:ml-10 md:ml-20 sm:px-10 lg:px-12">
        <h1 className="text-2xl sm:text-3xl font-semibold mt-4 text-[#611010]">
          Profile
        </h1>
        <p className="mb-6 text-sm text-gray-500 sm:text-base">Date</p>
      </div>
      <div className="flex items-center justify-center p-8 align-middle bg-gray-100">
        <div className="w-full max-w-lg space-y-8">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <Avatar className="w-32 h-32 overflow-hidden border-4 rounded-full border-black-200">
                <AvatarImage src={formData.avatar} alt="Avatar" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              {editing && (
                <label className="absolute p-2 bg-white rounded-full shadow-md cursor-pointer bottom-1 right-1">
                  <Pencil className="w-6 h-6 text-gray-600" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
            <div className="w-full space-y-3 text-lg">
              <Label>Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editing}
                className="p-3 text-lg"
              />
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editing}
                className="p-3 text-lg"
              />
              {editing && (
                <>
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="p-3 text-lg"
                  />
                </>
              )}
            </div>
            <div className="flex gap-4">
              {editing ? (
                <>
                  <Button className="px-6 py-3 text-lg" onClick={handleSave}>Save</Button>
                  <Button className="px-6 py-3 text-lg" variant="outline" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button className="px-6 py-3 text-lg" onClick={() => setEditing(true)}>Edit Profile</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}