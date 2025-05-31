export default function Loading() {
  return (
    <div className="pt-16 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="h-8 bg-neutral-200 rounded w-32 mb-4"></div>
        <div className="h-4 bg-neutral-200 rounded w-48"></div>
      </div>
    </div>
  )
}