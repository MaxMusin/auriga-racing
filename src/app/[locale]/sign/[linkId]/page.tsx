"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

import { DocumentForm, DocumentFormValues } from "@/components/DocumentForm"
import { SignatureCanvas } from "@/components/SignatureCanvas"
import { Button } from "@/components/ui/button"
import { 
  getDocumentRequestByLinkId, 
  updateDocumentRequestStatus,
  uploadSignature,
  DocumentRequest
} from "@/lib/supabase-client"

enum Step {
  LOADING,
  ERROR,
  FORM,
  SIGNATURE,
  CONFIRMATION,
  COMPLETED,
}

export default function SignDocumentByLinkPage() {
  const t = useTranslations("SignDocument")
  const params = useParams()
  const linkId = params.linkId as string
  
  const [step, setStep] = useState<Step>(Step.LOADING)
  const [request, setRequest] = useState<DocumentRequest | null>(null)
  const [formData, setFormData] = useState<DocumentFormValues | null>(null)
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await getDocumentRequestByLinkId(linkId)
        setRequest(data)
        
        // Mettre à jour le statut à "viewed" si c'est "pending"
        if (data.status === "pending") {
          await updateDocumentRequestStatus(linkId, "viewed")
        }
        
        // Si déjà complété, afficher la page de confirmation
        if (data.status === "completed") {
          setStep(Step.COMPLETED)
        } else if (data.status === "expired") {
          setError(t("documentExpired"))
          setStep(Step.ERROR)
        } else {
          setStep(Step.FORM)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue")
        setStep(Step.ERROR)
      }
    }
    
    fetchRequest()
  }, [linkId, t])

  const handleFormSubmit = (values: DocumentFormValues) => {
    setFormData(values)
    setStep(Step.SIGNATURE)
  }

  const handleSignatureSave = async (signatureData: string) => {
    try {
      const fileName = `${request?.eventId}/${linkId}.png`
      const url = await uploadSignature(signatureData, fileName)
      setSignatureUrl(url)
      setStep(Step.CONFIRMATION)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    }
  }

  const handleFinalSubmit = async () => {
    if (!formData || !signatureUrl || !request) return

    setIsSubmitting(true)
    setError(null)

    try {
      // Mettre à jour la demande avec les informations du formulaire et la signature
      await updateDocumentRequestStatus(linkId, "completed")
      
      setStep(Step.COMPLETED)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
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

  if (step === Step.LOADING) {
    return (
      <div className="container max-w-2xl py-12 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>{t("loading")}</p>
      </div>
    )
  }

  if (step === Step.ERROR) {
    return (
      <div className="container max-w-2xl py-12">
        <h1 className="text-3xl font-bold mb-8">{t("error")}</h1>
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
          {error || t("genericError")}
        </div>
      </div>
    )
  }

  if (step === Step.COMPLETED) {
    return (
      <div className="container max-w-2xl py-12">
        <h1 className="text-3xl font-bold mb-8">{t("completed")}</h1>
        <div className="bg-green-50 text-green-800 p-6 rounded-md mb-6">
          <p className="text-lg mb-4">{t("documentSigned")}</p>
          <p>{t("thankYou")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl py-12">
      <h1 className="text-3xl font-bold mb-8">
        {request?.recipientName ? t("welcomeUser", { name: request.recipientName }) : t("title")}
      </h1>
      
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
