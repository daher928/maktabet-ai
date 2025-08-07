import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Calendar, User, Tag, Search, ArrowRight, Heart } from "lucide-react";
import { Article } from "@/api/entities";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedArticles, setLikedArticles] = useState([]);

  useEffect(() => {
    loadArticles();
    // Load liked articles from localStorage
    const liked = JSON.parse(localStorage.getItem('likedArticles') || '[]');
    setLikedArticles(liked);
  }, []);

  const loadArticles = async () => {
    try {
      const fetchedArticles = await Article.list();
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = searchTerm === "" || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get all unique categories
  const categories = ["all", ...new Set(articles.map(article => article.category))];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  const isLiked = (articleId) => {
    return likedArticles.includes(articleId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <span className="inline-block mb-2 px-3 py-1 bg-purple-100 text-primary rounded-full text-sm font-medium">
          المدونة
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">مقالات عن الذكاء الاصطناعي</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          اكتشف آخر المقالات والأخبار حول تقنيات الذكاء الاصطناعي وتطبيقاتها
        </p>
      </div>

      {/* Search and Filters */}
      <div className="glass-effect rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="ابحث عن مقالات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 bg-transparent"
            />
          </div>
          <div className="flex-shrink-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "جميع الفئات" : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
              {article.image_url && (
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${article.image_url})` }}
                ></div>
              )}
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Tag className="h-4 w-4 ml-1" />
                  {article.category}
                </div>
                <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 ml-1" />
                    {formatDate(article.date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 ml-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Heart className={`h-4 w-4 ml-1 ${isLiked(article.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      {article.likes || 0}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to={createPageUrl("ArticleDetail") + `?id=${article.id}`}>
                    <Button variant="ghost" className="text-primary hover:text-primary-hover">
                      قراءة المزيد
                      <ArrowRight className="mr-2 h-4 w-4 rtl-flip" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white p-16 rounded-xl text-center shadow-sm">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">لم يتم العثور على مقالات</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedCategory !== "all"
              ? "لا توجد مقالات تطابق معايير البحث"
              : "سيتم إضافة مقالات قريبًا"}
          </p>
          {(searchTerm || selectedCategory !== "all") && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              إعادة ضبط البحث
            </Button>
          )}
        </div>
      )}
    </div>
  );
}