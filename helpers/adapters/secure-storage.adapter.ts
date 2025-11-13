import * as SecureStore from 'expo-secure-store';
export class sucereStorageAdapter { 


    static async setItem(key: string, value: string) {
        try {
            await SecureStore.setItemAsync(key, value)
        }catch (error) {
            alert('Error failed to save')
        }
    }
    
    static async getItem(key: string) {
        try {
            return await SecureStore.getItemAsync(key)
        }catch (error) {
            alert('Error failed to save')
            return null;
        }
    }

    static async deleteItem(key: string) {
        try {
            await SecureStore.deleteItemAsync(key)
        }catch (error) {
            alert('Error failed to delete')
        }
    }

}


    

