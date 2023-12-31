export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      brands: {
        Row: {
          created_at: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          slug?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      genres: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          slug: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          slug?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      lures: {
        Row: {
          brand_id: string
          created_at: string | null
          genre_id: string
          id: string
          image_url: string | undefined
          length: string | null
          name: string
          price: string | null
          weight: string | null
        }
        Insert: {
          brand_id: string
          created_at?: string | null
          genre_id: string
          id?: string
          image_url?: string | undefined
          length?: string | null
          name: string
          price?: string | null
          weight?: string | null
        }
        Update: {
          brand_id?: string
          created_at?: string | null
          genre_id?: string
          id?: string
          image_url?: string | undefined
          length?: string | null
          name?: string
          price?: string | null
          weight?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'lures_brand_id_fkey'
            columns: ['brand_id']
            referencedRelation: 'brands'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'lures_genre_id_fkey'
            columns: ['genre_id']
            referencedRelation: 'genres'
            referencedColumns: ['id']
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | undefined
          created_at: string | null
          id: string
          text: string | undefined
          user_id: string
          username: string | undefined
        }
        Insert: {
          avatar_url?: string | undefined
          created_at?: string | null
          id: string
          user_id: string
          text?: string | undefined
          username?: string | undefined
        }
        Update: {
          avatar_url?: string | undefined
          created_at?: string | null
          id?: string
          user_id: string
          text?: string | undefined
          username?: string | undefined
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string | null
          id: string
          lure_id: string
          rating_2: number
          rating_3: number
          rating_4: number
          rating_5: number
          rating_1: number
          text: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id: string
          lure_id?: string
          rating_2?: number
          rating_3?: number
          rating_4?: number
          rating_5?: number
          rating_1?: number
          text?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          lure_id?: string
          rating_2?: number
          rating_3?: number
          rating_4?: number
          rating_5?: number
          rating_1?: number
          text?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'reviews_lure_id_fkey'
            columns: ['lure_id']
            referencedRelation: 'lures'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reviews_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'buckets_owner_fkey'
            columns: ['owner']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey'
            columns: ['bucket_id']
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'objects_owner_fkey'
            columns: ['owner']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
