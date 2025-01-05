"use client";
import Navbar from "../../../../components/navbar";
import "../../../../components/styles/project.css";
import "../../../../components/styles/navbar.css";
import { useEffect, useState } from "react";
import { client } from "../../../lib/sanity"; // Import the Sanity client
import { useParams } from "next/navigation";
import { Loading } from "../../../../components/Loading";
// import { GetServerSideProps } from "next";

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

interface allProjectsName {
    title: string;
    slug: {
        current: string;
    };
}

interface ProjectsProps {
    params: {
        slug: string;
    };
}

const Projects: React.FC<ProjectsProps> = ({ params }) => {
    const [project, setProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
    const [allProjectsName, setAllProjectsName] = useState<allProjectsName[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const param = useParams();
    const slug = param?.slug as string;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const fetchProjectNames = async () => {
            try {
                const data = await client.fetch<allProjectsName[]>(`
            *[_type == "project"] {
              title,
              slug
            }
          `);
                setAllProjectsName(data || []);
            } catch (error) {
                console.error("Error fetching project names:", error);
            }
        };

        fetchProjectNames();
    }, []);

    useEffect(() => {
        if (!slug) return;

        const fetchProject = async () => {
            try {
                const data = await client.fetch<Project[]>(`
            *[_type == "project" && slug.current == $slug] {
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
              Gurl
            }
          `, { slug });

                setProject(data.length > 0 ? data[0] : null);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        fetchProject();
    }, [slug]);

    const openModal = (imageIndex: number) => {
        setCurrentImageIndex(imageIndex);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImageIndex(null);
    };

    const handleNextImage = () => {
        if (currentImageIndex !== null && project?.additionalImages) {
            setCurrentImageIndex((currentImageIndex + 1) % project.additionalImages.length);
        }
    };

    const handlePrevImage = () => {
        if (currentImageIndex !== null && project?.additionalImages) {
            setCurrentImageIndex(
                (currentImageIndex - 1 + project.additionalImages.length) % project.additionalImages.length
            );
        }
    };

    if (!project) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            <div id="projects">
                <div className="projects-dropdown">
                    <i
                        className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"}`}
                        onClick={toggleMenu}
                        style={styles.icon}
                    ></i>
                    <div className={`dropdown ${isMenuOpen ? "show" : ""}`}>
                        {allProjectsName.map((projectName) => (
                            <a href={`/project/${projectName.slug.current}`} key={projectName.slug.current}>
                                {projectName.title}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="projects-lower">
                    <div className="project-upper">
                        <h2>{project.title}</h2>
                    </div>

                    <div className="project-links">
                        {project.Gurl && (
                            <a href={project.Gurl} target="_blank" rel="noopener noreferrer">
                                <i className="bx bxl-github" style={styles.icon}></i>
                            </a>
                        )}
                        {project.url && (
                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                                <i className="bx bx-link"></i>
                            </a>
                        )}
                    </div>

                    <div className="project-middle">
                        <h2>Project Description</h2>
                        <p>{project.description}</p>

                        <h2>Technologies:</h2>
                        <ul>
                            {project.technologies.map((technology, index) => (
                                <li key={index} className="technology-item">
                                    {technology}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="project-lower">
                        {project.additionalImages.map((image, index) => (
                            <div
                                key={index}
                                className={`project-lower-img ${index === 0 ? "large" : ""}`}
                                onClick={() => openModal(index)}
                                role="button"
                                tabIndex={0}
                            >
                                <img
                                    src={image.asset.url}
                                    alt={`Additional Image ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>

                    {isModalOpen && currentImageIndex !== null && (
                        <div className="modal" onClick={closeModal}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <img
                                    src={project.additionalImages[currentImageIndex].asset.url}
                                    alt="Selected Project"
                                    aria-label="Selected Project Image"
                                />
                                <button
                                    className="close-btn"
                                    onClick={closeModal}
                                    aria-label="Close Modal"
                                >
                                    &times;
                                </button>
                                <button
                                    className="prev-btn"
                                    onClick={handlePrevImage}
                                    aria-label="Previous Image"
                                >
                                    &#8249;
                                </button>
                                <button
                                    className="next-btn"
                                    onClick={handleNextImage}
                                    aria-label="Next Image"
                                >
                                    &#8250;
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const styles = {
    icon: {
        fontSize: "30px",
        cursor: "pointer",
        transition: "transform 0.3s, color 0.3s",
    },
};

export default Projects;


