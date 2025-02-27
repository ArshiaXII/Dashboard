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
import { PlusCircle, MoreHorizontal, ChevronDown, Search } from "lucide-react"
import { BlogPostFormModal } from "@/components/admin/blog-post-form-modal"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface BlogPost {
  id: number
  title: string
  author: string
  publishDate: string
  status: string
}

export default function AdminBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPosts, setSelectedPosts] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const itemsPerPage = 10

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog-posts")
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts")
      }
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      })
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)

  const togglePostSelection = (id: number) => {
    setSelectedPosts((prev) => (prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]))
  }

  const handleBulkAction = async (action: string) => {
    if (action === "delete") {
      try {
        for (const id of selectedPosts) {
          await fetch(`/api/blog-posts/${id}`, {
            method: "DELETE",
          })
        }
        fetchPosts()
        setSelectedPosts([])
        toast({
          title: "Success",
          description: "Selected blog posts deleted",
        })
      } catch (error) {
        console.error("Error deleting blog posts:", error)
        toast({
          title: "Error",
          description: "Failed to delete blog posts",
          variant: "destructive",
        })
      }
    }
  }

  const handleAddOrUpdatePost = async (post: BlogPost) => {
    try {
      const method = post.id ? "PUT" : "POST"
      const url = post.id ? `/api/blog-posts/${post.id}` : "/api/blog-posts"
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })
      if (!response.ok) {
        throw new Error(`Failed to ${post.id ? "update" : "add"} blog post`)
      }
      fetchPosts()
      setIsModalOpen(false)
      setEditingPost(null)
      toast({
        title: "Success",
        description: `Blog post ${post.id ? "updated" : "added"} successfully`,
      })
    } catch (error) {
      console.error(`Error ${post.id ? "updating" : "adding"} blog post:`, error)
      toast({
        title: "Error",
        description: `Failed to ${post.id ? "update" : "add"} blog post`,
        variant: "destructive",
      })
    }
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setIsModalOpen(true)
  }

  const handleDeletePost = async (id: number) => {
    try {
      await fetch(`/api/blog-posts/${id}`, {
        method: "DELETE",
      })
      fetchPosts()
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting blog post:", error)
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold">Blog Posts</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Blog Post
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-1/2">
              <Input
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4 text-gray-500" />}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mb-4">
            <div className="flex items-center">
              <Checkbox
                checked={selectedPosts.length === paginatedPosts.length}
                onCheckedChange={(checked) => {
                  setSelectedPosts(checked ? paginatedPosts.map((p) => p.id) : [])
                }}
              />
              <span className="ml-2 text-sm text-gray-500">{selectedPosts.length} selected</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Bulk Actions <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => handleBulkAction("delete")}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                {paginatedPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedPosts.includes(post.id)}
                        onCheckedChange={() => togglePostSelection(post.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>{post.publishDate}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleEditPost(post)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeletePost(post.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPosts.length)}{" "}
          of {filteredPosts.length} blog posts
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((old) => Math.min(old + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <BlogPostFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingPost(null)
        }}
        onSubmit={handleAddOrUpdatePost}
        post={editingPost}
      />
    </div>
  )
}

