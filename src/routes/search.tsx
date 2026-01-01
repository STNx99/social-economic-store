import { createFileRoute } from '@tanstack/react-router'
import SearchPage from '@/components/SearchPage'

export const Route = createFileRoute('/search')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: (search.q as string) || '',
    }
  },
  component: SearchPage,
})
