import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// Initialize collections if they don't exist
const initializeCollection = async (collectionName) => {
  try {
    console.log(`Attempting to initialize collection: ${collectionName}`);
    
    // Create a temporary document to initialize the collection
    const tempDocRef = doc(collection(db, collectionName), '_temp_init');
    await setDoc(tempDocRef, {
      initialized: true,
      createdAt: serverTimestamp(),
      note: 'This is a temporary document to initialize the collection'
    });
    
    console.log(`✅ Collection ${collectionName} initialized successfully`);
    return true;
  } catch (error) {
    console.error(`❌ Error initializing collection ${collectionName}:`, error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    return false;
  }
};

// Save schedule call data
export const saveScheduleCallData = async (formData) => {
  try {
    console.log('Attempting to save schedule call data...');
    
    const docRef = await addDoc(collection(db, 'schedule_calls'), {
      ...formData,
      timestamp: serverTimestamp(),
      type: 'schedule_call',
      createdAt: new Date().toISOString()
    });
    
    console.log('✅ Schedule call data saved with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Error saving schedule call data: ', error);
    return { success: false, error: error.message };
  }
};

// Save download brochure data
export const saveDownloadBrochureData = async (formData) => {
  try {
    console.log('Attempting to save download brochure data...');
    
    const docRef = await addDoc(collection(db, 'download_brochure'), {
      ...formData,
      timestamp: serverTimestamp(),
      type: 'download_brochure',
      createdAt: new Date().toISOString()
    });
    
    console.log('✅ Download brochure data saved with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Error saving download brochure data: ', error);
    return { success: false, error: error.message };
  }
};

// Utility function to manually initialize both collections
export const initializeAllCollections = async () => {
  try {
    console.log('🚀 Starting Firebase collections initialization...');
    
    console.log('📝 Initializing schedule_calls collection...');
    const scheduleCallsResult = await initializeCollection('schedule_calls');
    
    console.log('📝 Initializing download_brochure collection...');
    const downloadBrochureResult = await initializeCollection('download_brochure');
    
    if (scheduleCallsResult && downloadBrochureResult) {
      console.log('🎉 All collections initialized successfully!');
      return { success: true };
    } else {
      const errorMsg = 'Some collections failed to initialize';
      console.log('⚠️ ' + errorMsg);
      return { success: false, error: errorMsg };
    }
  } catch (error) {
    console.error('💥 Error initializing collections:', error);
    return { success: false, error: error.message };
  }
};