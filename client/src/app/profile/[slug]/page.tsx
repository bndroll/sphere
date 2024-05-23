"use client";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { ProfilesT } from "@/utils/context/UserRegistryContext";
import { EditProfile } from "@/app/profile/components/EditProfile/EditProfile";

export default function EditProfileSlug() {
  const path = usePathname();

  const a = useCallback((): ProfilesT => {
    return path.split("/")[1] as ProfilesT;
  }, []);
  return <EditProfile />;
}
