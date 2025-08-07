import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { Newsletter } from "@/api/entities";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FloatingElements from './FloatingElements';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Check if the popup has been shown in this session or before
    const hasSeenPopup = sessionStorage.getItem('newsletterPopupSeen') || localStorage.getItem('newsletterPopupSeen');
    
    if (!hasSeenPopup) {
      // Show popup after 3 seconds delay
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Mark as seen for this session
        sessionStorage.setItem('newsletterPopupSeen', 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setStatus('loading');
      await Newsletter.create({ email });
      setStatus('success');
      
      // Close popup after success and mark as seen permanently
      setTimeout(() => {
        setIsOpen(false);
        localStorage.setItem('newsletterPopupSeen', 'true');
      }, 2000);
      
    } catch (error) {
      setStatus('error');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Mark as seen for this session only
    sessionStorage.setItem('newsletterPopupSeen', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-6 max-w-md w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleClose}
          className="absolute top-3 left-3 text-gray-300 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </Button>
        
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <FloatingElements />
        </div>
        
        {/* Star-like accents */}
        <div className="absolute top-4 right-4 pointer-events-none">
          <Sparkles className="h-5 w-5 text-yellow-300" />
        </div>
        <div className="absolute bottom-4 right-8 pointer-events-none">
          <Sparkles className="h-4 w-4 text-purple-300" />
        </div>
        
        {/* Logo and content */}
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-5">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ac6061_AI1.png"
              alt="مكتبة AI"
              className="h-16 w-16 rounded-full"
            />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">اكتشف ثورة الذكاء الاصطناعي!</h2>
          <p className="text-gray-200 mb-6">
            انضم إلى ثورة الذكاء الاصطناعي واشترك بالنشرة الاسبوعية عن اخبار وأحداث الـai، تحديثات حصرية وأحدث الأدوات والتقنيات
          </p>
          
          {status === 'success' ? (
            <div className="text-center py-4">
              <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-2" />
              <p className="text-green-300 font-bold text-lg">تم الاشتراك بنجاح!</p>
              <p className="text-gray-200 text-sm">شكراً لانضمامك إلى مجتمعنا</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex gap-2 mb-2">
                <Input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 text-white placeholder:text-gray-300 border-none"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 
                    px-4 py-2 rounded-md text-white font-medium transition-colors 
                    flex items-center justify-center min-w-[100px] ${status === 'loading' ? 'opacity-70' : ''}`}
                >
                  {status === 'loading' ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="ml-2 h-4 w-4 rtl-flip" />
                      اشترك
                    </>
                  )}
                </button>
              </div>
              {status === 'error' && (
                <p className="text-red-300 text-sm">حدث خطأ. الرجاء المحاولة مرة أخرى.</p>
              )}
            </form>
          )}
          
          <div className="border-t border-white/10 pt-4 mt-2 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-gray-300 text-sm mr-2">تحديثات حصرية</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300 text-sm mr-2">إلغاء الاشتراك في أي وقت</span>
            </div>
          </div>
          
          <div className="mt-4 animate-pulse">
            <span className="text-yellow-300 text-sm">⚡️Maktabet AI مكتبة ⚡️</span>
          </div>
        </div>
      </div>
    </div>
  );
}