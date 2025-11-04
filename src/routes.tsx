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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-[480px] mx-auto p-4 pb-28">
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
