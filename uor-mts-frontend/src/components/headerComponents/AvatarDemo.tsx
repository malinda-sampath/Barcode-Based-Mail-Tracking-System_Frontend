import { Avatar } from "../ui/avatar/avatar";
import { AvatarFallback } from "../ui/avatar/avatarFallback";
import { AvatarImage } from "../ui/avatar/avatarImage";
import { useState, useEffect } from "react";

interface AvatarDemoProps {
  name?: string;
  profilePicture?: string;
}

export function AvatarDemo({ name, profilePicture }: AvatarDemoProps) {
  const [localProfilePicture, setLocalProfilePicture] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (profilePicture) {
      setLocalProfilePicture(
        profilePicture.startsWith("data:image")
          ? profilePicture
          : `data:image/jpeg;base64,${profilePicture}`
      );
    }
  }, [profilePicture]);

  return (
    <Avatar>
      {localProfilePicture ? (
        <AvatarImage
          src={localProfilePicture}
          alt="Profile"
          className="object-cover"
        />
      ) : (
        <AvatarFallback className="text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          {name?.charAt(0).toUpperCase() || "U"}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
