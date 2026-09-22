export default function Loading() {
  return (
    <div className="bg-paper min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="h-8 bg-stone-200 rounded w-32 mb-4"></div>
        <div className="h-4 bg-stone-200 rounded w-48"></div>
      </div>
    </div>
  )
}