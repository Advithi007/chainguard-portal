import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  Download,
  Lock,
  Unlock,
  Shield,
  Clock,
  User,
  Phone,
  Mail,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { MOCK_CASES } from '@/data/mockData';
import { UserProfile, Case, UserRole, CaseFile, AuditLog } from '@/lib/firebase';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { simulateDecryption } from '@/utils/encryption';

export const CaseDetail = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [decryptingFile, setDecryptingFile] = useState<string | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
      navigate('/login');
      return;
    }
    setCurrentUser(JSON.parse(userStr));

    const foundCase = MOCK_CASES.find(c => c.id === caseId);
    if (foundCase) {
      setCaseData(foundCase);
    }
  }, [navigate, caseId]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const canAccessFile = (file: CaseFile): boolean => {
    if (!currentUser) return false;
    
    // Identity files accessible by all
    if (file.category === 'identity') return true;
    
    // Sensitive files only for IO and Senior Officer
    if (file.category === 'sensitive') {
      return [UserRole.INVESTIGATION_OFFICER, UserRole.SENIOR_OFFICER].includes(currentUser.role);
    }
    
    return false;
  };

  const handleFileAccess = async (file: CaseFile) => {
    if (!canAccessFile(file)) {
      toast.error('Access Denied', {
        description: `Your role (${currentUser?.role.replace('_', ' ')}) does not have permission to access ${file.category} evidence.`
      });
      return;
    }

    setDecryptingFile(file.id);
    
    try {
      // Simulate decryption
      await simulateDecryption(file.encryptedUrl);
      
      // Add audit log
      const newLog: AuditLog = {
        id: `audit_${Date.now()}`,
        caseId: caseData!.id,
        officerName: currentUser!.name,
        officerRole: currentUser!.role,
        action: `Decrypted and viewed ${file.fileName}`,
        fileName: file.fileName,
        timestamp: new Date()
      };
      
      setCaseData(prev => prev ? {
        ...prev,
        auditLogs: [...prev.auditLogs, newLog]
      } : null);
      
      toast.success('File Decrypted', {
        description: `${file.fileName} has been decrypted and is ready for download.`
      });
      
      // Simulate download
      console.log('Downloading:', file.fileName);
      
    } catch (error) {
      toast.error('Decryption Failed', {
        description: 'Unable to decrypt the file. Please try again.'
      });
    } finally {
      setDecryptingFile(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (!currentUser || !caseData) return null;

  return (
    <Layout
      userRole={currentUser.role}
      userName={currentUser.name}
      onLogout={handleLogout}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{caseData.id}</h1>
              <Badge variant="outline">{caseData.status.replace('_', ' ').toUpperCase()}</Badge>
            </div>
            <p className="text-muted-foreground">{caseData.category}</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass md:col-span-2">
            <CardHeader>
              <CardTitle>Case Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{caseData.description}</p>
              </div>
              <Separator />
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Complainant</p>
                    <p className="text-sm text-muted-foreground">{caseData.complainantName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{caseData.complainantEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{caseData.complainantPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Filed On</p>
                    <p className="text-sm text-muted-foreground">
                      {format(caseData.createdAt, 'dd MMM yyyy, HH:mm')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-sm">Your Access Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="text-sm">Identity Proof Files</span>
                </div>
                <div className="flex items-center gap-2">
                  {[UserRole.INVESTIGATION_OFFICER, UserRole.SENIOR_OFFICER].includes(currentUser.role) ? (
                    <>
                      <Unlock className="h-4 w-4 text-success" />
                      <span className="text-sm">Sensitive Evidence</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 text-destructive" />
                      <span className="text-sm text-muted-foreground">Sensitive Evidence</span>
                    </>
                  )}
                </div>
                {currentUser.role === UserRole.SENIOR_OFFICER && (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm">Full Audit Access</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Case Files ({caseData.files.length})
            </CardTitle>
            <CardDescription>
              Encrypted files related to this case
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {caseData.files.map((file) => {
                const hasAccess = canAccessFile(file);
                const isDecrypting = decryptingFile === file.id;
                
                return (
                  <div
                    key={file.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      hasAccess ? 'border-border hover:border-primary' : 'border-border/50 opacity-60'
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        file.category === 'identity' ? 'bg-success/20' : 'bg-destructive/20'
                      }`}>
                        {hasAccess ? (
                          <FileText className={`h-5 w-5 ${
                            file.category === 'identity' ? 'text-success' : 'text-destructive'
                          }`} />
                        ) : (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.fileName}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{formatFileSize(file.size)}</span>
                          <Badge variant="outline" className="text-xs">
                            {file.category === 'identity' ? 'Identity Proof' : 'Sensitive Evidence'}
                          </Badge>
                          <span>{format(file.uploadedAt, 'dd MMM yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant={hasAccess ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFileAccess(file)}
                      disabled={!hasAccess || isDecrypting}
                    >
                      {isDecrypting ? (
                        <>Decrypting...</>
                      ) : hasAccess ? (
                        <>
                          <Download className="h-4 w-4 mr-1" />
                          Decrypt & View
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-1" />
                          Access Denied
                        </>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-accent/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              Chain of Custody Timeline
            </CardTitle>
            <CardDescription>
              Immutable audit log of all actions taken on this case
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {caseData.auditLogs.map((log, index) => (
                <div key={log.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      index === caseData.auditLogs.length - 1 ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <Shield className={`h-4 w-4 ${
                        index === caseData.auditLogs.length - 1 ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    {index < caseData.auditLogs.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Officer: {log.officerName} ({log.officerRole.replace('_', ' ').toUpperCase()})
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {format(log.timestamp, 'dd MMM yyyy, HH:mm:ss')}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CaseDetail;
