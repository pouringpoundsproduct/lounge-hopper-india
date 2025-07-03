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
