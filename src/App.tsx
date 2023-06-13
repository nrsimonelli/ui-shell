import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import { Button } from './primitives/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './primitives/DropdownMenu'
import { Icons } from './primitives/Icons'
import { DemoForm } from './DemoForm'
import { Toaster } from './primitives/Toaster'
import { cn } from './lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { SidebarNav } from './components/SidebarNav'
import { NAV_CONTENT } from './constants'
import { TopNav } from './components/TopNav'

export const App = () => {
  const themeContext = useContext(ThemeContext)

  if (!themeContext) {
    return null
  }

  const { theme, setTheme } = themeContext

  const tokens = [
    'primary',
    'secondary',
    'accent',
    'destructive',
    'success',
    'info',
    'muted',
    'card',
    'popover',
  ]

  const colorVariants = cva(
    `w-[180px] capitalize h-[180px] justify-center items-center flex`,
    {
      variants: {
        variant: {
          primary: 'bg-primary text-primary-foreground',
          secondary: 'bg-secondary text-secondary-foreground',
          accent: 'bg-accent text-accent-foreground',
          destructive: 'bg-destructive text-destructive-foreground',
          success: 'bg-success text-success-foreground',
          info: 'bg-info text-info-foreground',
          muted: 'bg-muted text-muted-foreground',
          card: 'bg-card text-card-foreground',
          popover: 'bg-popover text-popover-foreground',
        },
      },
      defaultVariants: {
        variant: 'primary',
      },
    }
  )
  const DemoCard = ({
    variant,
  }: {
    variant: VariantProps<typeof colorVariants>
  }) => {
    return <div className={cn(colorVariants({ variant }))}>{variant}</div>
  }

  return (
    <div className='relative flex flex-col min-h-screen'>
      {/* HEADER */}
      <header className='sticky top-0 z-40 w-full border-b supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur'>
        <TopNav />
      </header>
      {/* BODY */}
      <div className='flex-1'>
        <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
          <SidebarNav items={NAV_CONTENT.SIDE} />
          <main className='relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]'>
            <div className='flex flex-wrap gap-5 py-10'>
              {tokens.map((token) => (
                <DemoCard
                  variant={token as VariantProps<typeof colorVariants>}
                />
              ))}
            </div>
            <DemoForm />
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
