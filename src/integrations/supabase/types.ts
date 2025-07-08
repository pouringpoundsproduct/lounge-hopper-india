export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      cards: {
        Row: {
          Card_ID: number | null
          Card_Name: string | null
          CG_Name: string | null
          id: number
        }
        Insert: {
          Card_ID?: number | null
          Card_Name?: string | null
          CG_Name?: string | null
          id: number
        }
        Update: {
          Card_ID?: number | null
          Card_Name?: string | null
          CG_Name?: string | null
          id?: number
        }
        Relationships: []
      }
      cards_lounge: {
        Row: {
          card_id: number | null
          card_name: string | null
          lounge_id: number | null
          network: string | null
          sr_no: number
        }
        Insert: {
          card_id?: number | null
          card_name?: string | null
          lounge_id?: number | null
          network?: string | null
          sr_no: number
        }
        Update: {
          card_id?: number | null
          card_name?: string | null
          lounge_id?: number | null
          network?: string | null
          sr_no?: number
        }
        Relationships: [
          {
            foreignKeyName: "cards_lounge_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["Card_ID"]
          },
          {
            foreignKeyName: "cards_lounge_lounge_id_fkey"
            columns: ["lounge_id"]
            isOneToOne: false
            referencedRelation: "LoungesDB"
            referencedColumns: ["Lounge_Id"]
          },
        ]
      }
      LoungesDB: {
        Row: {
          "Access Eligibility": string | null
          "Airport Name": string | null
          "Business Facilities": string | null
          City: string | null
          Combined: string | null
          "Food & Beverages": string | null
          "Guest Policy": string | null
          "How to Find Inside Terminal": string | null
          "Kids’ Play Area": string | null
          "Location (Terminal, Concourse, Gate, Floor)": string | null
          "Lounge Access Programs": string | null
          "Lounge Name": string | null
          "Lounge Photos": string | null
          Lounge_Id: number
          "Maps/Wayfinding Details": string | null
          "Nap/Quiet Areas": string | null
          "Opening Hours": string | null
          Operator: string | null
          "Paid Access Fee": string | null
          "Seating Type": string | null
          Showers: string | null
          State: string | null
          terminal: string | null
          "User Ratings": string | null
          "Video Walkthrough": string | null
          "Wi-Fi": string | null
        }
        Insert: {
          "Access Eligibility"?: string | null
          "Airport Name"?: string | null
          "Business Facilities"?: string | null
          City?: string | null
          Combined?: string | null
          "Food & Beverages"?: string | null
          "Guest Policy"?: string | null
          "How to Find Inside Terminal"?: string | null
          "Kids’ Play Area"?: string | null
          "Location (Terminal, Concourse, Gate, Floor)"?: string | null
          "Lounge Access Programs"?: string | null
          "Lounge Name"?: string | null
          "Lounge Photos"?: string | null
          Lounge_Id: number
          "Maps/Wayfinding Details"?: string | null
          "Nap/Quiet Areas"?: string | null
          "Opening Hours"?: string | null
          Operator?: string | null
          "Paid Access Fee"?: string | null
          "Seating Type"?: string | null
          Showers?: string | null
          State?: string | null
          terminal?: string | null
          "User Ratings"?: string | null
          "Video Walkthrough"?: string | null
          "Wi-Fi"?: string | null
        }
        Update: {
          "Access Eligibility"?: string | null
          "Airport Name"?: string | null
          "Business Facilities"?: string | null
          City?: string | null
          Combined?: string | null
          "Food & Beverages"?: string | null
          "Guest Policy"?: string | null
          "How to Find Inside Terminal"?: string | null
          "Kids’ Play Area"?: string | null
          "Location (Terminal, Concourse, Gate, Floor)"?: string | null
          "Lounge Access Programs"?: string | null
          "Lounge Name"?: string | null
          "Lounge Photos"?: string | null
          Lounge_Id?: number
          "Maps/Wayfinding Details"?: string | null
          "Nap/Quiet Areas"?: string | null
          "Opening Hours"?: string | null
          Operator?: string | null
          "Paid Access Fee"?: string | null
          "Seating Type"?: string | null
          Showers?: string | null
          State?: string | null
          terminal?: string | null
          "User Ratings"?: string | null
          "Video Walkthrough"?: string | null
          "Wi-Fi"?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
