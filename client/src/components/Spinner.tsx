interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <span className={`relative flex h-16 w-16 items-center justify-center ${className ?? ""}`}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/30" />
      <span className="relative inline-flex h-12 w-12 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-500" />
    </span>
  );
};

export default Spinner;
