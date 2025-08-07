import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, Check, X } from "lucide-react";

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

export default function ToolComparisonTable({ tools }) {
  // Find all unique features across all tools
  const allFeatures = [];
  tools.forEach(tool => {
    if (tool.features && Array.isArray(tool.features)) {
      tool.features.forEach(feature => {
        if (!allFeatures.includes(feature)) {
          allFeatures.push(feature);
        }
      });
    }
  });

  // Helper function to format names (replace underscore with space)
  const formatName = (name) => {
    if (!name) return '';
    return name.replace ? name.replace(/_/g, ' ') : name;
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-bold">المقارنة</TableHead>
            {tools.map(tool => (
              <TableHead key={tool.id} className="text-center font-bold">{tool.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Category Row */}
          <TableRow>
            <TableCell className="font-medium bg-gray-50">الفئة</TableCell>
            {tools.map(tool => (
              <TableCell key={tool.id} className="text-center">
                {tool.category && (
                  <Badge className={categoryColors[tool.category] || "bg-gray-100 text-gray-800"}>
                    {formatName(tool.category)}
                  </Badge>
                )}
              </TableCell>
            ))}
          </TableRow>

          {/* Rating Row */}
          <TableRow>
            <TableCell className="font-medium bg-gray-50">التقييم</TableCell>
            {tools.map(tool => (
              <TableCell key={tool.id} className="text-center">
                <div className="flex items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < (tool.rating || 0) 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"}`} 
                    />
                  ))}
                </div>
                <div className="text-sm font-medium mt-1">{tool.rating || 0}/5</div>
              </TableCell>
            ))}
          </TableRow>

          {/* Pricing Type Row */}
          <TableRow>
            <TableCell className="font-medium bg-gray-50">نوع التسعير</TableCell>
            {tools.map(tool => (
              <TableCell key={tool.id} className="text-center">
                {tool.pricing_type ? (
                  <Badge className={pricingBadges[tool.pricing_type] || "bg-gray-100 text-gray-800"}>
                    {formatName(tool.pricing_type)}
                  </Badge>
                ) : (
                  "غير محدد"
                )}
              </TableCell>
            ))}
          </TableRow>

          {/* Features Rows */}
          {allFeatures.map((feature, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium bg-gray-50">{feature}</TableCell>
              {tools.map(tool => (
                <TableCell key={tool.id} className="text-center">
                  {tool.features && tool.features.includes(feature) ? (
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-red-500" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}

          {/* Pros Count Row */}
          <TableRow>
            <TableCell className="font-medium bg-gray-50">عدد المميزات</TableCell>
            {tools.map(tool => (
              <TableCell key={tool.id} className="text-center font-medium">
                {tool.pros && Array.isArray(tool.pros) ? tool.pros.length : 0}
              </TableCell>
            ))}
          </TableRow>

          {/* Cons Count Row */}
          <TableRow>
            <TableCell className="font-medium bg-gray-50">عدد السلبيات</TableCell>
            {tools.map(tool => (
              <TableCell key={tool.id} className="text-center font-medium">
                {tool.cons && Array.isArray(tool.cons) ? tool.cons.length : 0}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}