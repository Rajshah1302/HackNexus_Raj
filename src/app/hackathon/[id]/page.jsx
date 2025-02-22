// import Image from "next/image";
// import { Github } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import img from '@/assets/nft1.jpeg'
// import ChatPage from "@/app/chatbot/page";
// export default function ProjectProfile() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8 justify-center items-center">
//       <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-[400px_1fr]  my-10 ">
//         {/* Left Column */}
//         <div className="space-y-6">
//           {/* NFT Token Placeholder */}
//           <Card className="border-slate-800 bg-slate-900">
//             <CardContent className="p-6">
//               <div className="aspect-square relative rounded-lg overflow-hidden bg-slate-800">
//                 <Image
//                   src={img}

//                   alt="NFT Token Placeholder"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Hackathon Info */}
//           <Card className="border-slate-800 bg-slate-900">
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold">LNMHacks 7.0</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <h3 className="text-sm font-medium text-slate-400">Track</h3>
//                 <div className="mt-1">
//                   <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30">
//                     DeFi x Ai
//                   </Badge>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Project Details */}
//           <Card className="border-slate-800 bg-slate-900">
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold">DeFi Aggregator</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <h3 className="text-sm font-medium text-slate-400">Description</h3>
//                 <p className="mt-2 text-slate-300">
//                   A decentralized finance aggregator that combines multiple DeFi protocols to provide users with the
//                   best possible trading rates and yield farming opportunities.
//                 </p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* GitHub Link */}
//           <Card className="border-slate-800 bg-slate-900/50">
//             <CardContent className="p-6">
//               <Button
//                 variant="outline"
//                 className="w-full border-slate-700 hover:bg-slate-800 hover:text-slate-50"
//                 // onClick={() => window.open("https://github.com/example/defi-aggregator", "_blank")}
//               >
//                 <Github className="mr-2 h-4 w-4" />
//                 View on GitHub
//               </Button>
//             </CardContent>
//           </Card>
//             <ChatPage repo='https://github.com/Rajshah1302/Frontend'/>
//         </div>
//       </div>
//     </div>
//   );
// }
