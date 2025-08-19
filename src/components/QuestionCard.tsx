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
  const isSelected = (index: number) => value === index + 1;
  const themeColor = color === 'primary' ? 'primary' : 'success';

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-foreground font-cormorant mb-2">{title}</h4>
      <div className="space-y-3">
        {labels.map((label, index) => (
          <button
            key={index}
            onClick={() => onChange(index + 1)}
            className={`rating-button ${isSelected(index) ? 'rating-button-selected' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                  isSelected(index) 
                    ? 'bg-white/20 border-white text-white' 
                    : `border-${themeColor}/30 text-${themeColor}`
                }`}>
                  {index + 1}
                </div>
                <span className={`font-medium ${isSelected(index) ? 'text-white' : 'text-foreground'}`}>
                  {label}
                </span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                isSelected(index) 
                  ? 'bg-white border-white' 
                  : 'border-border'
              }`}>
                {isSelected(index) && (
                  <div className={`w-2 h-2 rounded-full bg-${themeColor} mx-auto mt-0.5`} />
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
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Progress Header */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full gradient-romantic flex items-center justify-center mx-auto mb-6 shadow-premium">
              <span className="text-2xl text-white font-bold">{currentQuestionIndex + 1}</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3 font-cormorant">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </h1>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <p className="text-primary font-medium text-lg">{question.category}</p>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-secondary/50 rounded-full p-1 shadow-soft">
              <Progress value={progressPercentage} className="h-3" />
            </div>
            <p className="text-muted-foreground text-center mt-3 text-lg font-medium">
              {Math.round(progressPercentage)}% Complete
            </p>
          </div>
        </div>

        {/* Question Card */}
        <div className="card-premium p-10 mb-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground leading-relaxed font-cormorant mb-4">
              {question.question}
            </h2>
            {question.explanation && (
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {question.explanation}
              </p>
            )}
          </div>
          <div className="grid lg:grid-cols-2 gap-12 mb-10">
            {/* Importance Rating */}
            <div className="space-y-6">
              <RatingScale
                title="Importance to Me"
                value={importanceValue}
                onChange={handleImportanceChange}
                labels={importanceLabels}
                color="primary"
              />
            </div>

            {/* Flexibility Rating */}
            <div className="space-y-6">
              <RatingScale
                title="My Flexibility Level"
                value={flexibilityValue}
                onChange={handleFlexibilityChange}
                labels={flexibilityLabels}
                color="success"
              />
            </div>
          </div>

          {/* Status & Navigation */}
          <div className="border-t border-border/20 pt-8">
            <div className="flex justify-between items-center">
              <Button
                onClick={onPrevious}
                disabled={!canGoPrevious}
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 text-lg shadow-soft"
                size="lg"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </Button>

              <div className="text-center">
                {!bothAnswered && (
                  <div className="px-6 py-3 bg-warning/10 rounded-full">
                    <p className="text-warning font-medium text-lg">
                      💡 Select both ratings to continue automatically
                    </p>
                  </div>
                )}
                {bothAnswered && (
                  <div className="px-6 py-3 bg-success/10 rounded-full">
                    <p className="text-success font-medium text-lg">
                      ✨ Auto-advancing to next question...
                    </p>
                  </div>
                )}
              </div>

              <Button
                onClick={onNext}
                disabled={!bothAnswered}
                className={`flex items-center gap-2 px-6 py-3 text-lg shadow-premium ${
                  bothAnswered ? 'btn-primary' : ''
                }`}
                size="lg"
              >
                {currentQuestionIndex === totalQuestions - 1 ? 'Complete Assessment' : 'Next Question'}
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;