'use client';

import { CompanyProfileCard } from "@/components/profile/company/card-profile";
import { use } from "react";

interface CompanyProfileProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UserProfile ({ params }: CompanyProfileProps) {
  const resolvedParams = use(params); 

  return (
    <div
      style={{  
        display: 'grid',
        gridTemplateColumns: '2fr minmax(0, 8fr) 2fr',
        minHeight: '100vh',
      }}
    >
      <CompanyProfileCard companyId={resolvedParams.id} />
    </div>
  );
}
