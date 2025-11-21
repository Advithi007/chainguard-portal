/**
 * Mock AES-256 Encryption Utility
 * Simulates encryption/decryption with realistic delays
 */

export const simulateEncryption = async (data: string): Promise<string> => {
  // Simulate encryption processing time
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
  
  // Mock encrypted string (base64-like)
  const mockEncrypted = btoa(data).split('').reverse().join('');
  return `ENC_${mockEncrypted}`;
};

export const simulateDecryption = async (encryptedData: string): Promise<string> => {
  // Simulate decryption processing time
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
  
  // Mock decryption
  if (!encryptedData.startsWith('ENC_')) {
    throw new Error('Invalid encrypted data');
  }
  
  const encrypted = encryptedData.substring(4);
  const decrypted = atob(encrypted.split('').reverse().join(''));
  return decrypted;
};

export const getEncryptionStatus = (fileName: string): {
  algorithm: string;
  keySize: string;
  status: 'encrypted' | 'decrypting' | 'decrypted';
} => {
  return {
    algorithm: 'AES-256-GCM',
    keySize: '256-bit',
    status: 'encrypted'
  };
};
