interface ShockwaveProps {
  count?: number;
  className?: string;
}

export function Shockwave({ count = 4, className = "" }: ShockwaveProps) {
  return (
    <div className={`shockwave ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span className="shockwave__ring" key={index} />
      ))}
    </div>
  );
}
