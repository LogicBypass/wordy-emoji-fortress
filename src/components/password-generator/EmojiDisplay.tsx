
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmojiDisplayProps {
  emojis: string;
  className?: string;
}

const EmojiDisplay: React.FC<EmojiDisplayProps> = ({ emojis, className }) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="bg-secondary px-4 py-2">
        <h3 className="font-medium text-sm">Emoji Visualization</h3>
      </div>
      <CardContent className="p-4">
        <div className="bg-black/20 rounded p-3 flex items-center justify-center">
          <p className="text-2xl">{emojis}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmojiDisplay;
