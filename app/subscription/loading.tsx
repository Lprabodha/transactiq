import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container px-4 py-6 md:max-w-4xl md:py-10">
        <div className="mb-6 md:mb-8">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Progress Steps Skeleton */}
          <div className="relative mb-6 md:mb-8">
            <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted"></div>
            <div className="relative z-10 flex justify-between">
              <div className="flex items-center justify-center">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <div className="flex items-center justify-center">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>

          {/* Plan Selection Skeleton */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <Skeleton className="h-6 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <Skeleton className="h-10 w-full" />

            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}

            <div className="flex justify-end pt-2">
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

