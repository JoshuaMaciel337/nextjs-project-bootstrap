'use client';

import { cn } from '@/lib/utils';

interface MessageProps {
  content: string;
  role: 'user' | 'assistant';
}

export function Message({ content, role }: MessageProps) {
  return (
    <div className={cn(
      "flex w-full",
      role === 'user' ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-3xl px-4 py-3 rounded-lg",
        role === 'user' 
          ? "bg-black text-white" 
          : "bg-gray-100 text-black border border-gray-200"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
