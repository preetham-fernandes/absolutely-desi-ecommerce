"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  otp: z.string().length(6, {
    message: "OTP must be 6 digits.",
  }),
})

export default function OtpVerificationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // In a real application, you would verify the OTP here
    console.log(values)
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to login page after successful verification
      window.location.href = "/login"
    }, 1000)
  }

  function handleResendOtp() {
    setResendDisabled(true)
    setCountdown(30)

    // In a real application, you would resend the OTP here
    console.log("Resending OTP...")

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
