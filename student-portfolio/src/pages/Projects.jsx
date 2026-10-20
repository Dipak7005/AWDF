import React from 'react';
import Footer from '../components/Footer';
import './Pages.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Student Portfolio Website',
      description: 'A responsive portfolio website built with React and Vite, showcasing skills and projects.',
      technologies: ['React', 'CSS3', 'JavaScript', 'Vite'],
      image: '🌐'
    },
    {
      id: 2,
      title: 'E-Commerce Dashboard',
      description: 'An interactive dashboard for managing products and orders with real-time updates.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: '📊'
    },
    {
      id: 3,
      title: 'Weather App',
      description: 'A weather application that fetches real-time weather data using APIs.',
      technologies: ['React', 'JavaScript', 'REST API', 'CSS'],
      image: '🌤️'
    },
  ];

  return (
    <>
      <div className="page-container">
        <div className="projects-section">
          <h1 className="page-title">My Projects</h1>
          <p className="page-subtitle">
            Here are some of the projects I've worked on
          </p>

          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">{project.image}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;
