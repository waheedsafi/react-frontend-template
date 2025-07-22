import type { User, UserPermission } from "@/database/models";
import Unauthorized from "@/views/error/unauthorized";
import AuthLayout from "@/views/layouts/auth-layout";
import GuestLayout from "@/views/layouts/guest-layout";
import SiteLayout from "@/views/layouts/site-layout";
import LoginPage from "@/views/pages/guest-features/login/user/login-page";
import UserLoginPage from "@/views/pages/guest-features/login/user/user-login-page";
import AboutUsPage from "@/views/pages/main-site/about-us/about-us-page";
import ContactUsPage from "@/views/pages/main-site/contact-us/contact-us-page";
import FaqsPage from "@/views/pages/main-site/faq/Faqs-page";
import HomePage from "@/views/pages/main-site/home/home-page";
import MainPage from "@/views/pages/main-site/main/main-page";
import { BrowserRouter, Route, Routes } from "react-router";

export const getSuperRouter = (user: User, authenticated: boolean) => {
  const permissions: Map<string, UserPermission> = user.permissions;
  return (
    <BrowserRouter>
      <Routes>
        {/* Site Routes */}
        <Route path="/" element={<SiteLayout />}>
          {/* These routes will be passed as children */}
          {site}
        </Route>

        {/* Super Routes (Protected) */}
        <Route path="/" element={<AuthLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
// export const getAdminRouter = (
//   user: User | Ngo | Donor,
//   authenticated: boolean
// ) => {
//   const permissions: Map<string, UserPermission> = user.permissions;
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Error Routes */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <ErrorLayout />
//             </I18nextProvider>
//           }
//         >
//           {error}
//         </Route>
//         {/* Site Routes */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <SiteLayout />
//             </I18nextProvider>
//           }
//         >
//           {/* These routes will be passed as children */}
//           {site}
//         </Route>

//         {/* Super Routes (Protected) */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <AuthLayout />
//             </I18nextProvider>
//           }
//         >
//           <Route path="dashboard" element={<AdminDashboardPage />} />
//           <Route
//             path="users"
//             element={
//               <ProtectedRoute
//                 element={<SuperUserPage />}
//                 routeName="users"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="users/:id"
//             element={
//               <ProtectedRoute
//                 element={<SuperUserEditPage />}
//                 routeName="users"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="reports"
//             element={
//               <ProtectedRoute
//                 element={<SuperReportsPage />}
//                 routeName="reports"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route path="profile" element={<UsersProfilePage />} />
//           <Route
//             path="configurations"
//             element={
//               <ProtectedRoute
//                 element={<ConfigurationsPage />}
//                 routeName="configurations"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route path="settings" element={<SettingsPage />} />
//           <Route
//             path="ngo"
//             element={
//               <ProtectedRoute
//                 element={<NgoPage />}
//                 routeName="ngo"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="ngo/:id"
//             element={
//               <ProtectedRoute
//                 element={<UserNgoEditPage />}
//                 routeName="ngo"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="ngo/profile/edit/:id"
//             element={
//               <ProtectedRoute
//                 element={<NgoFormSubmit />}
//                 routeName="ngo"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="ngo/register/extend/:id"
//             element={
//               <ProtectedRoute
//                 element={<NgoFormExtend />}
//                 routeName="ngo"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />

//           <Route
//             path="management/news"
//             element={
//               <ProtectedRoute
//                 element={<NewsManagementPage />}
//                 routeName="management/news"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="management/news/:id"
//             element={
//               <ProtectedRoute
//                 element={<EditNews />}
//                 routeName="management/news"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="management/about"
//             element={
//               <ProtectedRoute
//                 element={<AboutManagementPage />}
//                 routeName="management/about"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="approval"
//             element={
//               <ProtectedRoute
//                 element={<ApprovalPage />}
//                 routeName="approval"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="donor"
//             element={
//               <ProtectedRoute
//                 element={<DonorPage />}
//                 routeName="donor"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="donor/:id"
//             element={
//               <ProtectedRoute
//                 element={<UserDonorEditPage />}
//                 routeName="donor"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="projects"
//             element={
//               <ProtectedRoute
//                 element={<ProjectsPage />}
//                 routeName="projects"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="projects/details/:id"
//             element={
//               <ProtectedRoute
//                 element={<ProjectEditPage />}
//                 routeName="projects"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="schedules"
//             element={
//               <ProtectedRoute
//                 element={<SchedulesPage />}
//                 routeName="schedules"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="schedules/:data/*"
//             element={
//               <ProtectedRoute
//                 element={<AddOrEditSchedule />}
//                 routeName="schedules"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//         </Route>

//         {/* Catch-all Route for Errors */}
//         <Route path="*" element={<Unauthorized />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };
// export const getUserRouter = (
//   user: User | Ngo | Donor,
//   authenticated: boolean
// ) => {
//   const permissions: Map<string, UserPermission> = user.permissions;
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Error Routes */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <ErrorLayout />
//             </I18nextProvider>
//           }
//         >
//           {error}
//         </Route>
//         {/* Site Routes */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <SiteLayout />
//             </I18nextProvider>
//           }
//         >
//           {/* These routes will be passed as children */}
//           {site}
//         </Route>

//         {/* User Routes (Protected) */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <AuthLayout />
//             </I18nextProvider>
//           }
//         >
//           <Route path="dashboard" element={<UserDashboardPage />} />
//           <Route
//             path="reports"
//             element={
//               <ProtectedRoute
//                 element={<SuperReportsPage />}
//                 routeName="reports"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="configurations"
//             element={
//               <ProtectedRoute
//                 element={<ConfigurationsPage />}
//                 routeName="configurations"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route path="settings" element={<SettingsPage />} />
//           <Route path="profile" element={<UsersProfilePage />} />
//           <Route
//             path="ngo"
//             element={
//               <ProtectedRoute
//                 element={<NgoPage />}
//                 routeName="ngo"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="ngo/:id"
//             element={
//               <ProtectedRoute
//                 element={<UserNgoEditPage />}
//                 routeName="ngo"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="ngo/profile/edit/:id"
//             element={
//               <ProtectedRoute
//                 element={<NgoFormSubmit />}
//                 routeName="ngo"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="ngo/register/extend/:id"
//             element={
//               <ProtectedRoute
//                 element={<NgoFormExtend />}
//                 routeName="ngo"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="management/news"
//             element={
//               <ProtectedRoute
//                 element={<NewsManagementPage />}
//                 routeName="management/news"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="management/news/:id"
//             element={
//               <ProtectedRoute
//                 element={<EditNews />}
//                 routeName="management/news"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="management/about"
//             element={
//               <ProtectedRoute
//                 element={<AboutManagementPage />}
//                 routeName="management/about"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="approval"
//             element={
//               <ProtectedRoute
//                 element={<ApprovalPage />}
//                 routeName="approval"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="donor"
//             element={
//               <ProtectedRoute
//                 element={<DonorPage />}
//                 routeName="donor"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="donor/:id"
//             element={
//               <ProtectedRoute
//                 element={<UserDonorEditPage />}
//                 routeName="donor"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="projects"
//             element={
//               <ProtectedRoute
//                 element={<ProjectsPage />}
//                 routeName="projects"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="projects/details/:id"
//             element={
//               <ProtectedRoute
//                 element={<ProjectEditPage />}
//                 routeName="projects"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//         </Route>

//         {/* Catch-all Route for Errors */}
//         <Route path="*" element={<ErrorPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };
// export const getDebuggerRouter = (
//   user: User | Ngo | Donor,
//   authenticated: boolean
// ) => {
//   const permissions: Map<string, UserPermission> = user.permissions;
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Error Routes */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <ErrorLayout />
//             </I18nextProvider>
//           }
//         >
//           {error}
//         </Route>
//         {/* Site Routes */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <SiteLayout />
//             </I18nextProvider>
//           }
//         >
//           {/* These routes will be passed as children */}
//           {site}
//         </Route>

//         {/* User Routes (Protected) */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <AuthLayout />
//             </I18nextProvider>
//           }
//         >
//           <Route path="dashboard" element={<DebuggerDashboardPage />} />
//           <Route
//             path="logs"
//             element={
//               <ProtectedRoute
//                 element={<LogsPage />}
//                 routeName="logs"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route path="settings" element={<SettingsPage />} />

//           <Route path="profile" element={<UsersProfilePage />} />
//         </Route>

//         {/* Catch-all Route for Errors */}
//         <Route path="*" element={<Unauthorized />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };
// export const getNgoRouter = (
//   user: User | Ngo | Donor,
//   authenticated: boolean
// ) => {
//   const permissions: Map<string, UserPermission> = user.permissions;
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Error Routes */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <ErrorLayout />
//             </I18nextProvider>
//           }
//         >
//           {error}
//         </Route>
//         {/* Site Routes */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <SiteLayout />
//             </I18nextProvider>
//           }
//         >
//           {/* These routes will be passed as children */}
//           {site}
//         </Route>

//         {/* User Routes (Protected) */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <AuthLayout />
//             </I18nextProvider>
//           }
//         >
//           <Route path="dashboard" element={<NgoDashboardPage />} />
//           <Route
//             path="reports"
//             element={
//               <ProtectedRoute
//                 element={<NgoReportsPage />}
//                 routeName="reports"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route path="settings" element={<SettingsPage />} />
//           <Route
//             path="ngo/profile/edit/:id"
//             element={
//               <ProtectedRoute
//                 element={<NgoFormSubmit />}
//                 routeName="ngo"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="ngo/:id"
//             element={
//               <ProtectedRoute
//                 element={<UserNgoEditPage />}
//                 routeName="ngo"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="projects"
//             element={
//               <ProtectedRoute
//                 element={<ProjectsPage />}
//                 routeName="projects"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="projects/:id"
//             element={
//               <ProtectedRoute
//                 element={<AddProject />}
//                 routeName="projects"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="projects/details/:id"
//             element={
//               <ProtectedRoute
//                 element={<ProjectEditPage />}
//                 routeName="projects"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route path="profile" element={<NgoProfilePage />} />
//         </Route>

//         {/* Catch-all Route for Errors */}
//         <Route path="*" element={<Unauthorized />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };
// export const getDonorRouter = (
//   user: User | Ngo | Donor,
//   authenticated: boolean
// ) => {
//   const permissions: Map<string, UserPermission> = user.permissions;
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Error Routes */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <ErrorLayout />
//             </I18nextProvider>
//           }
//         >
//           {error}
//         </Route>
//         {/* Site Routes */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <SiteLayout />
//             </I18nextProvider>
//           }
//         >
//           {/* These routes will be passed as children */}
//           {site}
//         </Route>

//         {/* User Routes (Protected) */}
//         <Route
//           path="/"
//           element={
//             <I18nextProvider i18n={i18n}>
//               <AuthLayout />
//             </I18nextProvider>
//           }
//         >
//           <Route path="dashboard" element={<DonorDashboardPage />} />
//           <Route
//             path="ngo"
//             element={
//               <ProtectedRoute
//                 element={<DonorNgoPage />}
//                 routeName="ngo"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="projects"
//             element={
//               <ProtectedRoute
//                 element={<DonorProjectsPage />}
//                 routeName="projects"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="projects/details/:id"
//             element={
//               <ProtectedRoute
//                 element={<ProjectEditPage />}
//                 routeName="projects"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route
//             path="reports"
//             element={
//               <ProtectedRoute
//                 element={<DonorReportsPage />}
//                 routeName="reports"
//                 permissions={permissions}
//                 authenticated={authenticated}
//               />
//             }
//           />
//           <Route path="settings" element={<SettingsPage />} />
//           <Route path="profile" element={<DonorProfilePage />} />
//         </Route>

//         {/* Catch-all Route for Errors */}
//         <Route path="*" element={<Unauthorized />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

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
    <Route index element={<HomePage />} />
    {/* Default route (equivalent to `/`) */}
    <Route path="home" element={<HomePage />} />
    <Route path="about_us" element={<AboutUsPage />} />
    <Route path="contact_us" element={<ContactUsPage />} />
    <Route path="faqs" element={<FaqsPage />} />
    {/* Catch-all Route for Errors */}
    <Route path="*" element={<HomePage />} />
    {/* Fallback for unknown routes */}
  </Route>
);
const error = <Route path="/unauthorized" element={<Unauthorized />}></Route>;
