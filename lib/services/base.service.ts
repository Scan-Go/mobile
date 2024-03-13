import { supabase } from "./supabase.service";

export class BaseService {
  protected client = supabase;
}
