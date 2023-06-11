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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from './hooks/useToast'
import { DemoForm } from './DemoForm'
import { Toaster } from './primitives/Toaster'
import { cn } from './lib/utils'

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
		'muted',
		'card',
		'popover',
	]
	const expTokens = [
		'primary',
		'secondary',
		'accent',
		'destructive',
		'muted',
		'card',
		'popover',
	]

	const DemoCard = ({ variant }: { variant: string }) => {
		return (
			<div
				className={`w-[180px] capitalize h-[180px] bg-${variant} justify-center items-center flex text-${variant}-foreground`}
			>
				{variant}
			</div>
		)
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
			<div className='flex gap-5 my-10 flex-wrap'>
				{tokens.map((token) => (
					<DemoCard variant={token} />
				))}
			</div>
			<div className='flex gap-5 my-10 flex-wrap'>
				{expTokens.map((token) => (
					<DemoCard variant={token} />
				))}
			</div>

			{/* demo form */}
			<DemoForm />
			<Toaster />
		</div>
	)
}
