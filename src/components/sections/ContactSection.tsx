"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ContactFormValues } from "@/types";
import { useGsapReveal } from "@/hooks/useGsapReveal";

const contactSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please enter a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

function ContactConfirmation() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-4 py-16 text-center"
    >
      <CheckCircle className="size-12 text-emerald-400" aria-hidden="true" />
      <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
      <p className="text-muted-foreground">
        Thanks — I&apos;ll get back to you within 1–2 days.
      </p>
      <p className="text-sm text-muted-foreground">
        You can also find me on{" "}
        <a
          href="https://linkedin.com/in/agun-awan"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded text-amber-400 underline underline-offset-4 hover:text-amber-300 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
        >
          LinkedIn
        </a>
        .
      </p>
    </div>
  );
}

export function ContactSection() {
  const sectionRef = useGsapReveal<HTMLElement>({ start: "top 80%" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { formState } = form;

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError(null);
    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        ...data,
      }).toString();
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!response.ok) {
        throw new Error(`Submission failed: ${response.status}`);
      }
      setIsSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or email me directly.",
      );
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="px-6 py-20 lg:px-12">
      <div className="max-w-2xl">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Contact"
          description="Have a project in mind or want to discuss an opportunity? I'd love to hear from you."
          id="contact-heading"
        />

        {isSubmitted ? (
          <ContactConfirmation />
        ) : (
          <Form {...form}>
            <form
              name="contact"
              method="POST"
              action="/#contact"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={form.handleSubmit(onSubmit)}
              aria-labelledby="contact-heading"
              noValidate
            >
              {/* Required by Netlify Forms for JS fetch submissions */}
              <input type="hidden" name="form-name" value="contact" />

              {/* Honeypot — hidden from real users, bots fill this in */}
              <p className="hidden" aria-hidden="true">
                <label>
                  Don&apos;t fill this out:{" "}
                  <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          autoComplete="name"
                          aria-required="true"
                          className="focus-visible:ring-amber-400 aria-invalid:border-destructive"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          autoComplete="email"
                          aria-required="true"
                          className="focus-visible:ring-amber-400 aria-invalid:border-destructive"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What's this about?"
                          aria-required="true"
                          className="focus-visible:ring-amber-400 aria-invalid:border-destructive"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project or opportunity…"
                          rows={6}
                          aria-required="true"
                          className="focus-visible:ring-amber-400 aria-invalid:border-destructive"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {submitError && (
                  <p role="alert" className="text-sm text-destructive">
                    {submitError}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="w-full bg-amber-400 text-black hover:bg-amber-500 focus-visible:ring-amber-400 focus-visible:ring-offset-background sm:w-auto"
                >
                  {formState.isSubmitting ? (
                    <>
                      <Loader2
                        className="mr-2 size-4 animate-spin"
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </section>
  );
}
