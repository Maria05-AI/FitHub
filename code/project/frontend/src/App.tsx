import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import MemberDashboard from "./pages/member/MemberDashboard";
import Workouts from "./pages/member/Workouts";
import Sessions from "./pages/member/Sessions";
import MemberProgress from "./pages/member/Progress";
import MemberProfile from "./pages/member/Profile";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import TrainerMembers from "./pages/trainer/Members";
import TrainerSessions from "./pages/trainer/TrainerSessions";
import TrainerReports from "./pages/trainer/Reports";
import TrainerProfile from "./pages/trainer/TrainerProfile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageMembers from "./pages/admin/ManageMembers";
import ManageTrainers from "./pages/admin/ManageTrainers";
import AdminAuth from "./pages/admin/AdminAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
           
            <Route path="/member" element={<Navigate to="/auth?role=member" replace />} />
          <Route path="/member/login" element={<Navigate to="/auth?role=member" replace />} />
          <Route path="/trainer" element={<Navigate to="/auth?role=trainer" replace />} />
          <Route path="/trainer/login" element={<Navigate to="/auth?role=trainer" replace />} />

          {/* Member Routes - Protected */}
          <Route path="/member/dashboard" element={
            <ProtectedRoute requiredRole="member">
              <MemberDashboard />
            </ProtectedRoute>
          } />
          <Route path="/member/workouts" element={
            <ProtectedRoute requiredRole="member">
              <Workouts />
            </ProtectedRoute>
          } />
          <Route path="/member/sessions" element={
            <ProtectedRoute requiredRole="member">
              <Sessions />
            </ProtectedRoute>
          } />
          <Route path="/member/progress" element={
            <ProtectedRoute requiredRole="member">
              <MemberProgress />
            </ProtectedRoute>
          } />
          <Route path="/member/profile" element={
            <ProtectedRoute requiredRole="member">
              <MemberProfile />
            </ProtectedRoute>
          } />
          
          {/* Trainer Routes - Protected */}
          <Route path="/trainer/dashboard" element={
            <ProtectedRoute requiredRole="trainer">
              <TrainerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/trainer/members" element={
            <ProtectedRoute requiredRole="trainer">
              <TrainerMembers />
            </ProtectedRoute>
          } />
          <Route path="/trainer/sessions" element={
            <ProtectedRoute requiredRole="trainer">
              <TrainerSessions />
            </ProtectedRoute>
          } />
          <Route path="/trainer/reports" element={
            <ProtectedRoute requiredRole="trainer">
              <TrainerReports />
            </ProtectedRoute>
          } />
          <Route path="/trainer/profile" element={
            <ProtectedRoute requiredRole="trainer">
              <TrainerProfile />
            </ProtectedRoute>
          } />

          {/* Admin Routes - Protected */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminAuth />} />

          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="members" element={<ManageMembers />} />
            <Route path="trainers" element={<ManageTrainers />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;