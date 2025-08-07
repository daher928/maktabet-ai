import React, { useState, useEffect } from "react";
import { AITool } from "@/api/entities";
import { Card } from "@/components/ui/card";
import { ArrowRight, Scale, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ToolComparisonTable from "../components/tools/ToolComparisonTable";
import ToolCard from "../components/tools/ToolCard";

export default function ComparePage() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTools = async () => {
      try {
        setLoading(true);
        const urlParams = new URLSearchParams(window.location.search);
        const toolIds = urlParams.get('ids')?.split(',');
        
        if (!toolIds || toolIds.length === 0) {
          setTools([]);
          return;
        }
        
        const promises = toolIds.map(id => AITool.get(id));
        const fetchedTools = await Promise.all(promises);
        setTools(fetchedTools.filter(Boolean));
      } catch (err) {
        console.error("Error loading tools for comparison:", err);
        setError("حدث خطأ أثناء تحميل الأدوات للمقارنة");
      } finally {
        setLoading(false);
      }
    };
    
    loadTools();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <Link to={createPageUrl("AITools")} className="inline-flex items-center text-primary mb-6 hover:text-primary-hover">
          <ArrowLeft className="ml-2 h-5 w-5 rtl-flip" />
          العودة إلى الأدوات
        </Link>
        <span className="inline-block mb-4 px-3 py-1 bg-purple-100 text-primary rounded-full text-sm font-medium">
          مقارنة الأدوات
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">مقارنة أدوات الذكاء الاصطناعي</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          قارن بين أدوات الذكاء الاصطناعي لاختيار الأنسب لاحتياجاتك
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <Card className="p-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link to={createPageUrl("AITools")}>
            <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-md text-white font-medium transition-colors">
              العودة إلى صفحة الأدوات
            </button>
          </Link>
        </Card>
      ) : tools.length === 0 ? (
        <Card className="p-8 text-center glass-effect">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-4">لم يتم اختيار أدوات للمقارنة</h3>
          <p className="text-gray-500 mb-6">
            يرجى اختيار الأدوات التي ترغب في مقارنتها من صفحة الأدوات
          </p>
          <Link to={createPageUrl("AITools")}>
            <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-md text-white font-medium transition-colors inline-flex items-center">
              <ArrowRight className="ml-2 h-5 w-5 rtl-flip" />
              اختيار أدوات للمقارنة
            </button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-10">
          {/* Tools Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          
          {/* Comparison Table */}
          <div className="bg-white rounded-xl shadow-sm p-6 overflow-x-auto">
            <h2 className="text-xl font-bold mb-6">جدول المقارنة</h2>
            <ToolComparisonTable tools={tools} />
          </div>
          
          <div className="text-center">
            <Link to={createPageUrl("AITools")}>
              <button className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50 transition-colors inline-flex items-center">
                <ArrowLeft className="ml-2 h-5 w-5 rtl-flip" />
                العودة إلى صفحة الأدوات
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}