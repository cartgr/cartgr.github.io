import Publications from '../../components/Publications'

export default function PublicationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <main className="flex-1 max-w-[52rem] mx-auto p-4 min-w-0 w-full pb-12">
        <Publications />
      </main>
    </div>
  )
}
