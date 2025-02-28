export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      amenities: {
        Row: {
          id: number
          name: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          created_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: number
          title: string
          content: string
          author: string
          publish_date: string
          status: string
          featured_image: string | null
          slug: string
          excerpt: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          title: string
          content: string
          author: string
          publish_date?: string
          status?: string
          featured_image?: string | null
          slug: string
          excerpt?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          title?: string
          content?: string
          author?: string
          publish_date?: string
          status?: string
          featured_image?: string | null
          slug?: string
          excerpt?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_fkey"
            columns: ["author"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      images: {
        Row: {
          id: number
          property_id: number
          url: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: number
          property_id: number
          url: string
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          property_id?: number
          url?: string
          is_primary?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "images_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          id: number
          name: string
          email: string
          phone: string | null
          message: string
          property_id: number | null
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          phone?: string | null
          message: string
          property_id?: number | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          phone?: string | null
          message?: string
          property_id?: number | null
          status?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          id: number
          title: string
          description: string
          price: number
          location: string
          address: string
          city: string
          country: string
          postal_code: string | null
          latitude: number | null
          longitude: number | null
          bedrooms: number
          bathrooms: number
          area: number
          year_built: number | null
          property_type: string
          status: string
          featured: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          title: string
          description: string
          price: number
          location: string
          address: string
          city: string
          country: string
          postal_code?: string | null
          latitude?: number | null
          longitude?: number | null
          bedrooms: number
          bathrooms: number
          area: number
          year_built?: number | null
          property_type: string
          status?: string
          featured?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          title?: string
          description?: string
          price?: number
          location?: string
          address?: string
          city?: string
          country?: string
          postal_code?: string | null
          latitude?: number | null
          longitude?: number | null
          bedrooms?: number
          bathrooms?: number
          area?: number
          year_built?: number | null
          property_type?: string
          status?: string
          featured?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      property_amenities: {
        Row: {
          id: number
          property_id: number
          amenity_id: number
          created_at: string
        }
        Insert: {
          id?: number
          property_id: number
          amenity_id: number
          created_at?: string
        }
        Update: {
          id?: number
          property_id?: number
          amenity_id?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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

