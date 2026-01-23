import { cn } from '@/lib/utils';

interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'layered' | 'angular' | 'dots';
  flip?: boolean;
  className?: string;
  fillClassName?: string;
}

const SectionDivider = ({ 
  variant = 'wave', 
  flip = false, 
  className,
  fillClassName = 'fill-secondary/30'
}: SectionDividerProps) => {
  const baseClasses = cn(
    'w-full overflow-hidden leading-none',
    flip && 'rotate-180',
    className
  );

  const svgClasses = 'w-full h-auto block';

  switch (variant) {
    case 'wave':
      return (
        <div className={baseClasses}>
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className={cn(svgClasses, 'h-12 md:h-16 lg:h-20')}
          >
            <path 
              d="M0,0 C150,60 350,0 600,50 C850,100 1050,30 1200,80 L1200,120 L0,120 Z" 
              className={fillClassName}
            />
          </svg>
        </div>
      );

    case 'curve':
      return (
        <div className={baseClasses}>
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className={cn(svgClasses, 'h-10 md:h-14 lg:h-16')}
          >
            <path 
              d="M0,80 Q600,0 1200,80 L1200,120 L0,120 Z" 
              className={fillClassName}
            />
          </svg>
        </div>
      );

    case 'layered':
      return (
        <div className={baseClasses}>
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className={cn(svgClasses, 'h-14 md:h-20 lg:h-24')}
          >
            {/* Background layer */}
            <path 
              d="M0,40 C300,100 600,0 900,60 C1050,90 1150,70 1200,50 L1200,120 L0,120 Z" 
              className="fill-gold/5"
            />
            {/* Middle layer */}
            <path 
              d="M0,60 C200,20 400,80 600,40 C800,0 1000,60 1200,30 L1200,120 L0,120 Z" 
              className="fill-muted/30"
            />
            {/* Front layer */}
            <path 
              d="M0,80 C300,50 600,100 900,70 C1100,50 1200,80 1200,80 L1200,120 L0,120 Z" 
              className={fillClassName}
            />
          </svg>
        </div>
      );

    case 'angular':
      return (
        <div className={baseClasses}>
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className={cn(svgClasses, 'h-8 md:h-12 lg:h-16')}
          >
            <path 
              d="M0,120 L0,60 L1200,0 L1200,120 Z" 
              className={fillClassName}
            />
          </svg>
        </div>
      );

    case 'dots':
      return (
        <div className={cn(baseClasses, 'py-6 md:py-8')}>
          <div className="flex justify-center items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gold/40" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="w-3 h-3 rounded-full bg-gold/60" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-gold/40" />
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default SectionDivider;
