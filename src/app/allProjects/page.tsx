"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Github, Eye, ArrowUpRight } from "lucide-react";
import { client } from "@/lib/sanity";
import Navbar from "../../../components/navbar";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  additionalImages: {
    asset: {
      url: string;
    };
  }[];
  technologies: string[];
  url: string;
  Gurl: string;
  slug: {
    current: string;
  };
}

// Add your Sanity client import here
// import { client } from "../../lib/sanity";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
    <div
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 animate-fade-in-up`}
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'both'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-sm"></div>
      
      {/* Card content */}
      <div className="relative bg-gray-900 rounded-2xl m-0.5 overflow-hidden">
        {/* Image container with overlay effects */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.mainImage?.asset?.url || project.additionalImages[0]?.asset?.url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Action buttons with actual links */}
          <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
            {project.url && (
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300"
              >
                <ExternalLink size={16} className="text-white" />
              </a>
            )}
            {project.Gurl && (
              <a 
                href={project.Gurl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300"
              >
                <Github size={16} className="text-white" />
              </a>
            )}
          </div>
          
          {/* View project button with actual link */}
          <div className={`absolute bottom-4 left-4 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <a 
              href={`/project/${project.slug.current}`}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors duration-300"
            >
              <Eye size={16} />
              <span className="text-sm font-medium">View Project</span>
            </a>
          </div>
        </div>
        
        {/* Card content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
              {project.title}
            </h3>
            <ArrowUpRight 
              size={20} 
              className={`text-gray-400 transition-all duration-500 group-hover:text-purple-400 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`}
            />
          </div>
          
          <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies?.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className={`px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium transition-all duration-300 hover:bg-purple-600 hover:text-white transform hover:scale-105 animate-slide-in`}
                style={{
                  animationDelay: `${(index * 150) + (techIndex * 100)}ms`,
                  animationFillMode: 'both'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Progress bar animation */}
          <div className="w-full bg-gray-700 rounded-full h-1 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ${isHovered ? 'w-full' : 'w-0'}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

const AllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Replace 'client' with your actual Sanity client import
        const data = await client.fetch<Project[]>(
          `*[_type == "project"]{
            title,
            description,
            mainImage {
              asset->{url}
            },
            additionalImages[] {
              asset->{url}
            },
            technologies,
            url,
            Gurl,
            slug
          }`
        );
        setProjects(data);
        setLoading(false);

        console.log(data)

      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  if (loading) {
    return (
      
      <>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </div>
        </>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-blue-500 rounded-full opacity-5 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="relative z-10 py-20 px-4">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
            My Projects
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 animate-expand"></div>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed animate-fade-in-up" style={{animationDelay: '300ms', animationFillMode: 'both'}}>
            Discover some of the amazing projects I've crafted with passion and precision. Each one represents a unique challenge and creative solution.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16 animate-fade-in-up" style={{animationDelay: '800ms', animationFillMode: 'both'}}>
          <p className="text-gray-400 mb-6">Interested in working together?</p>
          <Link href="/contact" className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
            <span className="relative z-10">Get In Touch</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes expand {
          from { width: 0; }
          to { width: 96px; }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-expand {
          animation: expand 1s ease-out 0.5s both;
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
    </>
  );
};

export default AllProjects;