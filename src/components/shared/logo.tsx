import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-8 grid-cols-3 grid-rows-3 gap-0.5 rounded-md border border-black/15 bg-[#f4efe7] p-1 shadow-sm',
        className
      )}
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            'rounded-[2px] bg-[#151515]',
            index === 4 && 'bg-[#1c9b7a]',
            index === 8 && 'bg-[#e06425]'
          )}
        />
      ))}
    </span>
  );
}
