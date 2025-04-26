'use client';

import { use } from "react";

interface DesafioProps {
  params: Promise<{
    id: string;
  }>;
}

export default function Desafio ({ params }: DesafioProps) {
  const resolvedParams = use(params); 

  return (
    <></>
  );
}
