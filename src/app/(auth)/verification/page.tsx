// src/app/(auth)/verification/page.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner" // Make sure to install this package

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"

const formSchema = z.object({
  otp: z.string().length(6, {
    message: "OTP must be 6 digits.",
  }),
})

export default function OtpVerificationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [email, setEmail] = useState<string>("")
  const [developmentOtp, setDevelopmentOtp] = useState<string>("")
  const router = useRouter()
  const { verify } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  })

  useEffect(() => {
    // Get email from sessionStorage (set during registration)
    const storedEmail = sessionStorage.getItem('registrationEmail');
    const storedOtp = sessionStorage.getItem('registrationOtp');
    
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email found, redirect back to registration
      router.push('/register');
    }
    
    if (storedOtp) {
      setDevelopmentOtp(storedOtp);
    }
  }, [router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!email) {
      toast.error("Email not found. Please register again.");
      router.push('/register');
      return;
    }
    
    setIsLoading(true);
    try {
      await verify(email, values.otp);
      toast.success("Verification successful!");
      
      // Clear sessionStorage
      sessionStorage.removeItem('registrationEmail');
      sessionStorage.removeItem('registrationOtp');
      
      // Redirect to dashboard
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Verification failed");
    } finally {
      setIsLoading(false);
    }
  }

  function handleResendOtp() {
    setResendDisabled(true)
    setCountdown(30)

    // In a real application, you would resend the OTP here
    toast.info("OTP resent! (This is a development message)");

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setResendDisabled(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Verify your mobile number</CardTitle>
          <CardDescription>
            We&apos;ve sent a 6-digit code to your mobile number. Please enter it below.
          </CardDescription>
          {developmentOtp && (
  <div className="p-2 bg-amber-100 text-amber-800 rounded-md mt-2 text-sm flex justify-between items-center">
    <p><strong>Development Mode:</strong> Use this OTP: {developmentOtp}</p>
    <Button 
      variant="outline" 
      size="sm" 
      onClick={() => {
        navigator.clipboard.writeText(developmentOtp);
        toast.success("OTP copied to clipboard");
      }}
    >
      Copy
    </Button>
  </div>
)}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            Didn&apos;t receive the code?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={handleResendOtp}
              disabled={resendDisabled}
            >
              {resendDisabled ? `Resend OTP in ${countdown}s` : "Resend OTP"}
            </Button>
          </div>
          <div className="text-sm text-center">
            <Link href="/register" className="underline text-primary">
              Go back to registration
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}