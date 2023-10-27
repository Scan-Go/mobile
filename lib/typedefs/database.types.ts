export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      announcment: {
        Row: {
          content: string
          created_at: string
          id: number
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      category: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      note: {
        Row: {
          content: string
          created_at: string
          expires: string
          id: number
          userId: string
        }
        Insert: {
          content: string
          created_at?: string
          expires?: string
          id?: number
          userId: string
        }
        Update: {
          content?: string
          created_at?: string
          expires?: string
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tag: {
        Row: {
          created_at: string
          id: number
          name: string
          userId: string
          uuid: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          userId: string
          uuid?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          userId?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "tag_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
