'use client'

import { GalleryVerticalEnd } from 'lucide-react'
import { useState } from 'react'

import { signIn } from '@/client/auth-client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function SignIn() {
  const [loading, setLoading] = useState(false)
  const [callbackURL] = useState(() => {
    // Extract the 'back' or 'redirect' parameter from the URL
    // Guard against SSR where window is not available
    if (typeof window === 'undefined') {
      return '/'
    }
    const urlParams = new URLSearchParams(window.location.search)
    const redirectParam = urlParams.get('redirect')
    return redirectParam || '/'
  })

  const handleGoogleSignIn = async () => {
    await signIn.social(
      {
        provider: 'github',
        callbackURL,
      },
      {
        onRequest: () => {
          setLoading(true)
        },
        onResponse: () => {
          setLoading(false)
        },
      },
    )
  }

  return (
    <div className={cn('flex flex-col items-center gap-6 w-full max-w-md')}>
      {/* Company Logo/Name */}
      <div className="flex items-center gap-2 self-center font-medium">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        Monorepo scaffold
      </div>

      {/* Sign In Card */}
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div
              className={cn(
                'w-full gap-2 flex items-center',
                'justify-between flex-col',
              )}
            >
              <Button
                variant="outline"
                className={cn('w-full gap-2')}
                disabled={loading}
                onClick={handleGoogleSignIn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
                  />
                </svg>
                Sign in with GitHub
              </Button>
            </div>

            {/* Sign up link */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms of Service Text */}
      <div className="text-balance text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  )
}
