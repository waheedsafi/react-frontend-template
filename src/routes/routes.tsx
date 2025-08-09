import type { User, UserPermission } from "@/database/models";
import ProtectedRoute from "@/routes/protected-route";
import Unauthorized from "@/views/error/unauthorized";
import AuthLayout from "@/views/layouts/auth-layout";
import GuestLayout from "@/views/layouts/guest-layout";
import SiteLayout from "@/views/layouts/site-layout";
import UserEditPage from "@/views/pages/auth-features/users/edit/user-edit-page";
import UserPage from "@/views/pages/auth-features/users/user-page";
import LoginPage from "@/views/pages/guest-features/login/user/login-page";
import UserLoginPage from "@/views/pages/guest-features/login/user/user-login-page";
import AboutUsPage from "@/views/pages/main-site/about-us/about-us-page";
import ContactUsPage from "@/views/pages/main-site/contact-us/contact-us-page";
import FaqsPage from "@/views/pages/main-site/faq/Faqs-page";
import HomePage from "@/views/pages/main-site/home/home-page";
import MainPage from "@/views/pages/main-site/main/main-page";
import SuperDashboardPage from "@/views/pages/auth-features/dashboard/super/super-dashboard-page";
import { BrowserRouter, Route, Routes } from "react-router";
import { lazy } from "react";
import ActivityPage from "@/views/pages/auth-features/activity/activity-page";
const UsersProfilePage = lazy(
  () => import("@/views/pages/auth-features/profile/users/users-profile-page")
);
const AboutPage = lazy(
  () => import("@/views/pages/auth-features/about/about-page")
);
const ConfigurationsPage = lazy(
  () => import("@/views/pages/auth-features/configurations/configurations-page")
);
const SettingsPage = lazy(
  () => import("@/views/pages/auth-features/settings/settings-page")
);

export const getAuthRouter = (user: User, authenticated: boolean) => {
  const permissions: Map<string, UserPermission> = user.permissions;
  return (
    <BrowserRouter>
      <Routes>
        {/* Super Routes (Protected) */}
        <Route path="/dashboard" element={<AuthLayout />}>
          <Route index element={<SuperDashboardPage />} />

          <Route
            path="users"
            element={
              <ProtectedRoute
                element={<UserPage />}
                routeName="users"
                permissions={permissions}
                authenticated={authenticated}
              />
            }
          />
          <Route
            path="users/:id"
            element={
              <ProtectedRoute
                element={<UserEditPage />}
                routeName="users"
                permissions={permissions}
                authenticated={authenticated}
              />
            }
          />
          <Route
            path="configurations/:id"
            element={
              <ProtectedRoute
                element={<ConfigurationsPage />}
                routeName="configurations"
                permissions={permissions}
                authenticated={authenticated}
              />
            }
          />
          <Route
            path="about/:id"
            element={
              <ProtectedRoute
                element={<AboutPage />}
                routeName="about"
                permissions={permissions}
                authenticated={authenticated}
              />
            }
          />
          <Route
            path="activity/:id"
            element={
              <ProtectedRoute
                element={<ActivityPage />}
                routeName="activity"
                permissions={permissions}
                authenticated={authenticated}
              />
            }
          />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<UsersProfilePage />} />
        </Route>
        {/* Site Routes */}
        <Route path="/" element={<SiteLayout />}>
          {/* These routes will be passed as children */}
          {site}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export const getGuestRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/user/login" element={<UserLoginPage />} />
        </Route>
        {/* Site Routes */}
        <Route path="/" element={<SiteLayout />}>
          {/* These routes will be passed as children */}
          {site}
        </Route>
        {/* Catch-all Route for Errors */}
        <Route path="*" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
};
const site = (
  <Route path="/" element={<MainPage />}>
    {/* Default route (equivalent to `/`) */}
    <Route index path="/" element={<HomePage />} />
    <Route index path="home" element={<HomePage />} />
    <Route path="about_us" element={<AboutUsPage />} />
    <Route path="contact_us" element={<ContactUsPage />} />
    <Route path="faqs" element={<FaqsPage />} />
    <Route path="*" element={<HomePage />} />
  </Route>
);
// const error = <Route path="/unauthorized" element={<Unauthorized />}></Route>;
