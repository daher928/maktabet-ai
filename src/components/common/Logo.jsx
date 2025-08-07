import React from 'react';

export default function Logo({ size = "medium", color = "white" }) {
  // Size variants
  const sizeClasses = {
    small: "h-8 w-8",
    medium: "h-10 w-10",
    large: "h-14 w-14"
  };
  
  // Text size based on logo size
  const textSizes = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-2xl"
  };
  
  // Text colors
  const textColors = {
    white: "text-white",
    purple: "text-purple-700",
    dark: "text-gray-900"
  };
  
  return (
    <div className="flex items-center">
      <img 
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ac6061_AI1.png" 
        alt="مكتبة AI" 
        className={`${sizeClasses[size]} ml-2 rounded-full`} 
      />
      <span className={`${textSizes[size]} font-bold ${textColors[color]}`}>مكتبة AI</span>
    </div>
  );
}