"use client";

import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import Navbar from "../../../components/navbar";

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

const AllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
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
            slug
          }`
      );
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div className=" min-h-screen text-white py-12 mt-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">My Projects</h1>
          <p className="text-gray-400 mt-2">
            Discover some of the amazing projects I've worked on!
          </p>
        </div>

        {/* Projects Grid */}
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              href={`/project/${project.slug.current}`}
              key={index}
              className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              {/* Image */}
              <div className="w-full h-56 overflow-hidden">
                <img
                  src={project.mainImage?.asset?.url || project.additionalImages[0]?.asset?.url}
                  alt={project.title}
                  className="w-full h-full object-cover transition duration-300 hover:opacity-80"
                />
              </div>

              {/* Card Content */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
                <div>
                  <h4 className="text-lg font-semibold relative inline-block">
                    {project.title}
                    {/* Underline effect on hover */}
                    <span className="block w-0 h-1 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                  </h4>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProjects;
