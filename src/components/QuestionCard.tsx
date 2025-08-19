import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Question, importanceLabels, flexibilityLabels } from "@/data/assessmentQuestions";

interface QuestionCardProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  importanceValue: number;
  flexibilityValue: number;
  onImportanceChange: (value: number) => void;
  onFlexibilityChange: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const RatingScale = ({ 
  title, 
  value, 
  onChange, 
  labels, 
  color 
}: { 
  title: string; 
  value: number; 
  onChange: (value: number) => void; 
  labels: string[];
  color: string;
}) => {
  const getSelectedClasses = (color: string) => {
    if (color === 'primary') {
      return 'bg-primary border-primary text-white shadow-romantic';
    }
    if (color === 'success') {
      return 'bg-success border-success text-white shadow-romantic';
    }
    return 'bg-primary border-primary text-white shadow-romantic';
  };

  const getDotClasses = (color: string) => {
    if (color === 'primary') {
      return 'bg-primary';
    }
    if (color === 'success') {
      return 'bg-success';
    }
    return 'bg-primary';
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-lg text-foreground font-playfair">{title}</h4>
      <div className="space-y-2">
        {labels.map((label, index) => (
          <button
            key={index}
            onClick={() => onChange(index + 1)}
            className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 shadow-soft relative overflow-hidden ${
              value === index + 1
                ? getSelectedClasses(color)
                : 'gradient-pearl border-border hover:border-primary hover:shadow-soft'
            }`}
          >
            {value === index + 1 && (
              <div className="absolute top-1 right-1 text-xs opacity-50">✨</div>
            )}
            <div className="flex items-center justify-between">
              <span className="font-medium">{index + 1}. {label}</span>
              <div className={`w-6 h-6 rounded-full border-2 ${
                value === index + 1 
                  ? 'bg-white border-white' 
                  : 'border-muted-foreground'
              }`}>
                {value === index + 1 && (
                  <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${getDotClasses(color)}`} />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const QuestionCard = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  importanceValue,
  flexibilityValue,
  onImportanceChange,
  onFlexibilityChange,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}: QuestionCardProps) => {
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const bothAnswered = importanceValue > 0 && flexibilityValue > 0;

  // Auto-advance when both ratings are selected
  const handleImportanceChange = (value: number) => {
    onImportanceChange(value);
    // Auto-advance if flexibility is already selected
    if (flexibilityValue > 0) {
      setTimeout(() => {
        onNext();
      }, 500); // Small delay for user feedback
    }
  };

  const handleFlexibilityChange = (value: number) => {
    onFlexibilityChange(value);
    // Auto-advance if importance is already selected
    if (importanceValue > 0) {
      setTimeout(() => {
        onNext();
      }, 500); // Small delay for user feedback
    }
  };

  return (
    <div className="min-h-screen gradient-romantic p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <div className="mb-3 text-4xl opacity-60">💌</div>
            <h2 className="text-2xl font-bold text-white mb-2 font-playfair">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </h2>
            <p className="text-white/90 font-medium font-dancing text-lg">{question.category}</p>
          </div>
          <div className="bg-white/20 rounded-full p-1">
            <Progress value={progressPercentage} className="h-3" />
          </div>
          <p className="text-sm text-white/80 text-center mt-2">
            {Math.round(progressPercentage)}% Complete
          </p>
        </div>

        {/* Question Card */}
        <Card className="shadow-romantic gradient-pearl mb-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-3xl opacity-10">🌹</div>
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed font-playfair">
              {question.question}
            </CardTitle>
            {question.explanation && (
              <p className="text-muted-foreground mt-2">
                {question.explanation}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Importance Rating */}
              <RatingScale
                title="Importance to Me"
                value={importanceValue}
                onChange={handleImportanceChange}
                labels={importanceLabels}
                color="primary"
              />

              {/* Flexibility Rating */}
              <RatingScale
                title="My Flexibility Level"
                value={flexibilityValue}
                onChange={handleFlexibilityChange}
                labels={flexibilityLabels}
                color="success"
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/50">
              <Button
                onClick={onPrevious}
                disabled={!canGoPrevious}
                variant="outline"
                className="flex items-center gap-2 shadow-soft"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="text-center">
                {!bothAnswered && (
                  <p className="text-sm text-warning font-medium">
                    Select both ratings - we'll auto-advance ✨
                  </p>
                )}
                {bothAnswered && (
                  <p className="text-sm text-success font-medium">
                    Auto-advancing to next question... 🌟
                  </p>
                )}
              </div>

              <Button
                onClick={onNext}
                disabled={!bothAnswered}
                className={`flex items-center gap-2 shadow-romantic ${
                  bothAnswered ? 'gradient-hero' : ''
                }`}
              >
                {currentQuestionIndex === totalQuestions - 1 ? 'Complete Assessment 💕' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionCard;