import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { FiSearch, FiSun, FiMoon, FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import Pagination from "../Pagination/Pagination";
import { useTheme } from "../../../contexts/ThemeContext";
import { 
  getBlogsAction,
  createBlogAction,
  updateBlogAction,
  deleteBlogAction,
  updateBlogResetAction,
  deleteBlogResetAction,
  createBlogResetAction,
} from "../../../redux/protectedPage/blog/action";

const Blog = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const theme = useTheme();

  const { loading, error, data } = useSelector((state) => state.createBlogReducer || {});
  const getBlogsReducerData = store?.getBlogsReducer?.data?.response?.blogs;
  const getBlogsReducerLoading = store?.getBlogsReducer?.loading;
  const updateBlogReducerLoading = store?.updateBlogReducer?.loading;
  const deleteBlogReducerLoading = store?.deleteBlogReducer?.loading;
  const totalPages = store?.getBlogsReducer?.data?.response?.totalPages || 1;
  const currentPage = store?.getBlogsReducer?.data?.response?.currentPage || 1;
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
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
    dispatch(getBlogsAction({ page, limit: 5 }));
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
    dispatch(getBlogsAction({ page, limit: 5 }));
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
    dispatch(deleteBlogResetAction())
    dispatch(getBlogsAction({ page, limit: 5 }));
  };

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteBlogAction({ id: deleteId }));
    }
  };

  useEffect(() => {
    dispatch(getBlogsAction({ search, page, limit: 5 }));
  }, [search, page]);

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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className={`min-h-screen ${theme.colors.background}`}>
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
                Blog Management
              </h1>
              <p className={`text-lg ${theme.colors.textSecondary} max-w-2xl`}>
                Manage your blog posts, articles, and insights on web development and technology.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={theme.toggleTheme}
                className={`p-3 rounded-xl border ${theme.colors.border} ${theme.colors.surface} hover:shadow-md transition-all duration-200`}
              >
                {theme.isDark ? <FiSun size={20} className={theme.colors.text} /> : <FiMoon size={20} className={theme.colors.text} />}
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShow}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 flex items-center gap-2"
              >
                <FiPlus size={20} />
                Add Blog
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative max-w-md">
            <FiSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme.colors.textMuted}`} size={20} />
            <input
              type="text"
              placeholder="Search blogs..."
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
          <motion.div variants={containerVariants} className="space-y-6">
            {!getBlogsReducerData || getBlogsReducerData?.length === 0 ? (
              <motion.div variants={itemVariants} className={`text-center py-16 ${theme.colors.textSecondary}`}>
                <div className={`text-6xl mb-4 ${theme.colors.textMuted}`}>📝</div>
                <h3 className={`text-xl font-semibold ${theme.colors.text} mb-2`}>No blog posts found</h3>
                <p className={theme.colors.textMuted}>Create your first blog post to get started</p>
              </motion.div>
            ) : (
              getBlogsReducerData?.map((post, index) => (
                <motion.article
                  key={post._id}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className={`p-6 border-l-4 border-blue-600 ${theme.colors.surfaceSecondary} rounded-r-lg hover:shadow-md transition-all duration-300`}
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

                  <p className={`${theme.colors.textSecondary} leading-relaxed mb-4`}>
                    {post.content}
                  </p>

                  <div className={`text-sm ${theme.colors.textMuted}`}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </motion.article>
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

      {/* Add Modal */}
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`${theme.colors.surface} rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${theme.colors.text}`}>Add New Blog</h2>
              <button
                onClick={handleClose}
                className={`p-2 rounded-lg ${theme.colors.surfaceSecondary} ${theme.colors.textMuted} hover:${theme.colors.text}`}
              >
                <FiX size={24} />
              </button>
            </div>

            {error?.message && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">{error.message}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  name="title"
                  className={`w-full px-4 py-3 rounded-lg border ${theme.colors.border} ${theme.colors.surface} ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter blog title"
                />
                {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={handleInputChange}
                  name="content"
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border ${theme.colors.border} ${theme.colors.surface} ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter blog content"
                />
                {formErrors.content && <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
                  Technologies <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTechnology())}
                    className={`flex-1 px-4 py-3 rounded-lg border ${theme.colors.border} ${theme.colors.surface} ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Add technology"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddTechnology}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Add
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1 rounded-full ${theme.isDark ? 'bg-gray-800' : 'bg-gray-100'} ${theme.colors.textSecondary} px-3 py-1 text-sm`}
                    >
                      {tech}
                      <button
                        onClick={() => handleRemoveTechnology(tech)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                {formErrors.technologies && <p className="text-red-500 text-sm mt-1">{formErrors.technologies}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleClose}
                className={`px-6 py-3 rounded-lg border ${theme.colors.border} ${theme.colors.text} font-semibold transition-colors`}
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
              >
                {loading ? "Adding..." : "Add Blog"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Modal - Similar structure */}
      {showEdit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={handleCloseEdit}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`${theme.colors.surface} rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${theme.colors.text}`}>Edit Blog</h2>
              <button
                onClick={handleCloseEdit}
                className={`p-2 rounded-lg ${theme.colors.surfaceSecondary} ${theme.colors.textMuted} hover:${theme.colors.text}`}
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={handleEditInputChange}
                  name="title"
                  className={`w-full px-4 py-3 rounded-lg border ${theme.colors.border} ${theme.colors.surface} ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter blog title"
                />
                {editErrors.title && <p className="text-red-500 text-sm mt-1">{editErrors.title}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={editData.content}
                  onChange={handleEditInputChange}
                  name="content"
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border ${theme.colors.border} ${theme.colors.surface} ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter blog content"
                />
                {editErrors.content && <p className="text-red-500 text-sm mt-1">{editErrors.content}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
                  Technologies <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editTechInput}
                    onChange={(e) => setEditTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddEditTechnology())}
                    className={`flex-1 px-4 py-3 rounded-lg border ${theme.colors.border} ${theme.colors.surface} ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Add technology"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddEditTechnology}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Add
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {editData.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1 rounded-full ${theme.isDark ? 'bg-gray-800' : 'bg-gray-100'} ${theme.colors.textSecondary} px-3 py-1 text-sm`}
                    >
                      {tech}
                      <button
                        onClick={() => handleRemoveEditTechnology(tech)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                {editErrors.technologies && <p className="text-red-500 text-sm mt-1">{editErrors.technologies}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCloseEdit}
                className={`px-6 py-3 rounded-lg border ${theme.colors.border} ${theme.colors.text} font-semibold transition-colors`}
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpdate}
                disabled={updateBlogReducerLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
              >
                {updateBlogReducerLoading ? "Updating..." : "Update Blog"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Delete Modal */}
      {showDelete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={handleCloseDelete}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`${theme.colors.surface} rounded-2xl p-6 max-w-md w-full`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 size={32} className="text-red-600 dark:text-red-400" />
              </div>
              <h3 className={`text-xl font-bold ${theme.colors.text} mb-2`}>Delete Blog Post</h3>
              <p className={`${theme.colors.textSecondary} mb-6`}>
                Are you sure you want to delete this blog post? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleCloseDelete}
                  className={`px-6 py-3 rounded-lg border ${theme.colors.border} ${theme.colors.text} font-semibold transition-colors`}
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  disabled={deleteBlogReducerLoading}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
                >
                  {deleteBlogReducerLoading ? "Deleting..." : "Delete"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Blog;
