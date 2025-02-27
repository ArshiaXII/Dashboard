export interface BlogPost {
  id: number
  title: string
  slug: string
  image: string
  date: string
  content?: string
  excerpt?: string
  author?: {
    name: string
    avatar?: string
    role?: string
  }
  category?: string
  readTime?: number
}

