"use client"

import { useTranslations } from "next-intl"
import { useRef, useState } from "react"
import SignaturePad from "react-signature-canvas"

import { Button } from "@/components/ui/button"

interface SignatureCanvasProps {
  onSave: (signatureData: string) => void
}

export function SignatureCanvas({ onSave }: SignatureCanvasProps) {
  const t = useTranslations("SignatureCanvas")
  const signatureRef = useRef<SignaturePad>(null)
  const [isEmpty, setIsEmpty] = useState(true)

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clear()
      setIsEmpty(true)
    }
  }

  const handleSave = () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const signatureData = signatureRef.current.toDataURL("image/png")
      onSave(signatureData)
    }
  }

  const handleBegin = () => {
    setIsEmpty(false)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="border border-border rounded-md p-2">
        <SignaturePad
          ref={signatureRef}
          canvasProps={{
            className: "w-full h-64 bg-muted",
          }}
          onBegin={handleBegin}
        />
      </div>
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          className="flex-1"
        >
          {t("clear")}
        </Button>
        <Button
          type="button"
          onClick={handleSave}
          disabled={isEmpty}
          className="flex-1"
        >
          {t("save")}
        </Button>
      </div>
    </div>
  )
}
