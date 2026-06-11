export default function DiamondDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-2 ${className}`} aria-hidden="true">
      <div className="h-px w-24 bg-gold" />
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        className="mx-3 fill-gold flex-shrink-0"
      >
        <rect x="6" y="0" width="8.485" height="8.485" transform="rotate(45 6 6)" />
      </svg>
      <div className="h-px w-24 bg-gold" />
    </div>
  )
}
