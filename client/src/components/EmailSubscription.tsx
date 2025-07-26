
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle } from 'lucide-react';

const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Mock subscription - in real app, this would call your backend
    setIsSubscribed(true);
    setEmail('');
    
    toast({
      title: "Successfully Subscribed!",
      description: "You'll receive job alerts in your inbox.",
    });
  };

  if (isSubscribed) {
    return (
      <div className="bg-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-lg text-gray-600">
            You're now subscribed to receive remote job alerts directly in your inbox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              Never Miss a Great Job
            </CardTitle>
            <p className="text-lg text-gray-600">
              Get the latest remote job opportunities delivered straight to your inbox
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12"
                required
              />
              <Button type="submit" className="h-12 px-8 bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                Subscribe Now
              </Button>
            </form>
            <p className="text-sm text-gray-500 text-center mt-4">
              No spam, unsubscribe at any time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailSubscription;
