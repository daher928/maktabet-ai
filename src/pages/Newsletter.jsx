import React from "react";
import { Newsletter } from "@/api/entities";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Send, Check } from "lucide-react";

export default function NewsletterPage() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Newsletter.create({ email });
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bell className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">النشرة البريدية</h1>
          <p className="text-gray-600">
            اشترك في نشرتنا البريدية للحصول على آخر الأخبار والتحديثات حول أدوات الذكاء الاصطناعي
          </p>
        </div>

        {/* Subscription Form */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover px-4 py-2 rounded-md text-white font-medium transition-colors inline-flex items-center justify-center"
                disabled={status === "success"}
              >
                {status === "success" ? (
                  <>
                    <Check className="ml-2 h-4 w-4" />
                    تم الاشتراك بنجاح
                  </>
                ) : (
                  <>
                    <Send className="ml-2 h-4 w-4 rtl-flip" />
                    اشترك الآن
                  </>
                )}
              </button>
              {status === "error" && (
                <p className="text-red-600 text-sm text-center">
                  حدث خطأ. الرجاء المحاولة مرة أخرى.
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">تحديثات فورية</h3>
            <p className="text-gray-600">كن أول من يعلم عن أحدث الأدوات والتقنيات</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">محتوى حصري</h3>
            <p className="text-gray-600">نصائح وإرشادات حصرية للمشتركين</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">مجتمع متخصص</h3>
            <p className="text-gray-600">انضم إلى مجتمع المهتمين بالذكاء الاصطناعي</p>
          </div>
        </div>
      </div>
    </div>
  );
}