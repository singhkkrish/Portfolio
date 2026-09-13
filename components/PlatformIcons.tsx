export function LeetCodeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4 L7.5 12 L15 20" />
      <path d="M9.5 13.5 H18" />
    </svg>
  );
}

export function CodeChefIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 10c0-2.2 1.8-4 4-4s4 1.8 4 4" />
      <rect x="6" y="10" width="12" height="9" rx="2" />
      <path d="M10 14h4" />
    </svg>
  );
}