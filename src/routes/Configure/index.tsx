import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Configure/')({
  component: ConfigureComponent,
})

function ConfigureComponent() {
  return <div>Hello "/Configure/"!</div>
}
