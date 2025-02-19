"use client";
import Navbar from "../../../components/navbar";
import '../../../components/styles/project.css';
import '../../../components/styles/navbar.css';
import { useEffect, useState } from "react";
import { client } from "../../lib/sanity"; // Import the Sanity client

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

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

    // Fetch projects from Sanity
    useEffect(() => {
        const fetchProjects = async () => {
            const data = await client.fetch<Project[]>(
                `*[_type == "project"]{
          title,
          description,
          mainImage{
            asset->{url}
          },
          additionalImages[] {
            asset->{url}
          },
          technologies,
          url,
        Gurl
        }`
            );
            setProjects(data);
        };
        fetchProjects();
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
    };

    const openModal = (imageIndex: number) => {
        setCurrentImageIndex(imageIndex);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImageIndex(null);
    };

    const handleNextImage = () => {
        if (currentImageIndex !== null && projects[currentIndex].additionalImages) {
            setCurrentImageIndex((currentImageIndex + 1) % projects[currentIndex].additionalImages.length);
        }
    };

    const handlePrevImage = () => {
        if (currentImageIndex !== null && projects[currentIndex].additionalImages) {
            setCurrentImageIndex(
                (currentImageIndex - 1 + projects[currentIndex].additionalImages.length) %
                projects[currentIndex].additionalImages.length
            );
        }
    };

    return (
        <>
            <Navbar />
            <div id="projects">
                <div className="projects-upper">
                    <h1>My Projects</h1>
                    <p>Discover some of the amazing projects I've worked on!</p>
                </div>
                <div className="projects-navigation">
                    {projects.map((project, index) => (
                        <button
                            key={index}
                            className={index === currentIndex ? "active" : ""}
                            onClick={() => setCurrentIndex(index)}
                        >
                            {project.title}
                        </button>
                    ))}
                </div>

                {projects.length > 0 && (
                    <div className="projects-lower">
                        <div className="project-upper">
                            <h2>{projects[currentIndex].title}</h2>
                        </div>
                        <div className="bg-black mt-8 flex flex-wrap flex-row justify-center items-center w-full gap-8">

                            {projects[currentIndex].Gurl && (
                                <a
                                    href={projects[currentIndex].Gurl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                ><i className='bx bxl-github' style={styles.icon}></i> </a>
                            )}

                            {projects[currentIndex].url && (
                                <a
                                    href={projects[currentIndex].url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                ><i className='bx bx-link'></i></a>
                            )}
                        </div>
                        <div className="project-middle">
                            <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                <defs>
                                    <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                                        <stop id="stop1" stopColor="rgba(0, 0, 0, 1)" offset="0%"></stop>
                                        <stop id="stop2" stopColor="rgba(0, 0, 0, 1)" offset="100%"></stop>
                                    </linearGradient>
                                </defs>
                                <path
                                    fill="url(#sw-gradient)"
                                    d="M34.8,-19C41.6,-8.3,41.3,7.7,34.3,18.3C27.3,29,13.7,34.3,0,34.3C-13.6,34.3,-27.2,28.9,-33,19C-38.8,9,-36.8,-5.6,-30,-16.3C-23.2,-27,-11.6,-33.9,1.2,-34.5C14,-35.2,28,-29.7,34.8,-19Z"
                                    width="100%"
                                    height="100%"
                                    transform="translate(50 50)"
                                    strokeWidth="0"
                                    style={{
                                        transition: '0.3s',
                                        stroke: 'url(#sw-gradient)',
                                    }}
                                ></path>
                            </svg>
                            <h2 className="project-title">Project Description</h2>
                            <p className="project-description">{projects[currentIndex].description}</p>
                            <h2>Technologies:</h2>
                            <ul>
                                {projects[currentIndex].technologies.map((technology, index) => (
                                    <li key={index} className="technology-item">
                                        {technology}
                                    </li>
                                ))}
                            </ul>








                        </div>

                        <div className="project-lower">
                            {projects[currentIndex].additionalImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`project-lower-img ${index === 0 ? "large" : ""}`}
                                    onClick={() => openModal(index)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <img src={image.asset.url} alt={`Additional Image ${index + 1}`} />
                                </div>
                            ))}
                        </div>

                        {isModalOpen && currentImageIndex !== null && (
                            <div className="modal" onClick={closeModal}>
                                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                    <img
                                        src={projects[currentIndex].additionalImages[currentImageIndex].asset.url}
                                        alt="Selected Project"
                                    />
                                    <button className="close-btn" onClick={closeModal}>
                                        &times;
                                    </button>
                                    <button className="prev-btn" onClick={handlePrevImage}>
                                        &#8249;
                                    </button>
                                    <button className="next-btn" onClick={handleNextImage}>
                                        &#8250;
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};


const styles = {
    icon: {
        fontSize: '30px',
        cursor: 'pointer',
        transition: 'transform 0.3s, color 0.3s',
        color: 'black',
        
    },
};
export default Projects;


// export default Projects;
