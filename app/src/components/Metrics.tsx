type RingProps = { value: number; size?: number; stroke?: number; label?: string; sub?: string }

export function Ring({ value, size = 120, stroke = 10, label, sub }: RingProps) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, value))
  const dash = c * pct
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} className="ring-track" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="ring-value"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${dash} ${c - dash}`}
          strokeDashoffset={0}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="ring-center">
        <strong>{label ?? `${Math.round(pct * 100)}%`}</strong>
        {sub && <span>{sub}</span>}
      </div>
    </div>
  )
}

export function Bar({ value, tone = 'primary' }: { value: number; tone?: 'primary' | 'govt' | 'tech' | 'accent' }) {
  const pct = Math.max(0, Math.min(1, value))
  return (
    <div className="bar">
      <div className={`bar-fill tone-${tone}`} style={{ width: `${pct * 100}%` }} />
    </div>
  )
}
