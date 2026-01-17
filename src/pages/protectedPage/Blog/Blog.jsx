import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { FiSearch, FiSun, FiMoon, FiEdit2, FiTrash2, FiPlus, FiX, FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { useTheme } from "../../../contexts/ThemeContext";
import { AddModal, EditModal, DeleteModal } from './BlogModals';
import { 
  getBlogsAction,
  createBlogAction,
  updateBlogAction,
  deleteBlogAction,
  updateBlogResetAction,
  deleteBlogResetAction,
  createBlogResetAction,
  getBlogByIdAction,
} from "../../../redux/protectedPage/blog/action";

export default function Blog() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);

  // Redux state
  const { loading, error, data } = useSelector((state) => state.createBlogReducer || {});
  const getBlogsReducerData = store?.getBlogsReducer?.data?.response?.blogs;
  const getBlogsReducerLoading = store?.getBlogsReducer?.loading;
  const updateBlogReducerLoading = store?.updateBlogReducer?.loading;
  const deleteBlogReducerLoading = store?.deleteBlogReducer?.loading;
  const totalPages = store?.getBlogsReducer?.data?.response?.totalPages || 1;
  const currentPage = parseInt(store?.getBlogsReducer?.data?.response?.currentPage) || 1;

  // Local state
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    technologies: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [techInput, setTechInput] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    title: "",
    content: "",
    technologies: [],
  });
  const [editErrors, setEditErrors] = useState({});
  const [editTechInput, setEditTechInput] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

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
    setFormData({ title: "", content: "", technologies: [] });
    setTechInput("");
    setFormErrors({});
    dispatch(createBlogResetAction());
    dispatch(getBlogsAction({ page: currentPage, limit: 5 }));
  };

  const handleSubmit = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.content.trim()) errors.content = "Content is required";
    if (formData.technologies.length === 0) errors.technologies = "At least one technology is required";

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const payload = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      technologies: formData.technologies,
    };

    dispatch(createBlogAction(payload));
  };

  const handleShowEdit = (blog) => {
    setEditData({
      id: blog._id,
      title: blog.title,
      content: blog.content,
      technologies: blog.technologies || [],
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
    setEditData({ id: "", title: "", content: "", technologies: [] });
    setEditTechInput("");
    setEditErrors({});
    dispatch(updateBlogResetAction());
    dispatch(getBlogsAction({ page: currentPage, limit: 5 }));
  };

  const handleUpdate = () => {
    const errors = {};
    if (!editData.title.trim()) errors.title = "Title is required";
    if (!editData.content.trim()) errors.content = "Content is required";
    if (editData.technologies.length === 0) errors.technologies = "At least one technology is required";

    setEditErrors(errors);
    if (Object.keys(errors).length > 0) return;

    dispatch(
      updateBlogAction({
        id: editData.id,
        title: editData.title.trim(),
        content: editData.content.trim(),
        technologies: editData.technologies,
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
    dispatch(deleteBlogResetAction());
    dispatch(getBlogsAction({ page: currentPage, limit: 5 }));
  };

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteBlogAction({ id: deleteId }));
    }
  };

  const handleViewBlog = (blogId) => {
    dispatch(getBlogByIdAction(blogId));
    navigate(`/blog/${blogId}`);
  };

  const handlePageChange = (newPage) => {
    dispatch(getBlogsAction({ search, page: newPage, limit: 5 }));
  };

  // Effects
  useEffect(() => {
    dispatch(getBlogsAction({ search, page: currentPage, limit: 5 }));
  }, [search, currentPage]);

  useEffect(() => {
    if (data && !loading && !error) {
      handleClose();
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (!updateBlogReducerLoading) {
      handleCloseEdit();
    }
  }, [updateBlogReducerLoading]);

  useEffect(() => {
    if (!deleteBlogReducerLoading) {
      handleCloseDelete();
    }
  }, [deleteBlogReducerLoading]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
        <h1 className={`text-4xl font-bold ${theme.colors.text}`}>Blog Posts</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShow}
          className={`flex items-center gap-2 px-6 py-3 ${theme.colors.accent} text-white rounded-xl hover:${theme.colors.accentHover} transition-colors`}
        >
          <FiPlus size={20} />
          Create Post
        </motion.button>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants} className="mb-8 relative">
        <div className="relative">
          <FiSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme.colors.textMuted}`} size={20} />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${theme.colors.border} ${theme.colors.surface} ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme.colors.textMuted} hover:${theme.colors.text}`}
            >
              <FiX size={20} />
            </button>
          )}
        </div>
      </motion.div>

      {/* Blog Posts */}
      {getBlogsReducerLoading ? (
        <motion.div variants={itemVariants} className="flex justify-center items-center h-64">
          <ThreeDots height="80" width="80" radius="9" color="#3b82f6" ariaLabel="three-dots-loading" visible={true} />
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} className="space-y-8">
          {!getBlogsReducerData || getBlogsReducerData?.length === 0 ? (
            <motion.div variants={itemVariants} className={`text-center py-16 ${theme.colors.textSecondary}`}>
              <div className={`text-6xl mb-4 ${theme.colors.textMuted}`}>📝</div>
              <h3 className={`text-xl font-semibold ${theme.colors.text} mb-2`}>No blog posts found</h3>
              <p className={theme.colors.textMuted}>Create your first blog post to get started</p>
            </motion.div>
          ) : (
            getBlogsReducerData?.map((post) => (
              <motion.article
                key={post._id}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className={`p-6 border-l-4 ${theme.colors.primary.replace('text-', 'border-')} ${theme.colors.surfaceSecondary} rounded-r-lg hover:shadow-md transition-all duration-300`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-2xl font-bold ${theme.colors.text} flex-1`}>
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShowEdit(post)}
                      className={`p-2 rounded-lg ${theme.colors.surface} ${theme.colors.textMuted} hover:${theme.colors.text} transition-colors`}
                    >
                      <FiEdit2 size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShowDelete(post._id)}
                      className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </motion.button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {post.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center rounded-full ${theme.isDark ? 'bg-gray-800' : 'bg-gray-100'} ${theme.colors.textSecondary} px-3 py-1 text-xs font-semibold`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className={`${theme.colors.textSecondary} leading-relaxed mb-4 line-clamp-3`}>
                  {post.content}
                </p>

                <div className="flex justify-between items-center">
                  <div className={`text-sm ${theme.colors.textMuted}`}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => handleViewBlog(post._id)}
                    className={`inline-flex items-center gap-2 ${theme.colors.primary} ${theme.colors.primaryHover} font-semibold transition-colors duration-200`}
                  >
                    View Blog
                    <FiExternalLink size={18} />
                  </motion.button>
                </div>
              </motion.article>
            ))
          )}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div variants={itemVariants} className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </motion.div>
      )}

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
        updateBlogReducerLoading={updateBlogReducerLoading}
        theme={theme}
      />

      <DeleteModal
        showDelete={showDelete}
        handleCloseDelete={handleCloseDelete}
        handleDelete={handleDelete}
        deleteBlogReducerLoading={deleteBlogReducerLoading}
        theme={theme}
      />
    </motion.div>
  );
}
