import { Case, UserRole, UserProfile } from '@/lib/firebase';

// Test user credentials
export const TEST_USERS: UserProfile[] = [
  {
    uid: 'user_constable_001',
    email: 'constable@tspolice.gov.in',
    role: UserRole.CONSTABLE,
    name: 'Rajesh Kumar',
    badgeNumber: 'TS-CONST-2891'
  },
  {
    uid: 'user_io_001',
    email: 'investigator@tspolice.gov.in',
    role: UserRole.INVESTIGATION_OFFICER,
    name: 'Priya Sharma',
    badgeNumber: 'TS-IO-1456'
  },
  {
    uid: 'user_so_001',
    email: 'seniorofficer@tspolice.gov.in',
    role: UserRole.SENIOR_OFFICER,
    name: 'ACP Venkat Rao',
    badgeNumber: 'TS-ACP-0789'
  }
];

// Password for all test accounts
export const TEST_PASSWORD = 'TSPolice@2024';

// Mock cases with complete data
export const MOCK_CASES: Case[] = [
  {
    id: 'CASE-2024-001234',
    complainantName: 'Srinivas Reddy',
    complainantEmail: 'srinivas.r@email.com',
    complainantPhone: '+91 9876543210',
    description: 'Theft of motorcycle from parking area near Secunderabad Railway Station. Vehicle registration: TS-09-EA-1234. Incident occurred on 15th January 2024 around 10:30 PM.',
    category: 'Property Theft',
    status: 'under_investigation',
    createdAt: new Date('2024-01-16T09:30:00'),
    updatedAt: new Date('2024-01-20T14:22:00'),
    assignedTo: 'Priya Sharma',
    files: [
      {
        id: 'file_001',
        caseId: 'CASE-2024-001234',
        fileName: 'aadhaar_card.pdf',
        fileType: 'application/pdf',
        category: 'identity',
        uploadedAt: new Date('2024-01-16T09:35:00'),
        encryptedUrl: 'ENC_mock_url_aadhaar',
        size: 245760
      },
      {
        id: 'file_002',
        caseId: 'CASE-2024-001234',
        fileName: 'cctv_footage.mp4',
        fileType: 'video/mp4',
        category: 'sensitive',
        uploadedAt: new Date('2024-01-16T10:15:00'),
        encryptedUrl: 'ENC_mock_url_cctv',
        size: 15728640
      },
      {
        id: 'file_003',
        caseId: 'CASE-2024-001234',
        fileName: 'vehicle_rc_book.pdf',
        fileType: 'application/pdf',
        category: 'identity',
        uploadedAt: new Date('2024-01-16T09:40:00'),
        encryptedUrl: 'ENC_mock_url_rc',
        size: 512000
      }
    ],
    auditLogs: [
      {
        id: 'audit_001',
        caseId: 'CASE-2024-001234',
        officerName: 'Priya Sharma',
        officerRole: UserRole.INVESTIGATION_OFFICER,
        action: 'Case assigned to Investigation Officer',
        timestamp: new Date('2024-01-16T11:00:00')
      },
      {
        id: 'audit_002',
        caseId: 'CASE-2024-001234',
        officerName: 'Priya Sharma',
        officerRole: UserRole.INVESTIGATION_OFFICER,
        action: 'Decrypted and viewed cctv_footage.mp4',
        fileName: 'cctv_footage.mp4',
        timestamp: new Date('2024-01-17T15:30:00')
      },
      {
        id: 'audit_003',
        caseId: 'CASE-2024-001234',
        officerName: 'ACP Venkat Rao',
        officerRole: UserRole.SENIOR_OFFICER,
        action: 'Reviewed case files',
        timestamp: new Date('2024-01-18T10:15:00')
      }
    ]
  },
  {
    id: 'CASE-2024-001235',
    complainantName: 'Lakshmi Devi',
    complainantEmail: 'lakshmi.d@email.com',
    complainantPhone: '+91 9123456789',
    description: 'Cybercrime - Unauthorized transaction from bank account. Amount: ₹75,000. Multiple suspicious UPI transactions detected on 18th January 2024.',
    category: 'Cybercrime',
    status: 'open',
    createdAt: new Date('2024-01-19T08:15:00'),
    updatedAt: new Date('2024-01-19T08:15:00'),
    files: [
      {
        id: 'file_004',
        caseId: 'CASE-2024-001235',
        fileName: 'pan_card.pdf',
        fileType: 'application/pdf',
        category: 'identity',
        uploadedAt: new Date('2024-01-19T08:20:00'),
        encryptedUrl: 'ENC_mock_url_pan',
        size: 180224
      },
      {
        id: 'file_005',
        caseId: 'CASE-2024-001235',
        fileName: 'bank_statement.pdf',
        fileType: 'application/pdf',
        category: 'sensitive',
        uploadedAt: new Date('2024-01-19T08:25:00'),
        encryptedUrl: 'ENC_mock_url_statement',
        size: 891392
      }
    ],
    auditLogs: [
      {
        id: 'audit_004',
        caseId: 'CASE-2024-001235',
        officerName: 'Rajesh Kumar',
        officerRole: UserRole.CONSTABLE,
        action: 'Case registered and acknowledged',
        timestamp: new Date('2024-01-19T09:00:00')
      }
    ]
  },
  {
    id: 'CASE-2024-001236',
    complainantName: 'Mohammed Aziz',
    complainantEmail: 'aziz.m@email.com',
    complainantPhone: '+91 9988776655',
    description: 'Missing person report - Son missing since 12th January 2024. Last seen near Charminar area. Age: 16 years.',
    category: 'Missing Person',
    status: 'under_investigation',
    createdAt: new Date('2024-01-13T16:45:00'),
    updatedAt: new Date('2024-01-21T11:30:00'),
    assignedTo: 'Priya Sharma',
    files: [
      {
        id: 'file_006',
        caseId: 'CASE-2024-001236',
        fileName: 'voter_id.pdf',
        fileType: 'application/pdf',
        category: 'identity',
        uploadedAt: new Date('2024-01-13T16:50:00'),
        encryptedUrl: 'ENC_mock_url_voter',
        size: 156672
      },
      {
        id: 'file_007',
        caseId: 'CASE-2024-001236',
        fileName: 'missing_person_photo.jpg',
        fileType: 'image/jpeg',
        category: 'identity',
        uploadedAt: new Date('2024-01-13T16:55:00'),
        encryptedUrl: 'ENC_mock_url_photo',
        size: 524288
      },
      {
        id: 'file_008',
        caseId: 'CASE-2024-001236',
        fileName: 'witness_statement.pdf',
        fileType: 'application/pdf',
        category: 'sensitive',
        uploadedAt: new Date('2024-01-14T10:00:00'),
        encryptedUrl: 'ENC_mock_url_witness',
        size: 327680
      }
    ],
    auditLogs: [
      {
        id: 'audit_005',
        caseId: 'CASE-2024-001236',
        officerName: 'Rajesh Kumar',
        officerRole: UserRole.CONSTABLE,
        action: 'Initial report filed',
        timestamp: new Date('2024-01-13T17:00:00')
      },
      {
        id: 'audit_006',
        caseId: 'CASE-2024-001236',
        officerName: 'Priya Sharma',
        officerRole: UserRole.INVESTIGATION_OFFICER,
        action: 'Case escalated to Investigation',
        timestamp: new Date('2024-01-14T09:00:00')
      },
      {
        id: 'audit_007',
        caseId: 'CASE-2024-001236',
        officerName: 'Priya Sharma',
        officerRole: UserRole.INVESTIGATION_OFFICER,
        action: 'Decrypted and viewed witness_statement.pdf',
        fileName: 'witness_statement.pdf',
        timestamp: new Date('2024-01-14T11:45:00')
      },
      {
        id: 'audit_008',
        caseId: 'CASE-2024-001236',
        officerName: 'ACP Venkat Rao',
        officerRole: UserRole.SENIOR_OFFICER,
        action: 'Case reviewed - Additional resources allocated',
        timestamp: new Date('2024-01-15T14:00:00')
      }
    ]
  }
];
