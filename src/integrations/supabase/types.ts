export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string
          booking_time: string
          client_id: string | null
          created_at: string | null
          duration: string
          id: string
          location: string | null
          notes: string | null
          price: number
          provider_id: string | null
          skill_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          booking_date: string
          booking_time: string
          client_id?: string | null
          created_at?: string | null
          duration: string
          id?: string
          location?: string | null
          notes?: string | null
          price: number
          provider_id?: string | null
          skill_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          booking_date?: string
          booking_time?: string
          client_id?: string | null
          created_at?: string | null
          duration?: string
          id?: string
          location?: string | null
          notes?: string | null
          price?: number
          provider_id?: string | null
          skill_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          gradient: string | null
          icon_type: string
          id: string
          skill_count: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          gradient?: string | null
          icon_type: string
          id?: string
          skill_count?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          gradient?: string | null
          icon_type?: string
          id?: string
          skill_count?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          bio: string | null
          created_at: string
          email: string | null
          id: string
          location: string | null
          name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          id: string
          location?: string | null
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          location?: string | null
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          helpful_count: number | null
          id: string
          rating: number | null
          reviewer_id: string | null
          skill_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          rating?: number | null
          reviewer_id?: string | null
          skill_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          rating?: number | null
          reviewer_id?: string | null
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          duration: string
          expertise: string[] | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_top_rated: boolean | null
          location: string | null
          price: number
          provider_id: string | null
          published_date: string | null
          subcategory_id: string | null
          title: string
          updated_at: string | null
          use_cases: string[] | null
          weekly_exchanges: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          duration: string
          expertise?: string[] | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_top_rated?: boolean | null
          location?: string | null
          price: number
          provider_id?: string | null
          published_date?: string | null
          subcategory_id?: string | null
          title: string
          updated_at?: string | null
          use_cases?: string[] | null
          weekly_exchanges?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string
          expertise?: string[] | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_top_rated?: boolean | null
          location?: string | null
          price?: number
          provider_id?: string | null
          published_date?: string | null
          subcategory_id?: string | null
          title?: string
          updated_at?: string | null
          use_cases?: string[] | null
          weekly_exchanges?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skills_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skills_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      subcategories: {
        Row: {
          category_id: string | null
          created_at: string | null
          id: string
          skill_count: number | null
          title: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          skill_count?: number | null
          title: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          skill_count?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_skills: {
        Row: {
          created_at: string
          id: string
          skill: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          skill: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          skill?: string
          user_id?: string
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
