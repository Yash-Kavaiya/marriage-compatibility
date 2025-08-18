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
}) => (
  <div className="space-y-3">
    <h4 className="font-semibold text-lg text-foreground">{title}</h4>
    <div className="space-y-2">
      {labels.map((label, index) => (
        <button
          key={index}
          onClick={() => onChange(index + 1)}
          className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 ${
            value === index + 1
              ? `bg-${color} border-${color} text-white shadow-md`
              : 'bg-card border-border hover:border-primary hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{index + 1}. {label}</span>
            <div className={`w-6 h-6 rounded-full border-2 ${
              value === index + 1 
                ? 'bg-white border-white' 
                : 'border-muted-foreground'
            }`}>
              {value === index + 1 && (
                <div className={`w-2 h-2 rounded-full bg-${color} mx-auto mt-1`} />
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lighter via-background to-accent p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-primary mb-2">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </h2>
            <p className="text-muted-foreground font-medium">{question.category}</p>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-sm text-muted-foreground text-center mt-2">
            {Math.round(progressPercentage)}% Complete
          </p>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
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
                onChange={onImportanceChange}
                labels={importanceLabels}
                color="primary"
              />

              {/* Flexibility Rating */}
              <RatingScale
                title="My Flexibility Level"
                value={flexibilityValue}
                onChange={onFlexibilityChange}
                labels={flexibilityLabels}
                color="success"
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                onClick={onPrevious}
                disabled={!canGoPrevious}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="text-center">
                {!bothAnswered && (
                  <p className="text-sm text-warning font-medium">
                    Please answer both questions to continue
                  </p>
                )}
              </div>

              <Button
                onClick={onNext}
                disabled={!bothAnswered}
                className={`flex items-center gap-2 ${
                  bothAnswered ? 'gradient-hero' : ''
                }`}
              >
                {currentQuestionIndex === totalQuestions - 1 ? 'Complete Assessment' : 'Next'}
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