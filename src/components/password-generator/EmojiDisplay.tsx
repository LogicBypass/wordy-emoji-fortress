
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmojiDisplayProps {
  emojis: string;
  className?: string;
  title?: string;
  showInfo?: boolean;
}

const EmojiDisplay: React.FC<EmojiDisplayProps> = ({ 
  emojis, 
  className,
  title = "Emoji Visualization",
  showInfo = true
}) => {
  if (!emojis || emojis.length === 0) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <div className="bg-secondary px-4 py-2 flex justify-between items-center">
          <h3 className="font-medium text-sm">{title}</h3>
          {showInfo && (
            <span className="text-xs text-muted-foreground">Visual memory aid</span>
          )}
        </div>
        <CardContent className="p-4">
          <div className="bg-black/20 rounded p-3 flex items-center justify-center min-h-14">
            <p className="text-sm text-muted-foreground">No emoji visualization available for custom story</p>
          </div>
          {showInfo && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Part of the 4-step algorithmic pipeline (Step 2: Mnemonic Story Builder)
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="bg-secondary px-4 py-2 flex justify-between items-center">
        <h3 className="font-medium text-sm">{title}</h3>
        {showInfo && (
          <span className="text-xs text-muted-foreground">Visual memory aid</span>
        )}
      </div>
      <CardContent className="p-4">
        <div className="bg-black/20 rounded p-3 flex items-center justify-center">
          <p className="text-4xl tracking-wider">{emojis}</p>
        </div>
        {showInfo && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Part of the 4-step algorithmic pipeline (Step 2: Mnemonic Story Builder)
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EmojiDisplay;
