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
    <CompanyProfileCard companyId={resolvedParams.id} />
  );
}
