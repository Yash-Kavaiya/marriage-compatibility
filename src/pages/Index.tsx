import { useState } from 'react';
import AssessmentLanding from '@/components/AssessmentLanding';
import QuestionCard from '@/components/QuestionCard';
import AssessmentResults, { PartnerData, AssessmentResponse } from '@/components/AssessmentResults';
import { assessmentQuestions } from '@/data/assessmentQuestions';
import { generatePDFReport } from '@/utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';

type AppState = 'landing' | 'assessment' | 'results';
type PartnerType = 'A' | 'B' | null;

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentPartner, setCurrentPartner] = useState<PartnerType>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [partnerAData, setPartnerAData] = useState<PartnerData | undefined>();
  const [partnerBData, setPartnerBData] = useState<PartnerData | undefined>();
  const { toast } = useToast();

  const startAssessment = (partner: 'A' | 'B') => {
    const partnerName = prompt(`Enter ${partner === 'A' ? 'Partner A' : 'Partner B'}'s name:`);
    if (!partnerName?.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name to continue with the assessment.",
        variant: "destructive",
      });
      return;
    }

    setCurrentPartner(partner);
    setCurrentQuestionIndex(0);
    setResponses([]);
    setAppState('assessment');
  };

  const handleResponseChange = (questionId: number, field: 'importance' | 'flexibility', value: number) => {
    setResponses(prev => {
      const existing = prev.find(r => r.questionId === questionId);
      if (existing) {
        return prev.map(r => 
          r.questionId === questionId 
            ? { ...r, [field]: value }
            : r
        );
      }
      return [...prev, { 
        questionId, 
        importance: field === 'importance' ? value : 0,
        flexibility: field === 'flexibility' ? value : 0
      }];
    });
  };

  const getCurrentResponse = (questionId: number) => {
    return responses.find(r => r.questionId === questionId) || { questionId, importance: 0, flexibility: 0 };
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const completeAssessment = () => {
    const partnerName = prompt(`Confirm ${currentPartner === 'A' ? 'Partner A' : 'Partner B'}'s name:`);
    if (!partnerName?.trim()) return;

    const completedData: PartnerData = {
      name: partnerName,
      responses: responses.filter(r => r.importance > 0 && r.flexibility > 0),
      completedAt: new Date()
    };

    if (currentPartner === 'A') {
      setPartnerAData(completedData);
    } else {
      setPartnerBData(completedData);
    }

    setAppState('results');
    setCurrentPartner(null);
    
    toast({
      title: "Assessment Complete!",
      description: `${partnerName}'s assessment has been saved successfully.`,
    });
  };

  const restartAssessment = () => {
    setAppState('landing');
    setCurrentPartner(null);
    setCurrentQuestionIndex(0);
    setResponses([]);
    setPartnerAData(undefined);
    setPartnerBData(undefined);
  };

  const downloadPDF = () => {
    if (partnerAData && partnerBData) {
      try {
        generatePDFReport(partnerAData, partnerBData);
        toast({
          title: "PDF Generated!",
          description: "Your compatibility report has been downloaded successfully.",
        });
      } catch (error) {
        toast({
          title: "PDF Generation Failed",
          description: "There was an error generating your report. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (appState === 'landing') {
    return <AssessmentLanding onStartAssessment={startAssessment} />;
  }

  if (appState === 'assessment' && currentPartner) {
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const currentResponse = getCurrentResponse(currentQuestion.id);

    return (
      <QuestionCard
        question={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={assessmentQuestions.length}
        importanceValue={currentResponse.importance}
        flexibilityValue={currentResponse.flexibility}
        onImportanceChange={(value) => handleResponseChange(currentQuestion.id, 'importance', value)}
        onFlexibilityChange={(value) => handleResponseChange(currentQuestion.id, 'flexibility', value)}
        onNext={goToNextQuestion}
        onPrevious={goToPreviousQuestion}
        canGoNext={currentResponse.importance > 0 && currentResponse.flexibility > 0}
        canGoPrevious={currentQuestionIndex > 0}
      />
    );
  }

  return (
    <AssessmentResults
      partnerA={partnerAData}
      partnerB={partnerBData}
      onRestart={restartAssessment}
      onDownloadPDF={downloadPDF}
    />
  );
};

export default Index;
