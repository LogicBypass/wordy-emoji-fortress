
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PasswordInfoProps {
  entropy: number;
  timeToCrack: string;
  className?: string;
}

const PasswordInfo: React.FC<PasswordInfoProps> = ({
  entropy,
  timeToCrack,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="bg-secondary px-4 py-2">
        <h3 className="font-medium text-sm">Password Details</h3>
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Entropy:</span>
          <span className="text-sm font-medium">{entropy.toFixed(2)} bits</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">
            Est. brute-force time:
          </span>
          <span className="text-sm font-medium">{timeToCrack}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordInfo;
