import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LoginForm } from './components/auth/LoginForm';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PostForm } from './components/admin/PostForm';
import { CategoryPosts } from './components/posts/CategoryPosts';
import { PostDetail } from './components/posts/PostDetail';
import { HomePage } from './components/pages/HomePage';
import { AuthGuard } from './components/auth/AuthGuard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:category" element={<CategoryPosts />} />
            <Route path="/:category/:slug" element={<PostDetail />} />
            <Route path="/admin" element={<LoginForm />} />
            <Route
              path="/admin/dashboard"
              element={
                <AuthGuard>
                  <AdminDashboard />
                </AuthGuard>
              }
            />
            <Route
              path="/admin/new-post"
              element={
                <AuthGuard>
                  <PostForm />
                </AuthGuard>
              }
            />
            <Route
              path="/admin/edit/:id"
              element={
                <AuthGuard>
                  <PostForm />
                </AuthGuard>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}