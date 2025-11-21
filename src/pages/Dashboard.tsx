import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import { MOCK_CASES } from '@/data/mockData';
import { UserProfile, Case } from '@/lib/firebase';
import { format } from 'date-fns';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [cases, setCases] = useState<Case[]>(MOCK_CASES);

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
      navigate('/login');
      return;
    }
    setCurrentUser(JSON.parse(userStr));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-info';
      case 'under_investigation': return 'bg-warning';
      case 'closed': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="h-4 w-4" />;
      case 'under_investigation': return <Clock className="h-4 w-4" />;
      case 'closed': return <CheckCircle2 className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  if (!currentUser) return null;

  return (
    <Layout
      userRole={currentUser.role}
      userName={currentUser.name}
      onLogout={handleLogout}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Case Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Badge: {currentUser.badgeNumber} • Access Level: {currentUser.role.replace('_', ' ').toUpperCase()}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{cases.length}</div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Under Investigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">
                {cases.filter(c => c.status === 'under_investigation').length}
              </div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Open Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-info">
                {cases.filter(c => c.status === 'open').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              All Cases
            </CardTitle>
            <CardDescription>
              Click on a case to view details and access files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cases.map((case_) => (
                <Card
                  key={case_.id}
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => navigate(`/case/${case_.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="font-mono">
                            {case_.id}
                          </Badge>
                          <Badge className={getStatusColor(case_.status)}>
                            {getStatusIcon(case_.status)}
                            <span className="ml-1.5">
                              {case_.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </Badge>
                        </div>
                        <h3 className="font-semibold mb-1">{case_.category}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {case_.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Complainant: {case_.complainantName}</span>
                          <span>Filed: {format(case_.createdAt, 'dd MMM yyyy')}</span>
                          <span>{case_.files.length} files</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
