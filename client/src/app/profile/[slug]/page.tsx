"use client";
import { EditProfile } from "@/app/profile/components/EditProfile/EditProfile";
import Transition from "@/components/Transition/Transition";

export default function EditProfileSlug() {
  return (
    <Transition>
      <EditProfile />
    </Transition>
  );
}
