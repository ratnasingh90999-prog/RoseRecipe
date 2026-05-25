export function ShimmerCard({ className = "" }: { className?: string }) {
  return <div className={`shimmer rounded-3xl ${className}`} />;
}

export function RecipeSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ShimmerCard key={i} className="h-64" />
      ))}
    </div>
  );
}