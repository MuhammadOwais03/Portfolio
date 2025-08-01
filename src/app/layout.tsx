import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Foote from "../../components/foote"; // Optional — remove if unused
import ChatbotUI from "../../components/ChatBotUI";


export const metadata: Metadata = {
  title: "Muhammad Owais | Full-Stack Developer (Django & MERN)",
  description: "Full-Stack Developer specializing in Django, React, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, SQL, and modern web development.",
  keywords: [
    "Muhammad Owais", "Full-Stack Developer", "Django", "MERN Stack",
    "React", "Next.js", "Node.js", "Express.js", "MongoDB", "SQL",
    "GitHub", "HTML5", "CSS3", "JavaScript", "C++", "Tailwind CSS",
    "REST API", "GraphQL", "Python", "FastAPI", "TypeScript",
    "Frontend Developer", "Backend Developer", "API Development", 
    "Web Performance", "UI/UX", "Scalable Web Apps", "Software Engineer", 
    "Computer System Engineer", "NED University of Engineering and Technology",
  ],
  icons: {
    icon: "/logo1.png",
  },
  openGraph: {
    title: "Muhammad Owais | Full-Stack Developer (Django & MERN)",
    description: "I specialize in building scalable full-stack applications using Django, React, Next.js, and Node.js.",
    url: "https://portfolio-muhammadowais03s-projects.vercel.app/",
    type: "website",
    images: [
      {
        url: "/logo1.png",
        width: 800,
        height: 900,
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
        <link rel="icon" href="/logo1.png" type="image/png" />
        

            <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
          
        <link rel="canonical" href="https://portfolio-muhammadowais03s-projects.vercel.app/" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ display: 'flex', flexDirection: "column" }}>
        {children}
        {/* <Foote /> Optional */}
        {/* <ChatbotUI/> */}
      </body>
    </html>
  );
}
