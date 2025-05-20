
import { createFileRoute, Outlet } from '@tanstack/react-router';

const Layout: React.FC = () => {
  return (
    <div>
      <h1>My App</h1>
      <hr />
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute('/_layout')({
  component: Layout,
})


export default Layout;

