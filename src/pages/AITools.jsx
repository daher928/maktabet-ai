import React, { useState, useEffect } from "react";
import { AITool } from "@/api/entities";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Sparkles, ArrowLeft, FileText, Image, Mic, Video, BarChart, Globe, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ToolCard from "../components/tools/ToolCard";

export default function AIToolsPage() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [selectedTools, setSelectedTools] = useState([]);
  const [activeView, setActiveView] = useState("all");
  const [categoryTools, setCategoryTools] = useState({});

  useEffect(() => {
    // Check if there's a category in URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setActiveView("filtered");
    }
    
    loadTools();
  }, []);

  const loadTools = async () => {
    const fetchedTools = await AITool.list();
    setTools(fetchedTools);
    
    // Group tools by category
    const categories = {};
    const uniqueCategories = Array.from(new Set(fetchedTools.map(tool => tool.category)));
    
    for (const category of uniqueCategories) {
      if (category) {
        const categoryToolsList = fetchedTools.filter(tool => tool.category === category);
        categories[category] = categoryToolsList;
      }
    }
    
    setCategoryTools(categories);
    setLoading(false);
  };

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = searchTerm === "" || 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    const matchesPricing = selectedPricing === "all" || tool.pricing_type === selectedPricing;
    return matchesSearch && matchesCategory && matchesPricing;
  });

  const toggleSelectTool = (tool) => {
    setSelectedTools(prev => {
      const isSelected = prev.some(t => t.id === tool.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tool.id);
      } else {
        if (prev.length < 3) {
          return [...prev, tool];
        }
        return prev;
      }
    });
  };

  const isToolSelected = (toolId) => {
    return selectedTools.some(tool => tool.id === toolId);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'نص':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'صور':
        return <Image className="h-5 w-5 text-pink-600" />;
      case 'صوت':
        return <Mic className="h-5 w-5 text-green-600" />;
      case 'فيديو':
        return <Video className="h-5 w-5 text-purple-600" />;
      case 'تحليل_بيانات':
        return <BarChart className="h-5 w-5 text-yellow-600" />;
      case 'ترجمة':
        return <Globe className="h-5 w-5 text-indigo-600" />;
      case 'روبوت_محادثة':
        return <MessageSquare className="h-5 w-5 text-orange-600" />;
      default:
        return <Sparkles className="h-5 w-5 text-gray-600" />;
    }
  };

  // Format category name (replace underscores with spaces)
  const formatCategoryName = (name) => {
    if (!name) return '';
    return name.replace ? name.replace(/_/g, ' ') : name;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block mb-4 px-3 py-1 bg-purple-100 text-primary rounded-full text-sm font-medium">
          مكتبة الأدوات
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">مكتبة أدوات الذكاء الاصطناعي</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          استكشف مجموعة واسعة من أدوات الذكاء الاصطناعي المصممة لتلبية احتياجاتك المختلفة
        </p>
      </div>

      {/* Comparison Tools Bar */}
      {selectedTools.length > 0 && (
        <div className="bg-purple-50 rounded-xl p-6 mb-8 border border-purple-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary ml-2" />
              <span className="font-medium">تم اختيار {selectedTools.length} أدوات للمقارنة</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedTools([])}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
              <Link to={createPageUrl("Compare") + 
                `?ids=${selectedTools.map(t => t.id).join(',')}`}>
                <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-md text-white font-medium transition-colors">
                  مقارنة الأدوات
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="glass-effect rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="ابحث عن أداة..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value !== "") {
                  setActiveView("filtered");
                } else if (selectedCategory === "all" && selectedPricing === "all") {
                  setActiveView("all");
                }
              }}
              className="pr-10 bg-transparent"
            />
          </div>
          <div className="flex gap-4 flex-wrap">
            <Select 
              value={selectedCategory} 
              onValueChange={(value) => {
                setSelectedCategory(value);
                if (value !== "all" || selectedPricing !== "all" || searchTerm !== "") {
                  setActiveView("filtered");
                } else {
                  setActiveView("all");
                }
              }}
            >
              <SelectTrigger className="w-40 bg-transparent">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="نص">نص</SelectItem>
                <SelectItem value="صور">صور</SelectItem>
                <SelectItem value="صوت">صوت</SelectItem>
                <SelectItem value="فيديو">فيديو</SelectItem>
                <SelectItem value="تحليل_بيانات">تحليل بيانات</SelectItem>
                <SelectItem value="ترجمة">ترجمة</SelectItem>
                <SelectItem value="روبوت_محادثة">روبوت محادثة</SelectItem>
                <SelectItem value="أخرى">أخرى</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={selectedPricing}
              onValueChange={(value) => {
                setSelectedPricing(value);
                if (value !== "all" || selectedCategory !== "all" || searchTerm !== "") {
                  setActiveView("filtered");
                } else {
                  setActiveView("all");
                }
              }}
            >
              <SelectTrigger className="w-40 bg-transparent">
                <SelectValue placeholder="السعر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأسعار</SelectItem>
                <SelectItem value="مجاني">مجاني</SelectItem>
                <SelectItem value="مدفوع">مدفوع</SelectItem>
                <SelectItem value="تجربة_مجانية">تجربة مجانية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reset filters button - shown when filters are active */}
        {(selectedCategory !== "all" || selectedPricing !== "all" || searchTerm !== "") && (
          <div className="mt-4 text-center">
            <button 
              className="text-primary hover:text-primary-hover text-sm font-medium"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedPricing("all");
                setActiveView("all");
              }}
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </div>

      {/* Show either category sections or filtered results */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
              <div className="h-2 bg-purple-200 rounded w-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : activeView === "all" ? (
        // Category sections view
        <div className="space-y-12">
          {Object.keys(categoryTools).map(category => (
            <div key={category} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center ml-3">
                  {getCategoryIcon(category)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{formatCategoryName(category)}</h2>
                  <p className="text-gray-600">أفضل أدوات الذكاء الاصطناعي في فئة {formatCategoryName(category)}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {categoryTools[category].slice(0, 3).map(tool => (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    isSelectable={true}
                    isSelected={isToolSelected(tool.id)}
                    onToggleSelect={toggleSelectTool}
                  />
                ))}
              </div>
              
              {categoryTools[category].length > 3 && (
                <div className="text-center">
                  <Link to={createPageUrl("AITools") + `?category=${category}`}>
                    <button className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-md font-medium transition-colors">
                      مشاهدة جميع أدوات {formatCategoryName(category)}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Filtered results view
        <>
          {/* Back button if category filter is applied */}
          {selectedCategory !== "all" && searchTerm === "" && selectedPricing === "all" && (
            <div className="mb-6">
              <button 
                onClick={() => {
                  setSelectedCategory("all");
                  setActiveView("all");
                }}
                className="inline-flex items-center text-primary hover:text-primary-hover"
              >
                <ArrowLeft className="ml-2 h-5 w-5 rtl-flip" />
                العودة إلى جميع الفئات
              </button>
              <h2 className="text-2xl font-bold mt-4 mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center ml-2">
                  {getCategoryIcon(selectedCategory)}
                </div>
                أدوات {formatCategoryName(selectedCategory)}
              </h2>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                isSelectable={true}
                isSelected={isToolSelected(tool.id)}
                onToggleSelect={toggleSelectTool}
              />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="bg-white p-16 rounded-xl text-center shadow-sm">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">لم يتم العثور على نتائج</h3>
              <p className="text-gray-500 mb-6">جرّب تعديل معايير البحث للحصول على نتائج أفضل</p>
              <button 
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedPricing("all");
                  setActiveView("all");
                }}
              >
                إعادة ضبط البحث
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}