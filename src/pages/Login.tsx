import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { TEST_USERS, TEST_PASSWORD } from '@/data/mockData';
import logoImg from '@/assets/ts-police-logo.png';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = TEST_USERS.find(u => u.email === email);
    
    if (user && password === TEST_PASSWORD) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast.success('Login successful', {
        description: `Welcome back, ${user.name}`
      });
      navigate('/dashboard');
    } else {
      toast.error('Authentication failed', {
        description: 'Invalid credentials. Please check your email and password.'
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logoImg} alt="Telangana State Police" className="h-32 w-auto mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Secure Access Portal</h1>
          <p className="text-muted-foreground text-sm">Chain of Custody Case Management System</p>
        </div>

        <Card className="glass border-2">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center security-pulse">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Officer Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="officer@tspolice.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                <Lock className="h-4 w-4 mr-2" />
                {isLoading ? 'Authenticating...' : 'Secure Login'}
              </Button>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground text-center mb-2 font-semibold">
                Test Credentials
              </p>
              <div className="space-y-1 text-xs">
                <p className="text-muted-foreground">Password for all: <span className="text-foreground font-mono">{TEST_PASSWORD}</span></p>
                <p className="text-accent">• constable@tspolice.gov.in</p>
                <p className="text-accent">• investigator@tspolice.gov.in</p>
                <p className="text-accent">• seniorofficer@tspolice.gov.in</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Protected by AES-256 Encryption • Telangana State Police
        </p>
      </div>
    </div>
  );
};

export default Login;
