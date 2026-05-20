import Publications from '../components/Publications'

export default function PublicationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 max-w-6xl mx-auto p-4 min-w-0 w-full pt-8">
        <Publications />
      </main>
    </div>
  )
}