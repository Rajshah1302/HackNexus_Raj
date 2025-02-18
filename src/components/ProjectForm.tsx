"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function ProjectForm() {
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [githubLink, setGithubLink] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!projectName || !description || !githubLink) {
      setError("All fields are required")
      return
    }

    // Here you would typically send the data to your backend
    console.log({ projectName, description, githubLink })
    alert("Form submitted successfully!")
    // Reset form
    setProjectName("")
    setDescription("")
    setGithubLink("")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Project</CardTitle>
        <CardDescription>Enter your project details below</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubLink">GitHub Link</Label>
            <Input
              id="githubLink"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="Enter GitHub link"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit Project
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

