import { Search } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function ProjectShowcase() {
  const projects = [
    {
      id: 1,
      title: "PredictX",
      description:
        "PredictX is a decentralized prediction market game where you can test your forecasting skills against cutting-edge AI. Bet with or against AI predictions on real-world events, earn rewards, and climb the leaderboard.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZgEzIBIBvwTYwjDqThWzAg0MMv5IRi.png",
      tag: "AGENTIC ETHEREUM",
    },
    {
      id: 2,
      title: "Asap",
      description:
        "ASAP Protocol leverages autonomous on-chain AI agents to revolutionize DAO governance by streamlining decision-making, increasing community participation, and simplifying complex voting processes.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZgEzIBIBvwTYwjDqThWzAg0MMv5IRi.png",
      tag: "AGENTIC ETHEREUM",
    },
    {
      id: 3,
      title: "MoodMeme",
      description:
        "MoodMeme: AI-powered Telegram bot that generates hilarious crypto memes using real-time market data. Drop a token name, get back a perfectly timed meme with snarky AI captions.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZgEzIBIBvwTYwjDqThWzAg0MMv5IRi.png",
      tag: "AGENTIC ETHEREUM",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Find a Project</h1>
          <p className="text-gray-400 text-lg mb-8">Check out the projects created at past events</p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/4 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-black/50 border-gray-800 text-white placeholder:text-gray-400"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-[200px] bg-black/50 border-gray-800 text-white">
                <SelectValue placeholder="Select events" />
              </SelectTrigger>
              <SelectContent className="w-full sm:w-[200px] bg-black/50 border-gray-800 text-white">
                <SelectItem value="ethglobal">ETHGlobal</SelectItem>
                <SelectItem value="ethonline">ETH Online</SelectItem>
                <SelectItem value="ethnewyork">ETH New York</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-black/40 border-gray-800 backdrop-blur-sm overflow-hidden group">
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
                <button className="absolute top-4 right-4 z-20 bg-white/10 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Badge  className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20">
                  {project.tag}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

