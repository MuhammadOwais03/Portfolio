"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Github,
  ExternalLink,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Code,
  Layers,
  ArrowLeft,
  Menu,
  Sparkles
} from "lucide-react";
import { client } from "@/lib/sanity";

// Define types for the project data
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
}

interface AllProjectsName {
  title: string;
  slug: {
    current: string;
  };
}

const ProjectDetail = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [allProjectsName, setAllProjectsName] = useState<AllProjectsName[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const param = useParams();
  const router = useRouter();
  const slug = param?.slug as string;

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await client.fetch<Project[]>(
          `*[_type == "project" && slug.current == $slug] {
            title,
            description,
            mainImage { asset->{url} },
            additionalImages[] { asset->{url} },
            technologies,
            url,
            Gurl
          }`,
          { slug }
        );
        
        if (data.length > 0) {
          setProject(data[0]);
        } else {
          setError("Project not found");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project data");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  // Fetch all projects for navigation
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const data = await client.fetch<AllProjectsName[]>(
          `*[_type == "project"] {
            title,
            slug
          } | order(title asc)`
        );
        setAllProjectsName(data);
      } catch (err) {
        console.error("Error fetching all projects:", err);
      }
    };

    fetchAllProjects();
  }, []);

  // Modal handlers
  const openModal = useCallback((imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentImageIndex(null);
    document.body.style.overflow = 'auto';
  }, []);

  const handleNextImage = useCallback(() => {
    if (currentImageIndex !== null && project?.additionalImages) {
      setCurrentImageIndex(
        (currentImageIndex + 1) % project.additionalImages.length
      );
    }
  }, [currentImageIndex, project?.additionalImages]);

  const handlePrevImage = useCallback(() => {
    if (currentImageIndex !== null && project?.additionalImages) {
      setCurrentImageIndex(
        (currentImageIndex - 1 + project.additionalImages.length) %
        project.additionalImages.length
      );
    }
  }, [currentImageIndex, project?.additionalImages]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          handlePrevImage();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal, handlePrevImage, handleNextImage]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest('.menu-container')) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Back navigation handler
  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/projects'); // Fallback to projects page
    }
  }, [router]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-2 border-purple-500 border-t-transparent mx-auto mb-4"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-purple-400 opacity-20"></div>
          </div>
          <p className="text-gray-400 animate-pulse">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {error || "Project Not Found"}
          </h2>
          <p className="text-gray-400 mb-6">
            {error === "Project not found" 
              ? "The requested project could not be found." 
              : "There was an error loading the project."}
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-blue-500 rounded-full opacity-5 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Navigation Header */}
        <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300 hover:bg-gray-800/50 rounded-lg"
              >
                <ArrowLeft size={20} />
                <span>Back to Projects</span>
              </button>

              {/* Project Dropdown */}
              <div className="relative menu-container">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300 border border-gray-700"
                >
                  <Menu size={20} />
                  <span>Other Projects</span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800/90 backdrop-blur-lg rounded-lg border border-gray-700 shadow-xl animate-fade-in-up">
                    <div className="p-2 max-h-80 overflow-y-auto">
                      {allProjectsName.length > 0 ? (
                        allProjectsName
                          .filter(p => p.slug.current !== slug) // Don't show current project
                          .map((projectName, index) => (
                            <a
                              href={`/project/${projectName.slug.current}`}
                              key={projectName.slug.current}
                              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300 animate-slide-in"
                              style={{ animationDelay: `${index * 50}ms` }}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {projectName.title}
                            </a>
                          ))
                      ) : (
                        <div className="px-4 py-3 text-gray-400 text-sm">
                          No other projects available
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Project Title */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {project.title}
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto animate-expand"></div>
            </div>

            {/* Project Links */}
            <div className="flex justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              {project.Gurl && (
                <a
                  href={project.Gurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-full transition-all duration-300 border border-gray-700 hover:border-purple-500"
                >
                  <Github size={20} className="group-hover:text-purple-400 transition-colors duration-300" />
                  <span>View Code</span>
                </a>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <ExternalLink size={20} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            {/* Project Description */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <Sparkles size={24} className="text-purple-400" />
                  </div>
                  <h2 className="text-3xl font-bold">About This Project</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '700ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <Code size={24} className="text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold">Technologies Used</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full text-sm font-medium hover:from-purple-800 hover:to-pink-800 transition-all duration-300 transform hover:scale-105 cursor-default animate-slide-in"
                      style={{ animationDelay: `${700 + (index * 100)}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Images */}
            {project.additionalImages && project.additionalImages.length > 0 && (
              <div className="animate-fade-in-up" style={{ animationDelay: '900ms' }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-pink-600/20 rounded-lg">
                    <Eye size={24} className="text-pink-400" />
                  </div>
                  <h2 className="text-3xl font-bold">Project Gallery</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.additionalImages.map((image, index) => (
                    <div
                      key={index}
                      className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up ${
                        index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                      }`}
                      style={{ animationDelay: `${1000 + (index * 150)}ms` }}
                      onClick={() => openModal(index)}
                    >
                      <div className="relative overflow-hidden rounded-xl bg-gray-800">
                        <img
                          src={image.asset.url}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* View icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                            <Eye size={24} className="text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && currentImageIndex !== null && project.additionalImages && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="relative max-w-4xl max-h-full">
              <img
                src={project.additionalImages[currentImageIndex].asset.url}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-300"
                aria-label="Close modal"
              >
                <X size={24} className="text-white" />
              </button>

              {/* Navigation buttons */}
              {project.additionalImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-300"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white text-sm">
                {currentImageIndex + 1} / {project.additionalImages.length}
              </div>
            </div>
          </div>
        )}
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
          to { width: 128px; }
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
      `}</style>
    </div>
  );
};

export default ProjectDetail;