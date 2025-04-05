import Dexie from 'dexie';
import { formSubmitFrom, statusEnum } from '../utils/enums';
import { saveUserDetails, UserDetailsType } from '../service/saveUserDetails';

type submissionType = {
  formData: {[key: string]: any}; 
  action: formSubmitFrom; 
  status: statusEnum; 
  createdAt: Date; 
  version: number
}

class OfflineStoreManager {
  private static instance: OfflineStoreManager;
  private db: Dexie;

  private constructor() {
    this.db = new Dexie('OfflineSyncDB');
    this.db.version(1).stores({
        submissions: '++id, formData, action, status, createdAt, version',
    });
  }

  public static getInstance(): OfflineStoreManager {
    if (!OfflineStoreManager.instance) {
      OfflineStoreManager.instance = new OfflineStoreManager();
    }
    return OfflineStoreManager.instance;
  }

  public async addFormData(data: submissionType): Promise<void> {
    try {
      await this.db.table('submissions').add(data);
    } catch (error) {
      console.error('Error adding form data to Dexie:', error);
    }
  }

  public async clearFormData(): Promise<void> {
    try {
      await this.db.table('submissions').clear();
    } catch (error) {
      console.error('Error clearing form data in Dexie:', error);
    }
  }

  public async deleteFormData(id: number): Promise<void> {
    try {
      await this.db.table('submissions').delete(id);
    } catch (error) {
      console.error('Error deleting form data in Dexie:', error);
    }
  }

  public isOnline(): boolean {
    return navigator.onLine;
  }

  public async processPendingSubmissions(): Promise<void> {
    try {
      const pendingSubmissions: ({id: number }&submissionType)[] = await this.db.table('submissions').where('status').equals(statusEnum.PENDING).toArray();

      for (const submission of pendingSubmissions) {
        try {
          if(submission.action === formSubmitFrom.SAVEUSERDETAILS) {
            console.log('Saving user details...', submission.formData);
            const res = await saveUserDetails(submission.formData as UserDetailsType);
            console.log('Form submitted to API:', res);
            if("error" in res) {
              alert(`Error: ${res.error}`);
              await this.db.table('submissions').update(submission.id, {status: statusEnum.ERROR});
              continue;
            }
          }
          await this.db.table('submissions').delete(submission.id);
          alert(`Submission processed successfully! Date: ${submission.createdAt.toLocaleString()}`);
        } catch (error) {
          console.error('Error processing submission:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching pending submissions from Dexie:', error);
    }
  }

}

export default OfflineStoreManager;
