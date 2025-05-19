// routes/Dashboard/index.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  return <div className="text-lg">Select a section from the sidebar to continue.</div>;
}
