
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, List, Smile, Check, ArrowRight } from "lucide-react";
import { generatePassword, evaluatePasswordStrength, applyLeetTransformations } from "@/lib/password-generator/utils";
import StrengthMeter from "./StrengthMeter";
import PasswordDisplay from "./PasswordDisplay";
import EmojiDisplay from "./EmojiDisplay";
import PasswordInfo from "./PasswordInfo";

const PasswordGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<"word" | "emoji">("word");
  const [customPassword, setCustomPassword] = useState("");
  const [customPasswordStrength, setCustomPasswordStrength] = useState({
    score: 0,
    entropy: 0,
    timeToCrack: "0 seconds",
    strengthText: "Very Weak"
  });
  
  const [customStory, setCustomStory] = useState("");
  const [customTransformedPassword, setCustomTransformedPassword] = useState("");
  
  const [generatedPassword, setGeneratedPassword] = useState<{
    originalWords: string[];
    sentence: string;
    emojiSentence: string;
    transformedPassword: string;
    strength: {
      score: number;
      entropy: number;
      timeToCrack: string;
      strengthText: string;
    };
    stages: {
      stage1: string;
      stage2: string;
      stage3: string;
      stage4: string;
    };
  } | null>(null);

  const handleGeneratePassword = async () => {
    setIsGenerating(true);
    
    // Small delay to show loading state
    setTimeout(() => {
      const newPassword = generatePassword();
      setGeneratedPassword(newPassword);
      setIsGenerating(false);
    }, 600);
  };
  
  const handleCheckStrength = () => {
    if (customPassword.trim() === "") return;
    
    const strength = evaluatePasswordStrength(customPassword);
    setCustomPasswordStrength(strength);
  };
  
  const handleCustomStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomStory(e.target.value);
    // Apply leet transformations to the custom story
    const transformed = applyLeetTransformations(e.target.value);
    setCustomTransformedPassword(transformed);
  };
  
  useEffect(() => {
    // Generate a password on first load
    handleGeneratePassword();
    
    // Cleanup function for security reasons
    return () => {
      setGeneratedPassword(null);
      setCustomPassword("");
      setCustomStory("");
      setCustomTransformedPassword("");
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-none shadow-lg bg-gradient-to-br from-slate-900 to-slate-800">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold text-center">
            MemoPass Generator
          </CardTitle>
          <CardDescription className="text-center text-slate-400">
            Generate memorable yet strong passwords with mnemonic stories
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="generate">Generate Password</TabsTrigger>
              <TabsTrigger value="check">Check Strength</TabsTrigger>
            </TabsList>
            
            {/* Generate Password Tab */}
            <TabsContent value="generate" className="space-y-4">
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <TabsList className="h-9">
                    <TabsTrigger 
                      value="word"
                      onClick={() => setMode("word")}
                      className={mode === "word" ? "bg-primary" : ""}
                    >
                      <List className="h-4 w-4 mr-2" />
                      Word Mode
                    </TabsTrigger>
                    <TabsTrigger 
                      value="emoji"
                      onClick={() => setMode("emoji")}
                      className={mode === "emoji" ? "bg-primary" : ""}
                    >
                      <Smile className="h-4 w-4 mr-2" />
                      Emoji Mode
                    </TabsTrigger>
                  </TabsList>
                  
                  <Button 
                    className="ml-auto" 
                    onClick={handleGeneratePassword}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
                
                {generatedPassword && (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-4">
                        <PasswordDisplay 
                          password={generatedPassword.sentence} 
                          title="Story Password (Original)" 
                        />
                        <Textarea 
                          placeholder="Type your own story here to customize"
                          value={customStory}
                          onChange={handleCustomStoryChange}
                          className="h-24"
                        />
                      </div>
                      <div>
                        <PasswordDisplay 
                          password={customStory ? customTransformedPassword : generatedPassword.transformedPassword} 
                          title="Final Password (With Transformations)" 
                        />
                      </div>
                    </div>
                    
                    {mode === "emoji" && (
                      <EmojiDisplay emojis={generatedPassword.emojiSentence} />
                    )}
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <PasswordInfo 
                        entropy={customStory ? evaluatePasswordStrength(customTransformedPassword).entropy : generatedPassword.strength.entropy} 
                        timeToCrack={customStory ? evaluatePasswordStrength(customTransformedPassword).timeToCrack : generatedPassword.strength.timeToCrack} 
                      />
                      <div>
                        <StrengthMeter 
                          score={customStory ? evaluatePasswordStrength(customTransformedPassword).score : generatedPassword.strength.score} 
                          strengthText={customStory ? evaluatePasswordStrength(customTransformedPassword).strengthText : generatedPassword.strength.strengthText}
                        />
                      </div>
                    </div>

                    {/* Algorithm Process Display */}
                    <Card className="mt-4">
                      <div className="bg-secondary px-4 py-2">
                        <h3 className="font-medium text-sm">Algorithm Process</h3>
                      </div>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center text-xs">
                          <span className="inline-block w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mr-2">1</span>
                          <p>{generatedPassword.stages.stage1}</p>
                        </div>
                        <div className="flex items-center text-xs">
                          <span className="inline-block w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mr-2">2</span>
                          <p>{generatedPassword.stages.stage2}</p>
                        </div>
                        <div className="flex items-center text-xs">
                          <span className="inline-block w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mr-2">3</span>
                          <p>{generatedPassword.stages.stage3}</p>
                        </div>
                        <div className="flex items-center text-xs">
                          <span className="inline-block w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mr-2">4</span>
                          <p>{generatedPassword.stages.stage4}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </TabsContent>
            
            {/* Check Strength Tab */}
            <TabsContent value="check" className="space-y-4">
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter a password to check its strength"
                    value={customPassword}
                    onChange={(e) => setCustomPassword(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleCheckStrength}>
                    <Check className="h-4 w-4 mr-2" />
                    Check
                  </Button>
                </div>
                
                {customPassword && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <PasswordInfo 
                      entropy={customPasswordStrength.entropy} 
                      timeToCrack={customPasswordStrength.timeToCrack} 
                    />
                    <div>
                      <StrengthMeter 
                        score={customPasswordStrength.score} 
                        strengthText={customPasswordStrength.strengthText}
                      />
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGenerator;
