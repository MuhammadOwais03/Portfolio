import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Foote from "../../components/foote"; // Ensure this path is correct




export const metadata: Metadata = {
  title: "Muhammad Owais | Full-Stack Developer (Django & MERN)",
  description: "Full-Stack Developer specializing in Django, React, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, SQL, and modern web development.",
  keywords: [
    // Core Technologies
    "Muhammad Owais", "Full-Stack Developer", "Django", "MERN Stack",
    "React", "Next.js", "Node.js", "Express.js", "MongoDB", "SQL",
    
    // Additional Skills (from your icons)
    "GitHub", "HTML5", "CSS3", "JavaScript", "C++", "Tailwind CSS",
    "REST API", "GraphQL", "Python", "FastAPI", "TypeScript",
    
    // General Web Development
    "Frontend Developer", "Backend Developer", "API Development", 
    "Web Performance", "UI/UX", "Scalable Web Apps", "Software Engineer", "Computer System Engineer", "Computer and Information System Engineer", "NED Univeristy of Engineering and Technology",
    
  ],
  icons: {
    icon: "/Mu.png",
  },
  openGraph: {
    title: "Muhammad Owais | Full-Stack Developer (Django & MERN)",
    description: "I specialize in building scalable full-stack applications using Django, React, Next.js, and Node.js.",
    url: "https://portfolio-muhammadowais03s-projects.vercel.app/", // Replace with your portfolio link
    type: "website",
    images: [
      {
        url: "/Mu.png",
        width: 800,
        height: 600,
        alt: "Muhammad Owais Logo",
      },
    ],
  },
};



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Mu.png" type="image/png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `} style={{display:'flex', flexDirection:"column"}}>
        {children}
     
      </body>
    </html>
  );
}
