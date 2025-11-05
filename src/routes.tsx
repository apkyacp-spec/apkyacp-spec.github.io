import { createBrowserRouter, Outlet } from 'react-router-dom';
import Profile from './pages/Profile';
import Forms from './pages/Forms';
import Balance from './pages/Balance';
import Manuals from './pages/Manuals';
import Chats from './pages/Chats';
import { BottomNav } from './components/BottomNav';
import { RequireAccess } from './roles';

function Layout() {
  return (
    <div className="min-h-screen text-[var(--text)] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)] via-[var(--bg-secondary)] to-[var(--bg)]" />
      <div className="relative z-10 max-w-[480px] mx-auto p-5 pb-32 min-h-screen">
        <RequireAccess>
          <Outlet />
        </RequireAccess>
      </div>
      <BottomNav />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Profile /> },
      { path: 'forms', element: <Forms /> },
      { path: 'balance', element: <Balance /> },
      { path: 'manuals', element: <Manuals /> },
      { path: 'chats', element: <Chats /> }
    ]
  }
]);
