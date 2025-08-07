

import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Home, Grid, Layers, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../components/common/Logo";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap');
        
        :root {
          --font-family: 'Cairo', sans-serif;
          --primary-color: #8b5cf6;
          --primary-hover: #7c3aed;
          --secondary-color: #1e1b4b;
          --background-light: #f8fafc;
          --background-card: #ffffff;
          --text-primary: #1e1b4b;
          --text-secondary: #64748b;
          --border-color: #e2e8f0;
          --accent-color: #10b981;
          --footer-text: #1e1b4b;
        }
        
        * {
          font-family: var(--font-family);
        }
        
        body {
          font-family: var(--font-family);
          color: var(--text-primary);
          background-color: var(--background-light);
          font-weight: 400;
          line-height: 1.6;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-family);
          font-weight: 700;
        }

        .font-bold {
          font-weight: 700;
        }

        .font-semibold {
          font-weight: 600;
        }

        .font-medium {
          font-weight: 500;
        }

        .bg-primary {
          background-color: var(--primary-color) !important;
        }

        .text-primary {
          color: var(--primary-color) !important;
        }

        .border-primary {
          border-color: var(--primary-color) !important;
        }

        .bg-primary-hover:hover {
          background-color: var(--primary-hover) !important;
        }

        .text-primary-hover:hover {
          color: var(--primary-hover) !important;
        }

        .bg-gradient-custom {
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
        }

        /* Custom styles for RTL support */
        .rtl-flip {
          transform: scaleX(-1);
        }

        /* Glass effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .dark-header {
          background-color: var(--secondary-color);
          color: white;
        }

        /* Override button text color */
        .btn-custom {
          color: white !important;
        }

        /* Custom footer text color */
        .footer-text {
          color: var(--footer-text);
        }

        /* Mobile menu */
        .mobile-menu-backdrop {
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
        }
        
        .mobile-menu {
          background-color: #1a103f;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        .mobile-menu-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          margin-bottom: 8px;
          border-radius: 8px;
          color: #ffffff;
          font-size: 1.125rem;
          font-weight: 600;
          transition: all 0.2s;
          background-color: rgba(255, 255, 255, 0.05);
        }
        
        .mobile-menu-item:hover,
        .mobile-menu-item:focus {
          background-color: rgba(139, 92, 246, 0.2);
        }
        
        .mobile-menu-icon {
          margin-left: 12px;
          color: #c4b5fd;
        }

        /* Better text rendering for Arabic */
        .text-smooth {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        /* Improve Arabic text spacing */
        p, div, span {
          letter-spacing: 0.01em;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-10 dark-header shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <Link to={createPageUrl("Home")}>
                <Logo size="medium" color="white" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to={createPageUrl("Home")}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                الرئيسية
              </Link>
              <Link
                to={createPageUrl("AITools")}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                الأدوات
              </Link>
              <Link
                to={createPageUrl("Compare")}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                المقارنة
              </Link>
              <Link
                to={createPageUrl("Articles")}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                المقالات
              </Link>
              <Link
                to={createPageUrl("Newsletter")}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                النشرة
              </Link>
              <a href={createPageUrl("AITools")} className="inline-block">
                <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-md text-white font-medium transition-colors">
                  اكتشف الأدوات
                </button>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 mobile-menu-backdrop z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-72 mobile-menu z-50 p-6">
            <div className="flex justify-between items-center mb-8">
              <Logo size="medium" color="white" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="mb-6 py-2 border-b border-white/10"></div>
            
            <nav className="flex flex-col gap-3 mb-8">
              <Link
                to={createPageUrl("Home")}
                className="mobile-menu-item"
                onClick={() => setSidebarOpen(false)}
              >
                <Home className="mobile-menu-icon h-5 w-5" />
                الرئيسية
              </Link>
              <Link
                to={createPageUrl("AITools")}
                className="mobile-menu-item"
                onClick={() => setSidebarOpen(false)}
              >
                <Grid className="mobile-menu-icon h-5 w-5" />
                الأدوات
              </Link>
              <Link
                to={createPageUrl("Compare")}
                className="mobile-menu-item"
                onClick={() => setSidebarOpen(false)}
              >
                <Layers className="mobile-menu-icon h-5 w-5" />
                المقارنة
              </Link>
              <Link
                to={createPageUrl("Articles")}
                className="mobile-menu-item"
                onClick={() => setSidebarOpen(false)}
              >
                <FileText className="mobile-menu-icon h-5 w-5" />
                المقالات
              </Link>
              <Link
                to={createPageUrl("Newsletter")}
                className="mobile-menu-item"
                onClick={() => setSidebarOpen(false)}
              >
                <Mail className="mobile-menu-icon h-5 w-5" />
                النشرة البريدية
              </Link>
            </nav>
            
            <div className="mt-auto pt-6 border-t border-white/10">
              <Link
                to={createPageUrl("AITools")}
                onClick={() => setSidebarOpen(false)}
              >
                <button className="w-full bg-primary hover:bg-primary-hover px-4 py-3 rounded-md text-white font-bold transition-colors">
                  اكتشف الأدوات الآن
                </button>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-secondary-color text-gray-600 border-t mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <Logo size="small" color="purple" />
              </div>
              <p className="footer-text text-sm">
                منصة شاملة لاستكشاف ومقارنة أدوات الذكاء الاصطناعي
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-600">روابط سريعة</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={createPageUrl("Home")} className="footer-text hover:text-gray-600 transition-colors">
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("AITools")} className="footer-text hover:text-gray-600 transition-colors">
                    الأدوات
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("Compare")} className="footer-text hover:text-gray-600 transition-colors">
                    المقارنة
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("Articles")} className="footer-text hover:text-gray-600 transition-colors">
                    المقالات
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("Newsletter")} className="footer-text hover:text-gray-600 transition-colors">
                    النشرة البريدية
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-600">تواصل معنا</h3>
              <p className="footer-text text-sm mb-2">
                اشترك في نشرتنا البريدية للبقاء على اطلاع بأحدث الأدوات والتحديثات
              </p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="بريدك الإلكتروني" 
                  className="px-3 py-2 bg-secondary-color bg-opacity-50 text-gray-600 rounded-lg flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="submit" className="bg-primary hover:bg-primary-hover px-3 py-2 rounded-lg text-white text-sm">
                  اشترك
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center footer-text text-sm">
            © {new Date().getFullYear()} مكتبة AI - جميع الحقوق محفوظة
          </div>
        </div>
      </footer>
    </div>
  );
}

