
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Careers from "./pages/Careers";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";
import WhatsAppButton from "./components/WhatsAppButton";
import { lazy, Suspense } from "react";

const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));

const queryClient = new QueryClient();

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Loading...</div>;
  if (!isAuthenticated || !isAdmin) return <Navigate to="/admin-login" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Suspense fallback={<div className="min-h-screen bg-[#1a1a1a]" />}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
            <CookieConsent />
            <WhatsAppButton />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
