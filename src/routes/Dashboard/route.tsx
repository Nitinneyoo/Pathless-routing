// routes/Dashboard/__layout.tsx
import RobotFilterPage from "./FilterComponent/robotFilter";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="p-2 bg-white border-b flex items-center justify-between text-xl font-bold shadow-lg">
        <Link to="/Dashboard/Robot">Dashboard</Link>
        <div className="text-sm font-normal hover:underline">
          <RobotFilterPage />
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-52 bg-white text-gray-800 overflow-y-auto p-4">
          <nav className="flex flex-col space-y-2">
            {(
              [
                ["/Dashboard/Robot", "Robot", true],
                ["/Dashboard/user", "Users"],
                ["/Dashboard/Station", "Station"],
                ["/Dashboard/battery", "Battery"],
              ] as const
            ).map(([to, label, exact]) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact }}
                activeProps={{ className: "font-bold underline" }}
                className="p-2 hover:bg-gray-300 rounded"
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content area */}
        <main className="flex-1 p-2 bg-gray-200 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
