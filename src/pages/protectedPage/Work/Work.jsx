import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink, Edit, Trash2, Plus, Search, X, Sun, Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import Pagination from '../Pagination/Pagination';
import { AddModal, EditModal, DeleteModal } from './WorkModals';
import {
  getWorksAction,
  createWorkAction,
  updateWorkAction,
  deleteWorkAction,
  updateWorkResetAction,
  deleteWorkResetAction,
  createWorkResetAction,
  getWorkByIdAction,
} from '../../../redux/protectedPage/work/action';
import { useTheme } from '../../../contexts/ThemeContext';

export default function Work() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);

  // Redux state
  const { loading, error, data } = useSelector((state) => state.createWorkReducer || {});
  const getWorksReducerData = store?.getWorksReducer?.data?.response?.works;
  const getWorksReducerLoading = store?.getWorksReducer?.loading;
  const updateWorkReducerLoading = store?.updateWorkReducer?.loading;
  const deleteWorkReducerLoading = store?.deleteWorkReducer?.loading;
  const totalPages = store?.getWorksReducer?.data?.response?.totalPages || 1;
  const currentPage = store?.getWorksReducer?.data?.response?.currentPage || 1;

  // Local state
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    Year: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [techInput, setTechInput] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    title: "",
    description: "",
    technologies: [],
    Year: "",
  });
  const [editErrors, setEditErrors] = useState({});
  const [editTechInput, setEditTechInput] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Handler functions
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTechnology = () => {
    if (techInput.trim()) {
      const newTechs = techInput.split(',').map(tech => tech.trim()).filter(tech => tech && !formData.technologies.includes(tech));
      setFormData({ ...formData, technologies: [...formData.technologies, ...newTechs] });
      setTechInput("");
    }
  };

  const handleRemoveTechnology = (tech) => {
    setFormData({ ...formData, technologies: formData.technologies.filter((t) => t !== tech) });
  };

  const handleClose = () => {
    setShow(false);
    setFormData({ title: "", description: "", technologies: [], Year: "" });
    setTechInput("");
    setFormErrors({});
    dispatch(createWorkResetAction());
    dispatch(getWorksAction({ page, limit: 8 }));
  };

  const handleSubmit = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (formData.technologies.length === 0) errors.technologies = "At least one technology is required";
    if (!formData.Year.trim()) errors.Year = "Year is required";

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      technologies: formData.technologies,
      Year: formData.Year.trim(),
    };

    dispatch(createWorkAction(payload));
  };

  const handleShowEdit = (work) => {
    setEditData({
      id: work._id,
      title: work.title,
      description: work.description,
      technologies: work.technologies || [],
      Year: work.Year.toString(),
    });
    setShowEdit(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleAddEditTechnology = () => {
    if (editTechInput.trim()) {
      const newTechs = editTechInput.split(',').map(tech => tech.trim()).filter(tech => tech && !editData.technologies.includes(tech));
      setEditData({ ...editData, technologies: [...editData.technologies, ...newTechs] });
      setEditTechInput("");
    }
  };

  const handleRemoveEditTechnology = (tech) => {
    setEditData({ ...editData, technologies: editData.technologies.filter((t) => t !== tech) });
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setEditData({ id: "", title: "", description: "", technologies: [], Year: "" });
    setEditTechInput("");
    setEditErrors({});
    dispatch(updateWorkResetAction());
    dispatch(getWorksAction({ page, limit: 8 }));
  };

  const handleUpdate = () => {
    const errors = {};
    if (!editData.title.trim()) errors.title = "Title is required";
    if (!editData.description.trim()) errors.description = "Description is required";
    if (editData.technologies.length === 0) errors.technologies = "At least one technology is required";
    if (!editData.Year.trim()) errors.Year = "Year is required";

    setEditErrors(errors);
    if (Object.keys(errors).length > 0) return;

    dispatch(
      updateWorkAction({
        id: editData.id,
        title: editData.title.trim(),
        description: editData.description.trim(),
        technologies: editData.technologies,
        Year: editData.Year.trim(),
      })
    );
  };

  const handleShowDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    setDeleteId(null);
    dispatch(deleteWorkResetAction());
    dispatch(getWorksAction({ page, limit: 8 }));
  };

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteWorkAction({ id: deleteId }));
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleViewProject = (workId) => {
    dispatch(getWorkByIdAction(workId));
    navigate(`/work/${workId}`);
  };

  // Effects
  useEffect(() => {
    dispatch(getWorksAction({ search, page, limit: 8 }));
  }, [search, page]);

  useEffect(() => {
    if (data && !loading && !error) {
      handleClose();
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (!updateWorkReducerLoading) {
      handleCloseEdit();
    }
  }, [updateWorkReducerLoading]);

  useEffect(() => {
    if (!deleteWorkReducerLoading) {
      handleCloseDelete();
    }
  }, [deleteWorkReducerLoading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className={`min-h-screen ${theme.colors.background} transition-colors duration-300`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className={`text-4xl md:text-5xl font-bold ${theme.colors.text} mb-4`}>
                Project Work Management
              </h1>
              <p className={`text-lg ${theme.colors.textSecondary} max-w-2xl`}>
                Manage your portfolio projects showcasing expertise in full-stack development and modern web technologies.
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShow}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 flex items-center gap-2"
              >
                <Plus size={20} />
                Add Work
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative max-w-md">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme.colors.textMuted}`} size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${theme.colors.border} ${theme.colors.surface} ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme.colors.textMuted} hover:${theme.colors.text}`}
              >
                <X size={20} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Works Grid */}
        {getWorksReducerLoading ? (
          <motion.div variants={itemVariants} className="flex justify-center items-center h-64">
            <ThreeDots height="80" width="80" radius="9" color="#3b82f6" ariaLabel="three-dots-loading" visible={true} />
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!getWorksReducerData || getWorksReducerData?.length === 0 ? (
              <motion.div variants={itemVariants} className={`col-span-2 text-center py-16 ${theme.colors.textSecondary}`}>
                <div className={`text-6xl mb-4 ${theme.colors.textMuted}`}>💼</div>
                <h3 className={`text-xl font-semibold ${theme.colors.text} mb-2`}>No projects found</h3>
                <p className={theme.colors.textMuted}>Create your first project to get started</p>
              </motion.div>
            ) : (
              getWorksReducerData?.map((work) => (
                <motion.div
                  key={work._id}
                  variants={itemVariants}
                  className={`rounded-xl border ${theme.colors.border} ${theme.colors.surface} shadow-sm hover:shadow-md transition-shadow duration-200 p-6`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className={`text-xl md:text-2xl font-bold ${theme.colors.text} flex-1`}>
                      {work.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`inline-block ${theme.isDark ? 'bg-gray-700' : 'bg-gray-900'} text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-semibold`}>
                        {work.Year}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShowEdit(work)}
                        className={`p-2 rounded-lg ${theme.colors.surface} ${theme.colors.textMuted} hover:${theme.colors.text} transition-colors`}
                      >
                        <Edit size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShowDelete(work._id)}
                        className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </div>

                  <p className={`mt-3 ${theme.colors.textSecondary} leading-relaxed line-clamp-3`}>
                    {work.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {work.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className={`inline-flex items-center rounded-full ${theme.isDark ? 'bg-gray-800' : 'bg-gray-100'} ${theme.colors.textSecondary} px-3 py-1 text-xs font-semibold`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex justify-between items-center">
                    <div className={`text-sm ${theme.colors.textMuted}`}>
                      {new Date(work.createdAt).toLocaleDateString()}
                    </div>
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => handleViewProject(work._id)}
                      className={`inline-flex items-center gap-2 ${theme.colors.primary} ${theme.colors.primaryHover} font-semibold transition-colors duration-200`}
                    >
                      View project
                      <ExternalLink size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div variants={itemVariants} className="mt-12">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </motion.div>
        )}
      </motion.div>

      {/* Modals */}
      <AddModal
        show={show}
        handleClose={handleClose}
        formData={formData}
        handleInputChange={handleInputChange}
        techInput={techInput}
        setTechInput={setTechInput}
        handleAddTechnology={handleAddTechnology}
        handleRemoveTechnology={handleRemoveTechnology}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        theme={theme}
      />

      <EditModal
        showEdit={showEdit}
        handleCloseEdit={handleCloseEdit}
        editData={editData}
        handleEditInputChange={handleEditInputChange}
        editTechInput={editTechInput}
        setEditTechInput={setEditTechInput}
        handleAddEditTechnology={handleAddEditTechnology}
        handleRemoveEditTechnology={handleRemoveEditTechnology}
        editErrors={editErrors}
        handleUpdate={handleUpdate}
        updateWorkReducerLoading={updateWorkReducerLoading}
        theme={theme}
      />

      <DeleteModal
        showDelete={showDelete}
        handleCloseDelete={handleCloseDelete}
        handleDelete={handleDelete}
        deleteWorkReducerLoading={deleteWorkReducerLoading}
        theme={theme}
      />
    </div>
  );
}
