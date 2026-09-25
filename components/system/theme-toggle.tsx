'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

/**
 * Light/dark switch. `compact` renders the slim text-and-icon form used in the header's
 * top bar; the default is the square icon button. `label` is the accessible name, which
 * the header passes in the page's language.
 */
export function ThemeToggle({ compact = false, label = 'Toggle theme' }: { compact?: boolean; label?: string }) {
  const { theme, setTheme } = useTheme()
  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggle}
        className="relative inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="relative h-3.5 w-3.5" aria-hidden="true">
          <Sun className="absolute h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </span>
        {label}
      </button>
    )
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{label}</span>
    </Button>
  )
}
