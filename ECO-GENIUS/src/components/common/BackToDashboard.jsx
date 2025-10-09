// src/components/common/BackToDashboard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // 按你项目的 Button 路径
import { ArrowLeft } from 'lucide-react';

export default function BackToDashboard({ to = '/dashboard', onClick, className = '', children }) {
  const navigate = useNavigate();

  
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    
    navigate(to);
  };

  return (
    <Button
      onClick={handleClick}
      className={`flex items-center space-x-2 bg-white hover:bg-gray-100 text-emerald-600 hover:text-emerald-700 mb-8 transition-colors group ${className}`}
      aria-label="Back to Dashboard"
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="font-medium">{children ?? 'Back to Dashboard'}</span>
    </Button>
  );
}