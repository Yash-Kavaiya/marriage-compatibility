import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, RefreshCw, Target, AlertTriangle, CheckCircle } from "lucide-react";
import { assessmentCategories, assessmentQuestions } from "@/data/assessmentQuestions";

export interface AssessmentResponse {
  questionId: number;
  importance: number;
  flexibility: number;
}

export interface PartnerData {
  name: string;
  responses: AssessmentResponse[];
  completedAt: Date;
}

interface AssessmentResultsProps {
  partnerA?: PartnerData;
  partnerB?: PartnerData;
  onRestart: () => void;
  onDownloadPDF: () => void;
}

const getCompatibilityScore = (responseA: AssessmentResponse, responseB: AssessmentResponse) => {
  const importanceGap = Math.abs(responseA.importance - responseB.importance);
  
  if (importanceGap <= 1) return 'green';
  if (importanceGap === 2) return 'yellow';
  return 'red';
};

const getCompatibilityLabel = (score: string) => {
  switch (score) {
    case 'green': return 'Aligned';
    case 'yellow': return 'Discuss';
    case 'red': return 'Priority';
    default: return 'Unknown';
  }
};

const CategorySummary = ({ 
  category, 
  partnerA, 
  partnerB 
}: { 
  category: string;
  partnerA?: PartnerData;
  partnerB?: PartnerData;
}) => {
  const categoryQuestions = assessmentQuestions.filter(q => q.category === category);
  
  if (!partnerA || !partnerB) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">{category}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Complete both assessments to see compatibility analysis
          </p>
        </CardContent>
      </Card>
    );
  }

  const scores = categoryQuestions.map(q => {
    const responseA = partnerA.responses.find(r => r.questionId === q.id);
    const responseB = partnerB.responses.find(r => r.questionId === q.id);
    
    if (responseA && responseB) {
      return getCompatibilityScore(responseA, responseB);
    }
    return null;
  }).filter(Boolean);

  const greenCount = scores.filter(s => s === 'green').length;
  const yellowCount = scores.filter(s => s === 'yellow').length;
  const redCount = scores.filter(s => s === 'red').length;

  const overallScore = redCount > 0 ? 'red' : yellowCount > 0 ? 'yellow' : 'green';

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{category}</CardTitle>
          <Badge 
            className={`
              ${overallScore === 'green' ? 'bg-compatibility-green text-white' : ''}
              ${overallScore === 'yellow' ? 'bg-compatibility-yellow text-black' : ''}
              ${overallScore === 'red' ? 'bg-compatibility-red text-white' : ''}
            `}
          >
            {getCompatibilityLabel(overallScore)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="w-4 h-4 text-compatibility-green mr-1" />
              <span className="text-sm font-medium">Aligned</span>
            </div>
            <div className="text-2xl font-bold text-compatibility-green">{greenCount}</div>
          </div>
          <div>
            <div className="flex items-center justify-center mb-1">
              <Target className="w-4 h-4 text-compatibility-yellow mr-1" />
              <span className="text-sm font-medium">Discuss</span>
            </div>
            <div className="text-2xl font-bold text-compatibility-yellow">{yellowCount}</div>
          </div>
          <div>
            <div className="flex items-center justify-center mb-1">
              <AlertTriangle className="w-4 h-4 text-compatibility-red mr-1" />
              <span className="text-sm font-medium">Priority</span>
            </div>
            <div className="text-2xl font-bold text-compatibility-red">{redCount}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const OverallSummary = ({ 
  partnerA, 
  partnerB 
}: { 
  partnerA?: PartnerData;
  partnerB?: PartnerData;
}) => {
  if (!partnerA || !partnerB) {
    const completedPartner = partnerA || partnerB;
    return (
      <Card className="shadow-lg border-primary">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Assessment Progress</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl">⏳</div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {completedPartner ? 'Waiting for Partner' : 'Ready to Begin'}
            </h3>
            <p className="text-muted-foreground">
              {completedPartner 
                ? `${completedPartner.name} completed the assessment. Share this page with your partner to complete their assessment.`
                : 'Both partners need to complete the assessment to see compatibility results.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate overall compatibility
  const allScores = assessmentQuestions.map(q => {
    const responseA = partnerA.responses.find(r => r.questionId === q.id);
    const responseB = partnerB.responses.find(r => r.questionId === q.id);
    
    if (responseA && responseB) {
      return getCompatibilityScore(responseA, responseB);
    }
    return null;
  }).filter(Boolean);

  const greenCount = allScores.filter(s => s === 'green').length;
  const yellowCount = allScores.filter(s => s === 'yellow').length;
  const redCount = allScores.filter(s => s === 'red').length;

  const compatibilityPercentage = Math.round((greenCount / allScores.length) * 100);

  return (
    <Card className="shadow-lg border-primary">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Overall Compatibility</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">{compatibilityPercentage}%</div>
          <p className="text-muted-foreground">Questions in alignment</p>
        </div>
        
        <Progress value={compatibilityPercentage} className="h-4" />
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-compatibility-green-light rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6 text-compatibility-green" />
            </div>
            <div className="text-2xl font-bold text-compatibility-green">{greenCount}</div>
            <div className="text-sm text-muted-foreground">Aligned Topics</div>
          </div>
          
          <div className="space-y-2">
            <div className="w-12 h-12 bg-compatibility-yellow-light rounded-full flex items-center justify-center mx-auto">
              <Target className="w-6 h-6 text-compatibility-yellow" />
            </div>
            <div className="text-2xl font-bold text-compatibility-yellow">{yellowCount}</div>
            <div className="text-sm text-muted-foreground">Need Discussion</div>
          </div>
          
          <div className="space-y-2">
            <div className="w-12 h-12 bg-compatibility-red-light rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6 text-compatibility-red" />
            </div>
            <div className="text-2xl font-bold text-compatibility-red">{redCount}</div>
            <div className="text-sm text-muted-foreground">Priority Areas</div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Interpretation Guide:</h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium text-compatibility-green">Green (Aligned):</span> You're on the same page - these topics should be easy to navigate.</p>
            <p><span className="font-medium text-compatibility-yellow">Yellow (Discuss):</span> Some differences that need conversation and compromise.</p>
            <p><span className="font-medium text-compatibility-red">Red (Priority):</span> Significant gaps requiring detailed planning and agreement.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AssessmentResults = ({ 
  partnerA, 
  partnerB, 
  onRestart, 
  onDownloadPDF 
}: AssessmentResultsProps) => {
  const bothCompleted = partnerA && partnerB;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lighter via-background to-accent">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Marriage Compatibility Results
            </h1>
            <p className="text-xl text-muted-foreground">
              Your comprehensive compatibility analysis
            </p>
          </div>

          {/* Overall Summary */}
          <div className="mb-8">
            <OverallSummary partnerA={partnerA} partnerB={partnerB} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button onClick={onRestart} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Start New Assessment
            </Button>
            
            {bothCompleted && (
              <Button onClick={onDownloadPDF} className="gradient-hero flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF Report
              </Button>
            )}
          </div>

          {/* Category Breakdown */}
          {bothCompleted && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6">Detailed Analysis by Category</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assessmentCategories.map(category => (
                  <CategorySummary
                    key={category}
                    category={category}
                    partnerA={partnerA}
                    partnerB={partnerB}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;