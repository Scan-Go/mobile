import { Tables } from './supabase';
import { ITag } from './tag.model';

export type INote = Tables<'notes'>;

export type INoteWithTagName = INote & { tag: Pick<ITag, 'name'> };
