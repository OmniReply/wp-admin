import { Suspense, lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import AuthGuard from '@/components/layout/AuthGuard';
import LoginPage from '@/pages/login/LoginPage';
import StatsOverview from '@/components/dashboard/StatsOverview';
const AdminUserList = lazy(() => import('@/pages/admin-user/List'));
const AdminUserDetail = lazy(() => import('@/pages/admin-user/Detail'));
const AppVersionList = lazy(() => import('@/pages/app-version/List'));
const AppVersionDetail = lazy(() => import('@/pages/app-version/Detail'));
const AutoReplyRulePageList = lazy(() => import('@/pages/auto-reply-rule-page/List'));
const BroadcastMessageList = lazy(() => import('@/pages/broadcast-message/List'));
const ChatbotChatLogPageList = lazy(() => import('@/pages/chatbot-chat-log-page/List'));
const ChatbotPreviewChatPageList = lazy(() => import('@/pages/chatbot-preview-chat-page/List'));
const ChatbotRouteList = lazy(() => import('@/pages/chatbot-route/List'));
const ChatbotRouteDetail = lazy(() => import('@/pages/chatbot-route/Detail'));
const DatasourceList = lazy(() => import('@/pages/datasource/List'));
const LoginFailList = lazy(() => import('@/pages/login-fail/List'));
const LoginLogPageList = lazy(() => import('@/pages/login-log-page/List'));
const MembershipOrderList = lazy(() => import('@/pages/membership-order/List'));
const MembershipOrderDetail = lazy(() => import('@/pages/membership-order/Detail'));
const MembershipPlanList = lazy(() => import('@/pages/membership-plan/List'));
const MembershipPlanDetail = lazy(() => import('@/pages/membership-plan/Detail'));
const ReminderNotificationPageList = lazy(() => import('@/pages/reminder-notification-page/List'));
const ShortcutReplyPageList = lazy(() => import('@/pages/shortcut-reply-page/List'));
const SystemConfigList = lazy(() => import('@/pages/system-config/List'));
const SystemConfigDetail = lazy(() => import('@/pages/system-config/Detail'));
const TeamList = lazy(() => import('@/pages/team/List'));
const TeamDetail = lazy(() => import('@/pages/team/Detail'));
const TokenAlertConfigList = lazy(() => import('@/pages/token-alert-config/List'));
const TokenAlertConfigDetail = lazy(() => import('@/pages/token-alert-config/Detail'));
const TokenAlertRecordPageList = lazy(() => import('@/pages/token-alert-record-page/List'));
const TokenPackageList = lazy(() => import('@/pages/token-package/List'));
const TokenPackageDetail = lazy(() => import('@/pages/token-package/Detail'));
const TokenRechargeOrderList = lazy(() => import('@/pages/token-recharge-order/List'));
const TokenRechargeOrderDetail = lazy(() => import('@/pages/token-recharge-order/Detail'));
const TranslateRouteList = lazy(() => import('@/pages/translate-route/List'));
const TranslateRouteDetail = lazy(() => import('@/pages/translate-route/Detail'));
const UserList = lazy(() => import('@/pages/user/List'));
const UserDetail = lazy(() => import('@/pages/user/Detail'));

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
  path: '/',
  element: (
    <AuthGuard>
      <AppLayout />
    </AuthGuard>
  ),
  children: [
    { index: true, element: <Navigate replace to="/dashboard" /> },
    { path: 'dashboard', element: <StatsOverview /> },
  {
  path: 'admin-user',
  children: [
    { index: true, element: <Suspense fallback={null}><AdminUserList /></Suspense> }, { path: ':id', element: <Suspense fallback={null}><AdminUserDetail /></Suspense> },
  ],
},
  {
  path: 'app-version',
  children: [
    { index: true, element: <Suspense fallback={null}><AppVersionList /></Suspense> }, { path: ':id', element: <Suspense fallback={null}><AppVersionDetail /></Suspense> },
  ],
},
  {
  path: 'auto-reply-rule-page',
  children: [
    { index: true, element: <Suspense fallback={null}><AutoReplyRulePageList /></Suspense> },
  ],
},
  {
  path: 'broadcast-message',
  children: [
    { index: true, element: <Suspense fallback={null}><BroadcastMessageList /></Suspense> },
  ],
},
  {
  path: 'chatbot-chat-log-page',
  children: [
    { index: true, element: <Suspense fallback={null}><ChatbotChatLogPageList /></Suspense> },
  ],
},
  {
  path: 'chatbot-preview-chat-page',
  children: [
    { index: true, element: <Suspense fallback={null}><ChatbotPreviewChatPageList /></Suspense> },
  ],
},
  {
  path: 'chatbot-route',
  children: [
    { index: true, element: <Suspense fallback={null}><ChatbotRouteList /></Suspense> }, { path: ':id', element: <Suspense fallback={null}><ChatbotRouteDetail /></Suspense> },
  ],
},
  {
  path: 'datasource',
  children: [
    { index: true, element: <Suspense fallback={null}><DatasourceList /></Suspense> },
  ],
},
  {
  path: 'login-fail',
  children: [
    { index: true, element: <Suspense fallback={null}><LoginFailList /></Suspense> },
  ],
},
  {
  path: 'login-log-page',
  children: [
    { index: true, element: <Suspense fallback={null}><LoginLogPageList /></Suspense> },
  ],
},
  {
  path: 'membership-order',
  children: [
    { index: true, element: <Suspense fallback={null}><MembershipOrderList /></Suspense> }, { path: ':id', element: <Suspense fallback={null}><MembershipOrderDetail /></Suspense> },
  ],
},
  {
  path: 'membership-plan',
  children: [
    { index: true, element: <Suspense fallback={null}><MembershipPlanList /></Suspense> }, { path: ':id', element: <Suspense fallback={null}><MembershipPlanDetail /></Suspense> },
  ],
},
  {
  path: 'reminder-notification-page',
  children: [
    { index: true, element: <Suspense fallback={null}><ReminderNotificationPageList /></Suspense> },
  ],
},
  {
  path: 'shortcut-reply-page',
  children: [
    { index: true, element: <Suspense fallback={null}><ShortcutReplyPageList /></Suspense> },
  ],
},
  {
  path: 'system-config',
  children: [
    { index: true, element: <Suspense fallback={null}><SystemConfigList /></Suspense> }, { path: ':id', element: <Suspense fallback={null}><SystemConfigDetail /></Suspense> },
  ],
},
  {
  path: 'team',
  children: [
    { index: true, element: <Suspense fallback={null}><TeamList /></Suspense> }, { path: ':id', element: <Suspense fallback={null}><TeamDetail /></Suspense> },
  ],
},
  {
  path: 'token-alert-config',
  children: [
    { index: true, element: <Suspense fallback={null}><TokenAlertConfigList /></Suspense> }, { path: ':id', element: <Suspense fallback={null}><TokenAlertConfigDetail /></Suspense> },
  ],
},
  {
  path: 'token-alert-record-page',
  children: [
    { index: true, element: <Suspense fallback={null}><TokenAlertRecordPageList /></Suspense> },
  ],
},
  {
  path: 'token-package',
  children: [
    { index: true, element: <Suspense fallback={null}><TokenPackageList /></Suspense> }, { path: ':id', element: <Suspense fallback={null}><TokenPackageDetail /></Suspense> },
  ],
},
  {
  path: 'token-recharge-order',
  children: [
    { index: true, element: <Suspense fallback={null}><TokenRechargeOrderList /></Suspense> }, { path: ':id', element: <Suspense fallback={null}><TokenRechargeOrderDetail /></Suspense> },
  ],
},
  {
  path: 'translate-route',
  children: [
    { index: true, element: <Suspense fallback={null}><TranslateRouteList /></Suspense> }, { path: ':id', element: <Suspense fallback={null}><TranslateRouteDetail /></Suspense> },
  ],
},
  {
  path: 'user',
  children: [
    { index: true, element: <Suspense fallback={null}><UserList /></Suspense> }, { path: ':id', element: <Suspense fallback={null}><UserDetail /></Suspense> },
  ],
},
                ],
            },
]);
