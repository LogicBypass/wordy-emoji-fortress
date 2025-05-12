
import { cn } from "@/lib/utils";

interface StrengthMeterProps {
  score: number;
  strengthText: string;
  className?: string;
}

const StrengthMeter = ({ score, strengthText, className }: StrengthMeterProps) => {
  const getColor = () => {
    if (score >= 3.5) return "bg-green-500";
    if (score >= 3) return "bg-green-400";
    if (score >= 2.5) return "bg-yellow-400";
    if (score >= 2) return "bg-yellow-500";
    if (score >= 1.5) return "bg-orange-500";
    if (score >= 1) return "bg-red-400";
    return "bg-red-500";
  };

  const getWidth = () => {
    return `${Math.min(100, Math.max(10, score * 25))}%`;
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Password Strength</span>
        <span className="text-sm font-medium">{strengthText}</span>
      </div>
      <div className="password-strength-meter">
        <div
          className={cn("password-strength-meter-fill", getColor())}
          style={{ width: getWidth() }}
        />
      </div>
    </div>
  );
};

export default StrengthMeter;
