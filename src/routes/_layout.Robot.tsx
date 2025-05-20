import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/Robot')({
  component: RobotComponent,
})

function RobotComponent() {
  return <div>Hello "/_layout/Robot"!</div>
}
