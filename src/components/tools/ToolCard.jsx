import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, Check, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const categoryColors = {
  'نص': 'bg-blue-100 text-blue-800',
  'صور': 'bg-pink-100 text-pink-800',
  'صوت': 'bg-green-100 text-green-800',
  'فيديو': 'bg-purple-100 text-purple-800',
  'تحليل_بيانات': 'bg-yellow-100 text-yellow-800',
  'ترجمة': 'bg-indigo-100 text-indigo-800',
  'روبوت_محادثة': 'bg-orange-100 text-orange-800',
  'أخرى': 'bg-gray-100 text-gray-800'
};

const pricingBadges = {
  'مجاني': 'bg-green-100 text-green-800',
  'مدفوع': 'bg-blue-100 text-blue-800',
  'تجربة_مجانية': 'bg-purple-100 text-purple-800'
};

export default function ToolCard({ tool, isSelectable = false, isSelected = false, onToggleSelect = null }) {
  if (!tool) {
    return null;
  }

  const handleToggleSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleSelect) {
      onToggleSelect(tool);
    }
  };

  // Safely format category and pricing names
  const formatName = (name) => {
    if (!name) return '';
    return name.replace ? name.replace(/_/g, ' ') : name;
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold">{tool.name}</h3>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 mr-1 ${i < (tool.rating || 0) 
                    ? "text-yellow-400 fill-yellow-400" 
                    : "text-gray-300"}`} 
                />
              ))}
              <span className="text-sm text-gray-500 mr-1">{tool.rating || 0}/5</span>
            </div>
          </div>
          
          {isSelectable && (
            <button 
              onClick={handleToggleSelect}
              className={`flex items-center justify-center w-6 h-6 rounded-full ${
                isSelected 
                  ? "bg-primary border-primary text-white" 
                  : "border border-gray-300 text-transparent hover:border-primary"
              }`}
            >
              {isSelected && <Check className="w-4 h-4" />}
            </button>
          )}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {tool.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.category && (
            <Badge variant="secondary" className={categoryColors[tool.category] || "bg-gray-100 text-gray-800"}>
              {formatName(tool.category)}
            </Badge>
          )}
          
          {tool.pricing_type && (
            <Badge variant="secondary" className={pricingBadges[tool.pricing_type] || "bg-gray-100 text-gray-800"}>
              {formatName(tool.pricing_type)}
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <Link 
            to={createPageUrl("ToolDetail") + `?id=${tool.id}`}
            className="text-primary hover:text-primary-hover flex items-center gap-1 font-medium"
          >
            تفاصيل الأداة
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          
          {tool.website_url && (
            <a 
              href={tool.website_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              زيارة الموقع
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}