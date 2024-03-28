import { decode } from 'base64-arraybuffer';
import { ImagePickerAsset } from 'expo-image-picker';
import mime from 'mime';
import { BaseService } from './base.service';

class StorageService extends BaseService {
  async uploadAvatar(userUid: string, photo: ImagePickerAsset) {
    const mimeType = photo.mimeType;

    if (!mimeType) return;

    const ext = mime.getExtension(photo.mimeType!);
    const path = `${userUid}/avatar.${ext}`;

    const { data, error } = await this.client.storage
      .from('avatars')
      .upload(path, decode(photo.base64!), {
        upsert: true,
        contentType: mimeType
      });

    if (error) {
      throw error;
    }

    return data;
  }

  getAvatarURL(userUid: string): string {
    const { data } = this.client.storage.from('avatars').getPublicUrl(userUid);

    return data.publicUrl;
  }
}

export const storageService = new StorageService();
