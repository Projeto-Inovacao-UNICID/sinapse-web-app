'use client';

import { UserProfileCard } from "@/components/profile/user/card-profile";
import { use } from "react"; 

interface UserProfileProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UserProfile ({ params }: UserProfileProps) {
  const resolvedParams = use(params); 

  return (
    <UserProfileCard userId={resolvedParams.id} />
  );
}
