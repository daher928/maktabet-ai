import React, { useState, useEffect } from "react";
import { AITool } from "@/api/entities";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Star, Check, X, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

export default function ToolDetailPage() {
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTool = async () => {
      try {
        setLoading(true);
        const urlParams = new URLSearchParams(window.location.search);
        const toolId = urlParams.get('id');
        
        if (!toolId) {
          setError("لم يتم تحديد الأداة");
          return;
        }
        
        const fetchedTool = await AITool.get(toolId);
        if (!fetchedTool) {
          setError("لم يتم العثور على الأداة");
          return;
        }
        
        setTool(fetchedTool);
      } catch (err) {
        console.error("Error loading tool:", err);
        setError("حدث خطأ أثناء تحميل بيانات الأداة");
      } finally {
        setLoading(false);
      }
    };
    
    loadTool();
  }, []);

  // Helper function to format names (replace underscore with space)
  const formatName = (name) => {
    if (!name) return '';
    return name.replace ? name.replace(/_/g, ' ') : name;
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8 text-center">
          <p className="text-red-500 mb-4">{error || "لم يتم العثور على الأداة"}</p>
          <Link to={createPageUrl("AITools")}>
            <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-md text-white font-medium transition-colors">
              العودة إلى صفحة الأدوات
            </button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link to={createPageUrl("AITools")} className="inline-flex items-center text-primary mb-8 hover:text-primary-hover">
        <ArrowLeft className="ml-2 h-5 w-5 rtl-flip" />
        العودة إلى الأدوات
      </Link>
      
      {/* Tool Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{tool.name}</h1>
              
              <div className="flex flex-wrap gap-3 mb-4">
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
              
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ml-1 ${i < (tool.rating || 0) 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300"}`} 
                  />
                ))}
                <span className="text-lg font-medium ml-2">{tool.rating || 0}/5</span>
              </div>
              
              <p className="text-gray-600 mb-6 text-lg">
                {tool.description}
              </p>
              
              {tool.website_url && (
                <a 
                  href={tool.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-md text-white font-medium transition-colors inline-flex items-center"
                >
                  زيارة الموقع
                  <ExternalLink className="mr-2 h-4 w-4" />
                </a>
              )}
            </div>
            
            {tool.image_url && (
              <div className="min-w-[200px] md:w-1/3">
                <img 
                  src={tool.image_url} 
                  alt={tool.name} 
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Features and Details */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Features */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">الميزات الرئيسية</h2>
          
          {tool.features && tool.features.length > 0 ? (
            <ul className="space-y-3">
              {tool.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 ml-2 mt-1 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">لم يتم إضافة ميزات لهذه الأداة</p>
          )}
        </div>
        
        {/* Pricing */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">تفاصيل التسعير</h2>
          
          <div className="mb-4">
            <Badge className={pricingBadges[tool.pricing_type] || "bg-gray-100 text-gray-800"}>
              {formatName(tool.pricing_type || '')}
            </Badge>
          </div>
          
          {tool.pricing_details ? (
            <p className="text-gray-600">{tool.pricing_details}</p>
          ) : (
            <p className="text-gray-500">لم يتم إضافة تفاصيل التسعير</p>
          )}
        </div>
      </div>
      
      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Pros */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-green-600">المميزات</h2>
          
          {tool.pros && tool.pros.length > 0 ? (
            <ul className="space-y-3">
              {tool.pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 ml-2 mt-1 shrink-0" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">لم يتم إضافة مميزات لهذه الأداة</p>
          )}
        </div>
        
        {/* Cons */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-red-600">السلبيات</h2>
          
          {tool.cons && tool.cons.length > 0 ? (
            <ul className="space-y-3">
              {tool.cons.map((con, index) => (
                <li key={index} className="flex items-start">
                  <X className="h-5 w-5 text-red-500 ml-2 mt-1 shrink-0" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">لم يتم إضافة سلبيات لهذه الأداة</p>
          )}
        </div>
      </div>
    </div>
  );
}