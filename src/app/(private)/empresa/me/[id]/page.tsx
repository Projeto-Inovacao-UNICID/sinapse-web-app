'use client';

import { use } from "react";

interface CompanyProfileProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UserProfile ({ params }: CompanyProfileProps) {
  const resolvedParams = use(params); 
  const companyId = resolvedParams.id;

  return (
    <>
    </>
  );
}
