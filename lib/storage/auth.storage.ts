import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export enum AuthStorageKey {
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token'
}

class AuthStorage {
  private isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  async saveToken(access_token: string, refresh_token: string) {
    if (!this.isMobile) {
      return await this._webSaveToken(access_token, refresh_token);
    }

    await SecureStore.setItemAsync(AuthStorageKey.AccessToken, access_token);
    await SecureStore.setItemAsync(AuthStorageKey.RefreshToken, refresh_token);

    return true;
  }

  private async _webSaveToken(access_token: string, refresh_token: string) {
    await AsyncStorage.setItem(AuthStorageKey.AccessToken, access_token);
    await AsyncStorage.setItem(AuthStorageKey.RefreshToken, refresh_token);

    return true;
  }

  private async getWebAccessToken() {
    return await AsyncStorage.getItem(AuthStorageKey.AccessToken);
  }
  private async getWebRefreshToken() {
    return await AsyncStorage.getItem(AuthStorageKey.RefreshToken);
  }

  async getAccessToken() {
    if (!this.isMobile) {
      return await this.getWebAccessToken();
    }

    return await SecureStore.getItemAsync(AuthStorageKey.AccessToken);
  }

  async getRefreshToken() {
    if (!this.isMobile) {
      return await this.getWebRefreshToken();
    }

    return await SecureStore.getItemAsync(AuthStorageKey.RefreshToken);
  }
}

export const authStorage = new AuthStorage();
