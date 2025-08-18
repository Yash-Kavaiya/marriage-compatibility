import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, CheckCircle } from "lucide-react";

interface AssessmentLandingProps {
  onStartAssessment: (partner: 'A' | 'B') => void;
}

const AssessmentLanding = ({ onStartAssessment }: AssessmentLandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lighter via-background to-accent">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary rounded-full shadow-lg">
                <Heart className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-inter">
              Marriage Compatibility Master Assessment
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comprehensive Pre-Marital & Couple Compatibility Questionnaire
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-card">
              <CardHeader className="text-center">
                <CheckCircle className="w-10 h-10 text-success mx-auto mb-3" />
                <CardTitle className="text-lg">86 Comprehensive Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Covering 14 essential areas from values to intimacy, finances to future planning
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="text-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                <CardTitle className="text-lg">Dual Rating System</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Rate both importance and flexibility for each topic to understand your compatibility
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="text-center">
                <Heart className="w-10 h-10 text-compatibility-red mx-auto mb-3" />
                <CardTitle className="text-lg">Actionable Results</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get traffic-light guidance and downloadable PDF report with action items
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-primary">Rating System</h3>
                  <p className="text-muted-foreground mb-3">Each question requires two ratings (1-5 scale):</p>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Importance:</strong> How important this topic is to you personally</li>
                    <li><strong>Flexibility:</strong> How much difference you can accept (1=very flexible, 5=non-negotiable)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-primary">14 Key Areas</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Core Values & Ethics</p>
                    <p>• Religion & Spirituality</p>
                    <p>• Relationship Boundaries</p>
                    <p>• Children & Parenting</p>
                    <p>• Finances & Career</p>
                    <p>• Communication & Intimacy</p>
                    <p>• And 8 more essential areas...</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Start Assessment */}
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Complete the assessment individually, then compare your results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                onClick={() => onStartAssessment('A')}
                className="gradient-hero text-lg py-6 px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Partner A Assessment
              </Button>
              <Button 
                onClick={() => onStartAssessment('B')}
                variant="outline"
                className="text-lg py-6 px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Partner B Assessment
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Estimated time: 15-20 minutes per person
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentLanding;