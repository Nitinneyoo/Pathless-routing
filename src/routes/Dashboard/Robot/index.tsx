import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Dashboard/Robot/")({
  component: RobotPage,
});

function RobotPage() {
  return <div className="text-lg font-medium">Robot Management View</div>;
}