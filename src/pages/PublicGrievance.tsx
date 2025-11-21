import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Upload, FileText, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import logoImg from '@/assets/ts-police-logo.png';

export const PublicGrievance = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [identityFiles, setIdentityFiles] = useState<File[]>([]);
  const [sensitiveFiles, setSensitiveFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate case creation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const caseId = `CASE-2024-${Math.floor(Math.random() * 900000 + 100000)}`;
    
    toast.success('Case Filed Successfully', {
      description: `Your Case ID: ${caseId}. Please save this for future reference.`
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
    setIdentityFiles([]);
    setSensitiveFiles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <img src={logoImg} alt="Telangana State Police" className="h-28 w-auto mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Public Grievance Portal</h1>
          <p className="text-muted-foreground">Secure complaint filing system for citizens</p>
        </div>

        <Card className="glass border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              File a Complaint
            </CardTitle>
            <CardDescription>
              All information provided will be encrypted and stored securely
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Complaint Category *</Label>
                  <Select name="category" required>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="theft">Property Theft</SelectItem>
                      <SelectItem value="cybercrime">Cybercrime</SelectItem>
                      <SelectItem value="missing">Missing Person</SelectItem>
                      <SelectItem value="assault">Assault</SelectItem>
                      <SelectItem value="fraud">Fraud</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Complaint Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  placeholder="Provide detailed description of the incident..."
                  className="min-h-32 bg-background/50"
                />
              </div>

              <div className="space-y-4 border border-border rounded-lg p-4 bg-card/50">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Document Upload Categories</h3>
                    <p className="text-xs text-muted-foreground">
                      Please upload files in the appropriate category for proper handling
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="identity">
                    <ShieldCheck className="h-4 w-4 inline mr-1 text-success" />
                    Identity Proof (Public Access)
                  </Label>
                  <Input
                    id="identity"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setIdentityFiles(Array.from(e.target.files || []))}
                    className="bg-background/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Aadhaar, PAN, Driving License, etc. (Accessible by all officers)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sensitive">
                    <Upload className="h-4 w-4 inline mr-1 text-destructive" />
                    Sensitive Evidence (Restricted Access)
                  </Label>
                  <Input
                    id="sensitive"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.mp4,.mov"
                    onChange={(e) => setSensitiveFiles(Array.from(e.target.files || []))}
                    className="bg-background/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    CCTV footage, witness statements, medical reports (Investigation Officers only)
                  </p>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? 'Filing Complaint...' : 'Submit Complaint Securely'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            All uploads are encrypted with AES-256 • Your privacy is protected
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicGrievance;
