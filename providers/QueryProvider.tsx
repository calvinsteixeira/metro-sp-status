'use client'

//COMPONENTS
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//UTILS
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function QueryProvider(props: Props) {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
}
