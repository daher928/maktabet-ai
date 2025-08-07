
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Input } from "@/components/ui/input";
import { Newsletter } from "@/api/entities";
import { AITool } from "@/api/entities";
import { Sparkles, Send, Search, Scale, ArrowUpRight, Star, Zap, FileText, Image, Mic, Video, BarChart, Globe, MessageSquare } from "lucide-react";
import FloatingElements from "../components/home/FloatingElements";
import NewsletterPopup from "../components/home/NewsletterPopup";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await Newsletter.create({ email });
      setSubscribeStatus("success");
      setEmail("");
    } catch (error) {
      setSubscribeStatus("error");
    }
  };

  return (
    <div>
      <NewsletterPopup />

      <section className="relative py-20 bg-gradient-custom text-white overflow-hidden">
        <FloatingElements />

        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80')",
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <span className="inline-block mb-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              أحدث تقنيات الذكاء الاصطناعي
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              مكتبة AI - اكتشف قوة الذكاء الاصطناعي
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-3xl mx-auto">
              مكتبة شاملة لأحدث أدوات الذكاء الاصطناعي لمساعدتك في تحقيق إنتاجية أفضل
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={createPageUrl("AITools")}>
                <button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md font-bold transition-colors inline-flex items-center">
                  <Sparkles className="ml-2 h-5 w-5" />
                  استكشف الأدوات
                </button>
              </Link>
              <Link to={createPageUrl("Compare")}>
                <button className="border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-bold transition-colors border inline-flex items-center">
                  <Scale className="ml-2 h-5 w-5" />
                  قارن بين الأدوات
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">كل ما تحتاجه في مكان واحد</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              استكشف مجموعة متنوعة من أدوات الذكاء الاصطناعي واختر الأنسب لتلبية احتياجاتك
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">بحث ذكي</h3>
              <p className="text-gray-600">
                اعثر على الأداة المناسبة بسرعة من خلال خيارات البحث والتصنيف المتقدمة
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">مقارنة متكاملة</h3>
              <p className="text-gray-600">
                قارن بين الأدوات جنبًا إلى جنب لاختيار الأداة الأنسب لاحتياجاتك
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">تحديثات مستمرة</h3>
              <p className="text-gray-600">
                ابق على اطلاع بأحدث الأدوات والتحديثات في عالم الذكاء الاصطناعي
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block mb-2 px-3 py-1 bg-purple-100 text-primary rounded-full text-sm font-medium">
              الأدوات
            </span>
            <h2 className="text-3xl font-bold mb-4">أدوات الذكاء الاصطناعي حسب الفئة</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              استكشف أفضل أدوات الذكاء الاصطناعي مصنفة حسب نوع الاستخدام
            </p>
          </div>

          <CategoryToolsSection
            title="أدوات النصوص"
            description="أدوات الذكاء الاصطناعي لإنشاء وتحسين المحتوى النصي"
            category="نص"
            bgColor="from-indigo-50 to-blue-50"
            iconColor="text-indigo-600"
            categoryPageUrl={createPageUrl("AITools") + "?category=نص"}
          />

          <CategoryToolsSection
            title="أدوات الصور"
            description="أدوات لإنشاء وتعديل الصور باستخدام الذكاء الاصطناعي"
            category="صور"
            bgColor="from-pink-50 to-rose-50"
            iconColor="text-pink-600"
            categoryPageUrl={createPageUrl("AITools") + "?category=صور"}
          />

          <CategoryToolsSection
            title="أدوات الصوت"
            description="أدوات للتعرف على الكلام وتوليد الأصوات الطبيعية"
            category="صوت"
            bgColor="from-green-50 to-emerald-50"
            iconColor="text-green-600"
            categoryPageUrl={createPageUrl("AITools") + "?category=صوت"}
          />

          <CategoryToolsSection
            title="أدوات الفيديو"
            description="أدوات لإنشاء وتعديل الفيديوهات باستخدام الذكاء الاصطناعي"
            category="فيديو"
            bgColor="from-purple-50 to-violet-50"
            iconColor="text-purple-600"
            categoryPageUrl={createPageUrl("AITools") + "?category=فيديو"}
          />

          <div className="text-center mt-16">
            <Link to={createPageUrl("AITools")}>
              <button className="bg-primary hover:bg-primary-hover px-6 py-3 rounded-md text-white font-medium transition-colors">
                استكشف جميع الأدوات
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 relative bg-gradient-to-br from-purple-100 to-purple-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ac6061_AI1.png"
              alt="مكتبة AI"
              className="h-12 w-12 rounded-full"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">ابق على اطلاع</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            اشترك في نشرتنا البريدية للحصول على آخر الأخبار والتحديثات حول أدوات الذكاء الاصطناعي
          </p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex gap-4 mb-4">
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white border-transparent shadow-sm"
              />
              <button type="submit" className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-md text-white font-medium transition-colors inline-flex items-center">
                <Send className="ml-2 h-4 w-4 rtl-flip" />
                اشترك
              </button>
            </div>
          </form>
          {subscribeStatus === "success" && (
            <p className="text-green-600 font-medium">تم الاشتراك بنجاح!</p>
          )}
          {subscribeStatus === "error" && (
            <p className="text-red-600 font-medium">حدث خطأ. الرجاء المحاولة مرة أخرى.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function CategoryToolsSection({ title, description, category, bgColor, iconColor, categoryPageUrl }) {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryTools = async () => {
      try {
        const allTools = await AITool.filter({ category: category }, "-rating", 3);
        setTools(allTools);
        setLoading(false);
      } catch (error) {
        console.error(`Error loading ${category} tools:`, error);
        setLoading(false);
      }
    };

    loadCategoryTools();
  }, [category]);

  const getCategoryIcon = () => {
    switch (category) {
      case 'نص':
        return <FileText className={`h-6 w-6 ${iconColor}`} />;
      case 'صور':
        return <Image className={`h-6 w-6 ${iconColor}`} />;
      case 'صوت':
        return <Mic className={`h-6 w-6 ${iconColor}`} />;
      case 'فيديو':
        return <Video className={`h-6 w-6 ${iconColor}`} />;
      default:
        return <Sparkles className={`h-6 w-6 ${iconColor}`} />;
    }
  };

  return (
    <div className={`rounded-2xl p-8 mb-12 bg-gradient-to-br ${bgColor}`}>
      <div className="flex items-center mb-6">
        <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3`}>
          {getCategoryIcon()}
        </div>
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : tools.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map(tool => (
            <div key={tool.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold">{tool.name}</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < tool.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{tool.description}</p>
              <Link to={createPageUrl("ToolDetail") + `?id=${tool.id}`} className="text-primary hover:text-primary-hover flex items-center gap-1 font-medium">
                تعرف على المزيد
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <p className="text-gray-500">لم يتم العثور على أدوات في هذه الفئة</p>
        </div>
      )}

      <div className="text-center mt-6">
        <Link to={categoryPageUrl}>
          <button className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-md font-medium transition-colors">
            مشاهدة المزيد من {title}
          </button>
        </Link>
      </div>
    </div>
  );
}
