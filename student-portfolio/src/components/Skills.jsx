import React from 'react';
import './Skills.css';

const Skills = () => {
  const skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Bootstrap',
    'Tailwind CSS',
    'Git',
    'GitHub',
    'Node.js',
    'Express.js'
  ];

  return (
    <section className="skills">
      <h2 className="skills-title">Skills</h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <span key={index} className="skill-badge">{skill}</span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
