import {
  ICreateNewNote,
  INote,
  INoteWithTagName,
  IUpdateNote
} from '@lib/models/note.model';
import { BaseService } from './base.service';

class NoteService extends BaseService {
  async fetchLatestNote(userUid: string) {
    const { data, error } = await this.client
      .from('notes')
      .select()
      .eq('userId', userUid)

      .limit(1);

    if (error) {
      throw error;
    }

    return data;
  }

  async fetchLatestNotes(userUid: string): Promise<INoteWithTagName[]> {
    const { data, error } = await this.client
      .from('notes')
      .select('*, tag:tagId(name)')
      .eq('userId', userUid)
      .returns<INoteWithTagName[]>();

    if (error) {
      throw error;
    }

    return data;
  }

  async addNewNote(_data: ICreateNewNote) {
    const { data, error } = await this.client
      .from('notes')
      .insert(_data)
      .select('*, tag:tagId(name)')
      .limit(1)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async deleteNote(noteUid: string) {
    const { error } = await this.client
      .from('notes')
      .delete()
      .eq('id', noteUid);

    if (error) {
      throw error;
    }
  }

  async updateNote(noteUid: string, _data: IUpdateNote) {
    const { error } = await this.client
      .from('notes')
      .update(_data)
      .eq('id', noteUid);

    if (error) {
      throw error;
    }
  }
  async fetchNote(noteUid: string): Promise<INote> {
    const { data, error } = await this.client
      .from('notes')
      .select()
      .eq('id', noteUid)
      .limit(1)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
}

export const noteService = new NoteService();
