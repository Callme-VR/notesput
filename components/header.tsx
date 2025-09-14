/**
 * HeroHeader Component
 * 
 * A responsive navigation header with authentication, mobile menu, and scroll effects.
 * Features include:
 * - Responsive design with mobile hamburger menu
 * - Scroll-based background blur effect
 * - User authentication with dropdown menu
 * - Dark/light mode toggle
 * - Animated menu transitions
 */


'use client'

// Next.js imports
import Link from 'next/link'

// Icon imports from Lucide React
import { Menu, X, LogOut, User } from 'lucide-react'

// UI Component imports
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// React and utility imports
import React from 'react'
import { cn } from '@/lib/utils'

// Animation and scroll handling
import { useScroll } from 'motion/react'

// Custom components and authentication
import ModeToggle from './mode-toggle'
import { useSession, signOut } from '@/lib/auth-client'

/**
 * Navigation menu items configuration
 * Used for both desktop and mobile menu rendering
 */
const menuItems = [
    { name: 'Features', href: '#link' },
    { name: 'Solution', href: '#link' },
    { name: 'Pricing', href: '#link' },
    { name: 'About', href: '#link' },
]

/**
 * HeroHeader Component
 * 
 * Main navigation header component that provides:
 * - Responsive navigation menu
 * - User authentication UI
 * - Scroll-based styling effects
 * - Mobile menu toggle functionality
 */
export const HeroHeader = () => {
    // State for mobile menu visibility
    const [menuState, setMenuState] = React.useState(false)
    
    // State for scroll-based styling changes
    const [scrolled, setScrolled] = React.useState(false)
    
    // Authentication session data and loading state
    const { data: session, isPending } = useSession()

    // Hook for tracking scroll progress
    const { scrollYProgress } = useScroll()

    /**
     * Effect to handle scroll-based header styling
     * Updates the 'scrolled' state when user scrolls past 5% of the page
     */
    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    /**
     * Handle user sign out
     * Attempts to sign out the user and redirect to home page
     */
    const handleSignOut = async () => {
        try {
            await signOut()
            window.location.href = '/' // Redirect to home after sign out
        } catch (error) {
            console.error('Sign out error:', error)
        }
    }

    
    return (
        <header>
            {/* Main navigation container */}
            <nav
                data-state={menuState && 'active'}
                className={cn(
                    'fixed z-20 w-full border-b transition-colors duration-150', 
                    scrolled && 'bg-background/50 backdrop-blur-3xl'
                )}>
                
                {/* Content wrapper with max width and padding */}
                <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
                    
                    {/* Main navigation content */}
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        
                        {/* Left side: Logo and desktop menu */}
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            
                            {/* Logo/Home link */}
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                            </Link>

                            {/* Mobile menu toggle button */}
                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                {/* Hamburger menu icon - visible when menu is closed */}
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                {/* X close icon - visible when menu is open */}
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            {/* Desktop navigation menu */}
                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right side: Mobile menu overlay and auth controls */}
                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            
                            {/* Mobile menu items */}
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            {/* Authentication and utility controls */}
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                {/* Dark/Light mode toggle */}
                                <ModeToggle />
                                
                                {/* Authentication UI - Loading state */}
                                {isPending ? (
                                    <div className="flex gap-3">
                                        <div className="h-9 w-16 bg-muted animate-pulse rounded-md" />
                                        <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
                                    </div>
                                ) : session?.user ? (
                                    /* Authenticated user dropdown menu */
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="gap-2"
                                            >
                                                <User className="h-4 w-4" />
                                                {session.user.name || session.user.email}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            {/* Profile link */}
                                            <DropdownMenuItem asChild>
                                                <Link href="/profile" className="cursor-pointer">
                                                    <User className="mr-2 h-4 w-4" />
                                                    Profile
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            {/* Sign out option */}
                                            <DropdownMenuItem
                                                onClick={handleSignOut}
                                                className="cursor-pointer text-destructive focus:text-destructive"
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Sign Out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    /* Unauthenticated user - Sign In/Sign Up buttons */
                                    <>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm">
                                            <Link href="/signin">
                                                <span>Sign In</span>
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            size="sm">
                                            <Link href="/signup">
                                                <span>Sign Up</span>
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
