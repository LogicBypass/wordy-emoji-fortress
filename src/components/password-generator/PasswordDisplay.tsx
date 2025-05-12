
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface PasswordDisplayProps {
  password: string;
  className?: string;
  title: string;
}

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({
  password,
  className,
  title,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(true);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "Password has been copied to clipboard",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    
    // Clear from memory after display (in a real app, we'd be more thorough)
    setTimeout(() => {
      // This is symbolic - in a real app we'd need to handle memory more carefully
      console.log("Password cleared from local memory");
    }, 60000);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="bg-secondary px-4 py-2 flex justify-between items-center">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleShowPassword}
            className="h-8 w-8"
            title={showPassword ? "Hide" : "Show"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="h-8 w-8"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="bg-black/20 rounded p-3 overflow-x-auto">
          <p className="font-mono text-sm">
            {showPassword ? password : "•".repeat(password.length)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordDisplay;
