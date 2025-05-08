"use client"

import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

import { getDocumentRequestsByEvent, getDocumentRequestStats, DocumentRequest } from "@/lib/supabase-client"

export default function DocumentRequestsPage() {
  const t = useTranslations("DocumentRequests")
  const [requests, setRequests] = useState<DocumentRequest[]>([])
  const [stats, setStats] = useState<{
    total: number
    pending: number
    viewed: number
    completed: number
    expired: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEventId, setSelectedEventId] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedEventId) return
      
      setLoading(true)
      setError(null)
      
      try {
        const [requestsData, statsData] = await Promise.all([
          getDocumentRequestsByEvent(selectedEventId),
          getDocumentRequestStats(selectedEventId)
        ])
        
        setRequests(requestsData)
        setStats(statsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue")
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [selectedEventId])

  const getStatusBadgeClass = (status: DocumentRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "viewed":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
      
      {/* Sélecteur d'événement */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          {t("selectEvent")}
        </label>
        <select
          className="w-full max-w-md p-2 border border-border rounded-md bg-muted"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          <option value="">{t("selectEventPlaceholder")}</option>
          {/* Liste des événements à remplir dynamiquement */}
        </select>
      </div>
      
      {/* Statistiques */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-muted p-4 rounded-md">
            <div className="text-sm text-muted-foreground">{t("total")}</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-md">
            <div className="text-sm text-yellow-800">{t("pending")}</div>
            <div className="text-2xl font-bold text-yellow-800">{stats.pending}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-md">
            <div className="text-sm text-blue-800">{t("viewed")}</div>
            <div className="text-2xl font-bold text-blue-800">{stats.viewed}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-md">
            <div className="text-sm text-green-800">{t("completed")}</div>
            <div className="text-2xl font-bold text-green-800">{stats.completed}</div>
          </div>
          <div className="bg-red-50 p-4 rounded-md">
            <div className="text-sm text-red-800">{t("expired")}</div>
            <div className="text-2xl font-bold text-red-800">{stats.expired}</div>
          </div>
        </div>
      )}
      
      {/* Liste des demandes */}
      {loading ? (
        <div className="text-center py-8">{t("loading")}</div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {error}
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {t("noRequests")}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="px-4 py-3 text-left">{t("recipient")}</th>
                <th className="px-4 py-3 text-left">{t("email")}</th>
                <th className="px-4 py-3 text-left">{t("status")}</th>
                <th className="px-4 py-3 text-left">{t("created")}</th>
                <th className="px-4 py-3 text-left">{t("completedDate")}</th>
                <th className="px-4 py-3 text-left">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-b border-border">
                  <td className="px-4 py-3">{request.recipientName}</td>
                  <td className="px-4 py-3">{request.recipientEmail}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(request.status)}`}>
                      {t(request.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(request.createdAt!).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {request.completedAt 
                      ? new Date(request.completedAt).toLocaleDateString() 
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-sm text-primary hover:underline">
                      {t("view")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
