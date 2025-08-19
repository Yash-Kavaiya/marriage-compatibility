import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, FileText, CheckCircle, Mic, MessageSquare, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface AssessmentLandingProps {
  onStartAssessment: (partner: 'A' | 'B', type?: 'regular' | 'voice') => void;
}

const AssessmentLanding = ({ onStartAssessment }: AssessmentLandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-romantic">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-end mb-8">
            <Link to="/contact">
              <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-20">💍</div>
              </div>
              <Heart className="w-16 h-16 text-white mx-auto mb-4 relative z-10" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6 font-playfair">
              Marriage Compatibility Master Assessment
            </h1>
            <div className="text-2xl font-dancing text-white/95 mb-4">
              "Two hearts, one journey"
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover your relationship compatibility across 86 essential questions in 14 key life areas. 
              Build stronger foundations for your future together.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-romantic gradient-pearl bg-white/95 backdrop-blur relative overflow-hidden">
              <div className="absolute top-2 right-2 text-2xl opacity-30">🌹</div>
              <CardHeader className="text-center">
                <CheckCircle className="w-10 h-10 text-success mx-auto mb-3" />
                <CardTitle className="text-lg font-playfair">86 Comprehensive Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Covering 14 essential areas from values to intimacy, finances to future planning
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-romantic gradient-pearl bg-white/95 backdrop-blur relative overflow-hidden">
              <div className="absolute top-2 right-2 text-2xl opacity-30">💕</div>
              <CardHeader className="text-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                <CardTitle className="text-lg font-playfair">Dual Rating System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Rate both importance and flexibility for each topic to understand your compatibility
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-romantic gradient-pearl bg-white/95 backdrop-blur relative overflow-hidden">
              <div className="absolute top-2 right-2 text-2xl opacity-30">✨</div>
              <CardHeader className="text-center">
                <Heart className="w-10 h-10 text-compatibility-red mx-auto mb-3" />
                <CardTitle className="text-lg font-playfair">Actionable Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Get traffic-light guidance and downloadable PDF report with action items
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Options */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-8 font-playfair">Choose Your Assessment Style</h2>
            
            {/* Regular Assessment */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              <Card className="shadow-romantic gradient-pearl bg-white/95 backdrop-blur relative overflow-hidden">
                <div className="absolute top-3 right-3 text-3xl opacity-20">🤵</div>
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <MessageSquare className="w-12 h-12 text-masculine" />
                  </div>
                  <CardTitle className="text-masculine font-playfair">Traditional Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">Complete the assessment at your own pace with interactive sliders and visual feedback.</p>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => onStartAssessment('A', 'regular')}
                      className="w-full gradient-masculine shadow-soft"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Partner A - Traditional
                    </Button>
                    <Button 
                      onClick={() => onStartAssessment('B', 'regular')}
                      className="w-full gradient-masculine shadow-soft"
                      variant="outline"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Partner B - Traditional
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-romantic gradient-pearl bg-white/95 backdrop-blur relative overflow-hidden">
                <div className="absolute top-3 right-3 text-3xl opacity-20">👰</div>
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <Mic className="w-12 h-12 text-feminine" />
                  </div>
                  <CardTitle className="text-feminine font-playfair">Voice Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">Experience our AI-powered voice assessment with spoken questions and voice responses.</p>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => onStartAssessment('A', 'voice')}
                      className="w-full gradient-feminine shadow-soft"
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      Partner A - Voice
                    </Button>
                    <Button 
                      onClick={() => onStartAssessment('B', 'voice')}
                      className="w-full gradient-feminine shadow-soft"
                      variant="outline"
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      Partner B - Voice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <p className="text-sm text-white/80 mt-6">
              Both partners should complete the assessment independently for the most accurate results
            </p>
          </div>

          {/* Instructions */}
          <Card className="shadow-romantic gradient-pearl mb-8 bg-white/95 backdrop-blur relative overflow-hidden">
            <div className="absolute top-4 right-4 text-4xl opacity-10">🌸</div>
            <CardHeader>
              <CardTitle className="text-2xl text-center font-playfair">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-primary font-playfair">Rating System</h3>
                  <p className="text-muted-foreground mb-3">Each question requires two ratings (1-5 scale):</p>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Importance:</strong> How important this topic is to you personally</li>
                    <li><strong>Flexibility:</strong> How much difference you can accept (1=very flexible, 5=non-negotiable)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-primary font-playfair">14 Key Areas</h3>
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
        </div>
      </div>
    </div>
  );
};

export default AssessmentLanding;