import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Firebase configuration for local emulator
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Connect to emulators (only in development)
if (import.meta.env.DEV) {
  try {
    connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
    connectFirestoreEmulator(db, "localhost", 8080);
    connectStorageEmulator(storage, "localhost", 9199);
    console.log("✓ Connected to Firebase Emulators");
  } catch (error) {
    console.warn("Emulator connection error:", error);
  }
}

// User roles enum
export enum UserRole {
  CONSTABLE = "constable",
  INVESTIGATION_OFFICER = "investigation_officer",
  SENIOR_OFFICER = "senior_officer"
}

// Type definitions
export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  name: string;
  badgeNumber: string;
}

export interface CaseFile {
  id: string;
  caseId: string;
  fileName: string;
  fileType: string;
  category: 'identity' | 'sensitive';
  uploadedAt: Date;
  encryptedUrl: string;
  size: number;
}

export interface AuditLog {
  id: string;
  caseId: string;
  officerName: string;
  officerRole: UserRole;
  action: string;
  fileName?: string;
  timestamp: Date;
}

export interface Case {
  id: string;
  complainantName: string;
  complainantEmail: string;
  complainantPhone: string;
  description: string;
  category: string;
  status: 'open' | 'under_investigation' | 'closed';
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  files: CaseFile[];
  auditLogs: AuditLog[];
}
