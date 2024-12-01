import { useState, useEffect, ChangeEvent } from 'react';
import { FaArrowLeft, FaArrowRight, FaEllipsisV, FaSearch } from 'react-icons/fa';
import ProjectCard from './ProjectCard'; // Asegúrate de importar ProjectCard

interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
  picture: string;
}

const Projects = () => {
  const [page, setPage] = useState<number>(0);
  const [posts, setPosts] = useState<Project[]>([]); // Todos los proyectos cargados
  const [filteredPosts, setFilteredPosts] = useState<Project[]>([]); // Proyectos filtrados por búsqueda
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Término de búsqueda
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null); // Mantener el ID del proyecto a eliminar
  const [menuVisible, setMenuVisible] = useState<number | null>(null); // Estado para controlar qué menú está visible
  const [testMode, setTestMode] = useState<boolean>(true); // Estado para el modo de prueba (true o false)

  const url: string = "http://localhost:8080/api/v1/projects"; // URL de la API.

  useEffect(() => {
    fetchProjects(page); // Solo cargamos los proyectos al inicio o cuando la página cambie
  }, [page]);

  // Función para obtener proyectos de la API
  const fetchProjects = async (p = 0) => {
    const requestUrl = `${url}?size=3&page=${p}`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    setPosts(data.content || []);
    setFilteredPosts(data.content || []); // Inicialmente los proyectos cargados son los proyectos filtrados
    setTotalPages(data.totalPages || 1);
  };

  // Función para filtrar proyectos basados en el término de búsqueda
  const filterProjects = (search: string) => {
    if (!search.trim()) {
      setFilteredPosts(posts); // Si no hay búsqueda, mostrar todos los proyectos
      return;
    }

    const lowercasedSearch = search.toLowerCase();
    const filtered = posts.filter((project) =>
      project.name.toLowerCase().includes(lowercasedSearch)
    );
    setFilteredPosts(filtered); // Actualizar los proyectos filtrados
  };

  // Función para eliminar un proyecto
  const handleDelete = async (id: number) => {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setPosts(posts.filter((project) => project.id !== id));
      setFilteredPosts(filteredPosts.filter((project) => project.id !== id)); // Actualizar los proyectos filtrados
      setShowConfirmDelete(false); // Cerrar el modal de confirmación
    } else {
      console.error('Error al eliminar el proyecto');
    }
  };

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterProjects(value); // Filtrar los proyectos mientras el usuario escribe
  };

  // Función para manejar la confirmación de eliminación
  const confirmDelete = (id: number) => {
    setProjectToDelete(id);
    setShowConfirmDelete(true); // Mostrar el modal de confirmación
    setMenuVisible(null); // Cerrar el menú al confirmar la eliminación
  };

  // Función para manejar la visibilidad del menú
  const toggleMenu = (id: number) => {
    setMenuVisible(menuVisible === id ? null : id); // Alternar la visibilidad del menú
  };

  return (
    <>
      {/* Barra de búsqueda */}
      <div className="mb-6 flex justify-center relative">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === 'Enter' && filterProjects(searchTerm)} // Solo filtrar en base al término de búsqueda
          className="w-full max-w-xs p-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Lista de proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((project) => (
          <div key={project.id} className="relative">
            <ProjectCard project={project} />

            {/* Menú de tres puntos */}
            <button
              onClick={() => toggleMenu(project.id)}
              className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <FaEllipsisV className="text-xl" />
            </button>

            {/* Menú desplegable */}
            {menuVisible === project.id && (
              <div className="absolute top-8 right-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li
                    onClick={() => {
                      if (testMode) {
                        confirmDelete(project.id); // Si está en testMode, proceder con la eliminación
                      }
                    }}
                    className={`px-4 py-2 ${testMode ? 'text-red-500' : 'text-gray-400'} ${testMode ? 'cursor-pointer' : 'cursor-not-allowed'} hover:bg-gray-200`}
                  >
                    {testMode ? 'Eliminar proyecto' : 'Modo prueba: no se puede eliminar'}
                  </li>
                  {/* Aquí puedes agregar más opciones en el menú si lo deseas */}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirmación de eliminación */}
      {showConfirmDelete && projectToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-center mb-4">Confirmar eliminación</h2>
            <p className="text-center mb-4">¿Estás seguro de que deseas eliminar este proyecto?</p>
            <div className="flex justify-around">
              <button
                onClick={() => {
                  if (projectToDelete !== null) {
                    handleDelete(projectToDelete);
                  }
                }}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
              >
                Sí
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="bg-gray-300 py-2 px-6 rounded-lg hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botones de navegación */}
      <div className="mt-6 flex justify-center items-center space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full disabled:bg-gray-300 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <FaArrowLeft className="text-lg" />
        </button>

        <span className="text-lg font-semibold text-gray-700">
          Página {page + 1} de {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={posts.length === 0 || page === totalPages - 1}
          className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full disabled:bg-gray-300 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <FaArrowRight className="text-lg" />
        </button>
      </div>
    </>
  );
};

export default Projects;
