"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createDocumentRequest } from "@/lib/supabase-client"

const formSchema = z.object({
  eventId: z.string().min(1, { message: "Veuillez sélectionner un événement" }),
  recipientName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  recipientEmail: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function SendDocumentRequestPage() {
  const t = useTranslations("SendDocumentRequest")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventId: "",
      recipientName: "",
      recipientEmail: "",
      message: "",
    },
  })

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const uniqueLinkId = uuidv4()
      
      await createDocumentRequest({
        eventId: values.eventId,
        recipientName: values.recipientName,
        recipientEmail: values.recipientEmail,
        status: "pending",
        uniqueLinkId,
      })
      
      // Ici, vous pourriez appeler une API pour envoyer un email
      // avec le lien contenant uniqueLinkId
      
      setSuccess(true)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-2xl py-12">
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
      
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-800 p-4 rounded-md mb-6">
          {t("requestSent")}
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="eventId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("event")}</FormLabel>
                <FormControl>
                  <select
                    className="w-full p-2 border border-border rounded-md bg-muted"
                    {...field}
                  >
                    <option value="">{t("selectEvent")}</option>
                    {/* Liste des événements à remplir dynamiquement */}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="recipientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("recipientName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="recipientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("recipientEmail")}</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                <FormLabel>{t("message")}</FormLabel>
                <FormControl>
                  <textarea 
                    className="w-full p-2 border border-border rounded-md bg-muted"
                    rows={4}
                    placeholder={t("messagePlaceholder")}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("sending") : t("send")}
          </Button>
        </form>
      </Form>
    </div>
  )
}
