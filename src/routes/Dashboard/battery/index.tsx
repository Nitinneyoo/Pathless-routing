import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Dashboard/battery/")({
  component: BatteryPage,
});

function BatteryPage() {
  return <div className="text-lg font-medium">Battery Management View</div>;
}