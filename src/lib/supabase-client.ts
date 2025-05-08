import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface DocumentData {
  id?: string
  firstName: string
  lastName: string
  birthDate: string
  address: string
  signatureUrl?: string
  createdAt?: string
  eventId?: string
}

export interface DocumentRequest {
  id?: string
  eventId: string
  recipientEmail: string
  recipientName: string
  status: "pending" | "viewed" | "completed" | "expired"
  uniqueLinkId: string
  documentData?: DocumentData
  signatureUrl?: string
  createdAt?: string
  updatedAt?: string
  completedAt?: string
}

export async function saveDocument(documentData: DocumentData) {
  const { data, error } = await supabase
    .from("documents")
    .insert([documentData])
    .select()

  if (error) {
    throw new Error(`Error saving document: ${error.message}`)
  }

  return data?.[0]
}

export async function uploadSignature(
  signatureData: string,
  fileName: string
) {
  // Convert base64 to blob
  const base64Response = await fetch(signatureData)
  const blob = await base64Response.blob()

  const { error } = await supabase.storage
    .from("signatures")
    .upload(fileName, blob, {
      contentType: "image/png",
      upsert: true,
    })

  if (error) {
    throw new Error(`Error uploading signature: ${error.message}`)
  }

  const { data: urlData } = supabase.storage
    .from("signatures")
    .getPublicUrl(fileName)

  return urlData.publicUrl
}

// Créer une nouvelle demande de signature
export async function createDocumentRequest(request: Omit<DocumentRequest, "id" | "createdAt" | "updatedAt">) {
  const { data, error } = await supabase
    .from("document_requests")
    .insert([request])
    .select()

  if (error) {
    throw new Error(`Error creating document request: ${error.message}`)
  }

  return data?.[0]
}

// Mettre à jour le statut d'une demande
export async function updateDocumentRequestStatus(uniqueLinkId: string, status: DocumentRequest["status"]) {
  const updates: Partial<DocumentRequest> = {
    status,
    updatedAt: new Date().toISOString(),
  }
  
  // Si le statut est "completed", ajouter la date de complétion
  if (status === "completed") {
    updates.completedAt = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from("document_requests")
    .update(updates)
    .eq("unique_link_id", uniqueLinkId)
    .select()

  if (error) {
    throw new Error(`Error updating document request: ${error.message}`)
  }

  return data?.[0]
}

// Obtenir une demande par son ID unique
export async function getDocumentRequestByLinkId(uniqueLinkId: string) {
  const { data, error } = await supabase
    .from("document_requests")
    .select("*")
    .eq("unique_link_id", uniqueLinkId)
    .single()

  if (error) {
    throw new Error(`Error fetching document request: ${error.message}`)
  }

  return data
}

// Obtenir toutes les demandes pour un événement
export async function getDocumentRequestsByEvent(eventId: string) {
  const { data, error } = await supabase
    .from("document_requests")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(`Error fetching document requests: ${error.message}`)
  }

  return data || []
}

// Obtenir des statistiques sur les demandes pour un événement
export async function getDocumentRequestStats(eventId: string) {
  const requests = await getDocumentRequestsByEvent(eventId)
  
  return {
    total: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    viewed: requests.filter(r => r.status === "viewed").length,
    completed: requests.filter(r => r.status === "completed").length,
    expired: requests.filter(r => r.status === "expired").length,
  }
}

// Obtenir tous les événements
export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false })

  if (error) {
    throw new Error(`Error fetching events: ${error.message}`)
  }

  return data || []
}
