import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Dashboard/Station/')({
  component: StationPage,
})

function StationPage() {
  return <div>Hello "/Dashboard/Station/"!</div>
}
