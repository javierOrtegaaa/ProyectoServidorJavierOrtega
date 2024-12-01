import React from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
  picture: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 border-2 border-gray-200">
      {/* Imagen del proyecto */}
      <div className="flex justify-center mb-4">
        <img
          src={project.picture}
          alt={project.name}
          className="w-full h-48 object-cover rounded-md border-4 border-gray-500"
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
      <p className="mt-2 text-gray-600">{project.description}</p>
      <p className="mt-4 text-sm text-gray-500">
        <strong>Start Date: </strong>{project.start_date}
      </p>
    </div>
  );
};

export default ProjectCard;
