import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiEdit2, FiCalendar, FiCode, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { getBlogByIdAction, updateBlogAction, updateBlogResetAction } from '../../../../redux/protectedPage/blog/action';
import { useTheme } from '../../../../contexts/ThemeContext';

export default function BlogDetail() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const store = useSelector((state) => state);

  const { loading, error, data } = useSelector((state) => state.getBlogByIdReducer || {});
  const updateBlogReducerLoading = useSelector((state) => state.updateBlogReducer?.loading);
  const blogData = store?.getBlogByIdReducer?.data?.response;

  // Edit modal state
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    title: "",
    content: "",
    technologies: [],
  });
  const [editErrors, setEditErrors] = useState({});
  const [editTechInput, setEditTechInput] = useState("");

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

  useEffect(() => {
    if (id) {
      dispatch(getBlogByIdAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!updateBlogReducerLoading) {
      handleCloseEdit();
      // Refetch the blog data to show updated content
      dispatch(getBlogByIdAction(id));
    }
  }, [updateBlogReducerLoading, dispatch, id]);

  const handleGoBack = () => {
    navigate('/blog');
  };

  const handleEdit = () => {
    if (blogData) {
      setEditData({
        id: blogData._id,
        title: blogData.title,
        content: blogData.content,
        technologies: blogData.technologies || [],
      });
      setShowEdit(true);
    }
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

  if (loading) {
    return (
      <div className={`min-h-screen ${theme.colors.background} flex items-center justify-center`}>
        <ThreeDots height="80" width="80" radius="9" color="#3b82f6" ariaLabel="three-dots-loading" visible={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${theme.colors.background} flex items-center justify-center`}>
        <motion.div variants={itemVariants} className="text-center">
          <div className={`text-6xl mb-4 ${theme.colors.textMuted}`}>❌</div>
          <h3 className={`text-xl font-semibold ${theme.colors.text} mb-2`}>Error loading blog post</h3>
          <p className={`${theme.colors.textSecondary} mb-6`}>{error?.message || 'An error occurred while fetching the blog post.'}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className={`px-6 py-3 ${theme.colors.accent} text-white font-semibold rounded-lg ${theme.colors.accentHover} transition-colors duration-200 flex items-center gap-2 mx-auto`}
          >
            <FiX size={20} />
            Back to Blogs
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!loading && !blogData) {
    return (
      <div className={`min-h-screen ${theme.colors.background} flex items-center justify-center`}>
        <motion.div variants={itemVariants} className="text-center">
          <div className={`text-6xl mb-4 ${theme.colors.textMuted}`}>❌</div>
          <h3 className={`text-xl font-semibold ${theme.colors.text} mb-2`}>Blog post not found</h3>
          <p className={`${theme.colors.textSecondary} mb-6`}>The blog post you're looking for doesn't exist or has been removed.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className={`px-6 py-3 ${theme.colors.accent} text-white font-semibold rounded-lg ${theme.colors.accentHover} transition-colors duration-200 flex items-center gap-2 mx-auto`}
          >
            <FiX size={20} />
            Back to Blogs
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.colors.background} transition-colors duration-300`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className={`flex items-center gap-2 ${theme.colors.textSecondary} hover:${theme.colors.text} transition-colors duration-200 mb-6`}
          >
            <FiX size={20} />
            Back to Blogs
          </motion.button>

          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className={`text-4xl md:text-5xl font-bold ${theme.colors.text} mb-4`}>
                {blogData.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className={`flex items-center gap-2 ${theme.colors.textSecondary}`}>
                  <FiCalendar size={18} />
                  <span className="text-sm">{new Date(blogData.createdAt).toLocaleDateString()}</span>
                </div>
                <div className={`flex items-center gap-2 ${theme.colors.textSecondary}`}>
                  <span className="text-sm">Blog Post</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEdit}
                className={`flex items-center gap-2 px-6 py-3 ${theme.colors.surface} ${theme.colors.border} border ${theme.colors.text} font-semibold rounded-lg transition-colors duration-200`}
              >
                <FiEdit2 size={20} />
                Edit Blog
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants} className={`mb-12 p-8 rounded-xl ${theme.colors.surface} ${theme.colors.border} border`}>
          <h2 className={`text-2xl font-bold ${theme.colors.text} mb-4`}>Blog Content</h2>
          <div className={`${theme.colors.textSecondary} leading-relaxed text-lg whitespace-pre-wrap`}>
            {blogData.content}
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div variants={itemVariants} className={`mb-12 p-8 rounded-xl ${theme.colors.surface} ${theme.colors.border} border`}>
          <div className="flex items-center gap-2 mb-6">
            <FiCode size={24} className={theme.colors.primary} />
            <h2 className={`text-2xl font-bold ${theme.colors.text}`}>Technologies Used</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {blogData.technologies?.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`inline-flex items-center rounded-full ${theme.isDark ? 'bg-gray-800' : 'bg-gray-100'} ${theme.colors.textSecondary} px-4 py-2 text-sm font-semibold border ${theme.colors.border}`}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Blog Details */}
        <motion.div variants={itemVariants} className={`p-8 rounded-xl ${theme.colors.surface} ${theme.colors.border} border`}>
          <h2 className={`text-2xl font-bold ${theme.colors.text} mb-6`}>Blog Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-sm font-semibold ${theme.colors.textMuted} uppercase tracking-wide mb-2`}>Published Date</h3>
              <p className={`${theme.colors.text} text-lg`}>
                {new Date(blogData.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${theme.colors.textMuted} uppercase tracking-wide mb-2`}>Last Updated</h3>
              <p className={`${theme.colors.text} text-lg`}>
                {new Date(blogData.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${theme.colors.textMuted} uppercase tracking-wide mb-2`}>Blog Status</h3>
              <p className={`${theme.colors.text} text-lg`}>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`}>
                  Published
                </span>
              </p>
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${theme.colors.textMuted} uppercase tracking-wide mb-2`}>Technologies Count</h3>
              <p className={`${theme.colors.text} text-lg`}>
                {blogData.technologies?.length || 0} technologies
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Edit Modal */}
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
    </div>
  );
}
