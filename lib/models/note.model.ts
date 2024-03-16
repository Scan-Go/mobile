import { Tables } from './supabase';
import { ITag } from './tag.model';

export type INote = Tables<'notes'>;

export type INoteWithTagName = INote & { tag: Pick<ITag, 'name'> };

export type ICreateNewNote = Omit<INote, 'id' | 'created_at'>;

export type IUpdateNote = Partial<
  Pick<INote, 'content' | 'expire_at' | 'tagId'>
>;
