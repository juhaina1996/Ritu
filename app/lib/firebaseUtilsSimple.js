import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

// Simple save functions without serverTimestamp
export const saveScheduleCallDataSimple = async (formData) => {
  try {
    console.log('Saving schedule call data (simple)...');
    
    const docRef = await addDoc(collection(db, 'schedule_calls'), {
      ...formData,
      type: 'schedule_call',
      createdAt: new Date().toISOString(),
      submittedAt: Date.now()
    });
    
    console.log('✅ Schedule call data saved with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Error saving schedule call data: ', error);
    return { success: false, error: error.message };
  }
};

export const saveDownloadBrochureDataSimple = async (formData) => {
  try {
    console.log('Saving download brochure data (simple)...');
    
    const docRef = await addDoc(collection(db, 'download_brochure'), {
      ...formData,
      type: 'download_brochure',
      createdAt: new Date().toISOString(),
      submittedAt: Date.now()
    });
    
    console.log('✅ Download brochure data saved with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Error saving download brochure data: ', error);
    return { success: false, error: error.message };
  }
};