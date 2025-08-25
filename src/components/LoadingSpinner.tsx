import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
}

export function LoadingSpinner({ size = 24, text }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <Loader2
        className="animate-spin text-blue-600"
        size={size}
        strokeWidth={2}
      />
      {text && <span className="text-gray-600 text-sm">{text}</span>}
    </div>
  );
}
