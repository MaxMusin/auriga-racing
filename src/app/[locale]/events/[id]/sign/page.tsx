"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { DocumentForm, DocumentFormValues } from "@/components/DocumentForm"
import { SignatureCanvas } from "@/components/SignatureCanvas"
import { Button } from "@/components/ui/button"
import { DocumentData, saveDocument, uploadSignature } from "@/lib/supabase-client"

enum Step {
  FORM,
  SIGNATURE,
  CONFIRMATION,
}

export default function SignDocumentPage() {
  const t = useTranslations("SignDocument")
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string
  
  const [step, setStep] = useState<Step>(Step.FORM)
  const [formData, setFormData] = useState<DocumentFormValues | null>(null)
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFormSubmit = (values: DocumentFormValues) => {
    setFormData(values)
    setStep(Step.SIGNATURE)
  }

  const handleSignatureSave = async (signatureData: string) => {
    try {
      const fileName = `${eventId}/${uuidv4()}.png`
      const url = await uploadSignature(signatureData, fileName)
      setSignatureUrl(url)
      setStep(Step.CONFIRMATION)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    }
  }

  const handleFinalSubmit = async () => {
    if (!formData || !signatureUrl) return

    setIsSubmitting(true)
    setError(null)

    try {
      const documentData: DocumentData = {
        ...formData,
        signatureUrl,
        eventId,
      }

      await saveDocument(documentData)
      
      // Redirect to thank you page or event page
      router.push(`/${params.locale}/events/${eventId}?signed=true`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    if (step === Step.SIGNATURE) {
      setStep(Step.FORM)
    } else if (step === Step.CONFIRMATION) {
      setStep(Step.SIGNATURE)
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
      
      {step === Step.FORM && (
        <DocumentForm onSubmit={handleFormSubmit} defaultValues={formData || undefined} />
      )}
      
      {step === Step.SIGNATURE && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">{t("signatureTitle")}</h2>
          <SignatureCanvas onSave={handleSignatureSave} />
          <Button variant="outline" onClick={handleBack}>
            {t("back")}
          </Button>
        </div>
      )}
      
      {step === Step.CONFIRMATION && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">{t("confirmationTitle")}</h2>
          
          <div className="bg-muted p-6 rounded-md space-y-4">
            <div>
              <h3 className="font-medium">{t("personalInfo")}</h3>
              <p>{formData?.lastName} {formData?.firstName}</p>
              <p>{t("birthDate")}: {formData?.birthDate}</p>
              <p>{t("address")}: {formData?.address}</p>
            </div>
            
            <div>
              <h3 className="font-medium">{t("signature")}</h3>
              {signatureUrl && (
                <div className="max-h-32 border border-border rounded-md p-2 bg-white relative h-32 w-full">
                  <Image 
                    src={signatureUrl} 
                    alt={t("signature")} 
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
              {t("back")}
            </Button>
            <Button onClick={handleFinalSubmit} disabled={isSubmitting}>
              {isSubmitting ? t("submitting") : t("confirm")}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
