"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, ChevronDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useSupabaseRealtime } from "@/hooks/useSupabase"
import { supabase } from "@/utils/supabase"

interface BlogPost {
  id: number
  title: string
  author: string
  publish_date: string
  status: string
  slug: string
}

export default function BlogPostTable() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPosts, setSelectedPosts] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  const itemsPerPage = 10

  // Subscribe to realtime updates
  useSupabaseRealtime("blog_posts", "*", (payload) => {
    if (payload.eventType === "INSERT") {
      setPosts((prev) => [payload.new as BlogPost, ...prev])
    } else if (payload.eventType === "UPDATE") {
      setPosts((prev) => prev.map((post) => (post.id === payload.new.id ? (payload.new as BlogPost) : post)))
    } else if (payload.eventType === "DELETE") {
      setPosts((prev) => prev.filter((post) => post.id !== payload.old.id))
    }
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, author, publish_date, status, slug")
        .order("publish_date", { ascending: false })
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error("Error fetching blog posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const togglePostSelection = (id: number) => {
    setSelectedPosts((prev) => (prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]))
  }

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedPosts.length} blog posts?`)) {
      try {
        for (const id of selectedPosts) {
          await supabase.from("blog_posts").delete().eq("id", id)
        }
        setSelectedPosts([])
        fetchPosts()
      } catch (error) {
        console.error("Error deleting blog posts:", error)
      }
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mb-4">
          <div className="flex items-center">
            <Checkbox
              checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
              onCheckedChange={(checked) => {
                setSelectedPosts(checked ? filteredPosts.map((p) => p.id) : [])
              }}
            />
            <span className="ml-2 text-sm text-gray-500">{selectedPosts.length} selected</span>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[200px] sm:w-[300px]"
              />
            </div>
            {selectedPosts.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Bulk Actions <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleBulkDelete}>Delete Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading blog posts...
                  </TableCell>
                </TableRow>
              ) : filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No blog posts found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedPosts.includes(post.id)}
                        onCheckedChange={() => togglePostSelection(post.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>{new Date(post.publish_date).toLocaleDateString()}</TableCell>
                    <TableCell>{post.status}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => (window.location.href = `/admin/blog/edit/${post.id}`)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => (window.location.href = `/blog/${post.slug}`)}>
                            View
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={async () => {
                              if (window.confirm("Are you sure you want to delete this blog post?")) {
                                await supabase.from("blog_posts").delete().eq("id", post.id)
                                fetchPosts()
                              }
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

