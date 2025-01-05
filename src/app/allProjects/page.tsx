"use client";

import '../../../components/styles/allProjects.css';
import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import '../../../components/styles/allProjects.css';
import Navbar from '../../../components/navbar';

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
    current: string
  }
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

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  return (
    <>
      <Navbar />
      <div className="all-projects">
        <div className="projects-upper">
          <h1>My Projects</h1>
          <p>Discover some of the amazing projects I've worked on!</p>
        </div>

        <div className="all-projects-cards-container">
          {projects.map((project, index) => (
            <a href={`/project/${project.slug.current}`} key={index} className="projects-card">
              <div className="projects-card-image">
                <img src={project.mainImage?.asset?.url || project.additionalImages[0]?.asset?.url} alt={project.title} />
              </div>
              <div className="projects-card-name">
                <h4>{project.title}</h4>
              </div>


            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProjects;
