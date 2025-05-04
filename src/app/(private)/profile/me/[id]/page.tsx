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
    <div
      style={{  
        display: 'grid',
        gridTemplateColumns: '2fr minmax(0, 8fr) 2fr',
        minHeight: '100vh',
      }}
    >
      <UserProfileCard userId={resolvedParams.id} />
    </div>
  );
}
