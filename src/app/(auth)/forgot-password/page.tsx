"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckCircle2, Mail, ArrowRight, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
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
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        {/* Logo or Brand */}
        <div className="text-center mb-8">
          <h1 className="text-tan text-3xl font-serif font-bold">ABSOLUTELY DESI</h1>
        </div>
        
        <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-8">
          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <h2 className="text-tan text-2xl font-bold">Forgot Password</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Enter your email address and we&apos;ll send you a link to reset your password
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="w-5 h-5 text-teal/70 absolute left-3 top-1/2 -translate-y-1/2" />
                            <Input 
                              placeholder="Enter your email" 
                              type="email" 
                              {...field} 
                              className="pl-10 pr-4 py-3 bg-zinc-900 border-zinc-800 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal text-white placeholder-gray-500" 
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-tan" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-tan text-black hover:opacity-90 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 mt-4" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                    {!isLoading && <ArrowRight className="w-5 h-5" />}
                  </Button>
                </form>
              </Form>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-tan text-2xl font-bold">Check your email</h2>
                <p className="text-gray-400 text-sm mt-1">
                  We&apos;ve sent a password reset link to {submittedEmail}
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center py-8">
                <div className="bg-teal/10 p-4 rounded-full mb-6">
                  <CheckCircle2 className="h-16 w-16 text-teal" />
                </div>
                <p className="text-center text-sm text-gray-400 max-w-sm">
                  Please check your email inbox and click on the provided link to reset your password. 
                  If you don&apos;t receive an email within a few minutes, check your spam folder.
                </p>
              </div>
            </>
          )}
          
          <div className="mt-6 pt-6 border-t border-zinc-800 flex justify-center">
            <Link 
              href="/login" 
              className="text-teal hover:text-tan transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </div>
        </div>
        
        {/* Footer - Optional */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Absolutely Desi. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}