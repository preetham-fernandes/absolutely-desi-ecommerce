"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // In a real application, you would send a password reset email here
    console.log(values)
    setTimeout(() => {
      setIsLoading(false)
      setSubmittedEmail(values.email)
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        {!isSubmitted ? (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Forgot password</CardTitle>
              <CardDescription>
                Enter your email address and we&apos;ll send you a link to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
              <CardDescription>We&apos;ve sent a password reset link to {submittedEmail}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <p className="text-center text-sm text-muted-foreground">
                Please check your email inbox and click on the provided link to reset your password. If you don&apos;t
                receive an email within a few minutes, check your spam folder.
              </p>
            </CardContent>
          </>
        )}
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            <Link href="/login" className="underline text-primary">
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
