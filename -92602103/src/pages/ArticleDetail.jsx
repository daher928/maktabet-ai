import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Article } from "@/api/entities";
import { Card } from "@/components/ui/card";
import { Calendar, User, Tag, ArrowLeft, Share2, Heart } from "lucide-react";

export default function ArticleDetailPage() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        
        if (!articleId) {
          setError("لم يتم تحديد المقال");
          return;
        }
        
        const fetchedArticle = await Article.get(articleId);
        if (!fetchedArticle) {
          setError("لم يتم العثور على المقال");
          return;
        }
        
        setArticle(fetchedArticle);
        setLikeCount(fetchedArticle.likes || 0);
        
        // Check if user already liked this article
        const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
        setLiked(likedArticles.includes(articleId));
        
        // Set page title
        document.title = `${fetchedArticle.title} - مكتبة AI`;
      } catch (err) {
        console.error("Error loading article:", err);
        setError("حدث خطأ أثناء تحميل بيانات المقال");
      } finally {
        setLoading(false);
      }
    };
    
    loadArticle();
    
    // Reset title when leaving the page
    return () => {
      document.title = "مكتبة AI - أدوات الذكاء الاصطناعي";
    };
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("تم نسخ الرابط إلى الحافظة");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleLike = async () => {
    if (!article) return;
    
    try {
      // Get liked articles from localStorage
      const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
      
      if (liked) {
        // Unlike: remove from localStorage and decrement count
        const newLikedArticles = likedArticles.filter(id => id !== article.id);
        localStorage.setItem('likedArticles', JSON.stringify(newLikedArticles));
        
        // Update count in database
        const newLikeCount = Math.max(0, (article.likes || 0) - 1);
        await Article.update(article.id, { likes: newLikeCount });
        
        setLiked(false);
        setLikeCount(newLikeCount);
      } else {
        // Like: add to localStorage and increment count
        likedArticles.push(article.id);
        localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
        
        // Update count in database
        const newLikeCount = (article.likes || 0) + 1;
        await Article.update(article.id, { likes: newLikeCount });
        
        setLiked(true);
        setLikeCount(newLikeCount);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8 text-center">
          <p className="text-red-500 mb-4">{error || "لم يتم العثور على المقال"}</p>
          <Link to={createPageUrl("Articles")}>
            <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-md text-white font-medium transition-colors">
              العودة إلى المقالات
            </button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link to={createPageUrl("Articles")} className="inline-flex items-center text-primary mb-8 hover:text-primary-hover">
        <ArrowLeft className="ml-2 h-5 w-5 rtl-flip" />
        العودة إلى المقالات
      </Link>
      
      <article className="bg-white rounded-xl shadow-sm overflow-hidden">
        {article.image_url && (
          <div className="relative">
            <img 
              src={article.image_url} 
              alt={article.title} 
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
          </div>
        )}
        
        <div className="p-8">
          {/* Article Header */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-purple-100 text-primary rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex flex-wrap gap-6 text-gray-500 mb-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 ml-2" />
                {formatDate(article.date)}
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 ml-2" />
                {article.author}
              </div>
            </div>
            
            <p className="text-xl text-gray-600 font-medium">{article.summary}</p>
          </div>
          
          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
          
          {/* Article Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Tag className="h-5 w-5 ml-2" />
                {article.tags?.map((tag, index) => (
                  <span key={index} className="ml-2 text-gray-500">#{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleLike} 
                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                    liked 
                      ? 'bg-red-50 text-red-500' 
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${liked ? 'fill-red-500' : ''}`} />
                  <span>{likeCount}</span>
                </button>
                <button 
                  onClick={handleShare} 
                  className="flex items-center text-primary hover:text-primary-hover"
                >
                  <Share2 className="h-5 w-5 ml-2" />
                  مشاركة
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}