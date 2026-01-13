import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// Create a timeout wrapper for Firebase operations
const withTimeout = (promise, timeoutMs = 10000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
    )
  ]);
};

// Test basic connectivity
export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection with timeout...');
    
    const testDoc = await withTimeout(
      addDoc(collection(db, 'connection_test'), {
        message: 'Connection test',
        timestamp: new Date().toISOString(),
        test: true
      }),
      5000 // 5 second timeout
    );
    
    console.log('✅ Connection test successful, doc ID:', testDoc.id);
    return { success: true, id: testDoc.id };
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return { success: false, error: error.message };
  }
};

// Initialize collections with timeout
const initializeCollectionWithTimeout = async (collectionName) => {
  try {
    console.log(`Initializing ${collectionName} with timeout...`);
    
    const tempDocRef = doc(collection(db, collectionName), '_temp_init');
    await withTimeout(
      setDoc(tempDocRef, {
        initialized: true,
        createdAt: new Date().toISOString(),
        note: 'Temporary initialization document'
      }),
      8000 // 8 second timeout
    );
    
    console.log(`✅ Collection ${collectionName} initialized`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to initialize ${collectionName}:`, error);
    return false;
  }
};

// Save data with timeout
export const saveScheduleCallWithTimeout = async (formData) => {
  try {
    console.log('Saving schedule call data with timeout...');
    
    const docRef = await withTimeout(
      addDoc(collection(db, 'schedule_calls'), {
        ...formData,
        timestamp: new Date().toISOString(),
        type: 'schedule_call',
        createdAt: Date.now()
      }),
      10000 // 10 second timeout
    );
    
    console.log('✅ Schedule call saved:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Failed to save schedule call:', error);
    return { success: false, error: error.message };
  }
};

export const saveDownloadBrochureWithTimeout = async (formData) => {
  try {
    console.log('Saving download brochure data with timeout...');
    
    const docRef = await withTimeout(
      addDoc(collection(db, 'download_brochure'), {
        ...formData,
        timestamp: new Date().toISOString(),
        type: 'download_brochure',
        createdAt: Date.now()
      }),
      10000 // 10 second timeout
    );
    
    console.log('✅ Download brochure saved:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Failed to save download brochure:', error);
    return { success: false, error: error.message };
  }
};

export const initializeAllCollectionsWithTimeout = async () => {
  try {
    console.log('🚀 Initializing collections with timeout...');
    
    const scheduleResult = await initializeCollectionWithTimeout('schedule_calls');
    const brochureResult = await initializeCollectionWithTimeout('download_brochure');
    
    if (scheduleResult && brochureResult) {
      console.log('🎉 All collections initialized successfully!');
      return { success: true };
    } else {
      return { success: false, error: 'Some collections failed to initialize' };
    }
  } catch (error) {
    console.error('💥 Initialization failed:', error);
    return { success: false, error: error.message };
  }
};