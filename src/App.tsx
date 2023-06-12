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
  const expTokens = [
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
    <div className='container flex flex-col items-start justify-start min-h-screen border-2'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm' className='px-0 w-9'>
            <Icons.sun className='transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0' />
            <Icons.moon className='absolute transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => setTheme('light')}>
            <Icons.sun className='w-4 h-4 mr-2' />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            <Icons.moon className='w-4 h-4 mr-2' />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            <Icons.laptop className='w-4 h-4 mr-2' />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* THEME DISPLAY */}
      <div className='flex flex-wrap gap-5 my-10'>
        {tokens.map((token) => (
          <DemoCard variant={token as VariantProps<typeof colorVariants>} />
        ))}
      </div>
      <div className='flex flex-wrap gap-5 my-10'>
        {expTokens.map((token) => (
          <DemoCard variant={token as VariantProps<typeof colorVariants>} />
        ))}
      </div>

      {/* demo form */}
      <DemoForm />
      <Toaster />
    </div>
  )
}
