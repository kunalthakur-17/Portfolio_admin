import { motion } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';

const AddModal = ({ show, handleClose, formData, handleInputChange, techInput, setTechInput, handleAddTechnology, handleRemoveTechnology, formErrors, handleSubmit, loading, error, theme }) => {
  if (!show) return null;

  return (
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
          <h2 className={`text-2xl font-bold ${theme.colors.text}`}>Add New Project</h2>
          <button
            onClick={handleClose}
            className={`p-2 rounded-lg ${theme.colors.surfaceSecondary} ${theme.colors.textMuted} hover:${theme.colors.text}`}
          >
            <X size={24} />
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
              placeholder="Enter project title"
            />
            {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={handleInputChange}
              name="description"
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border ${theme.colors.border} ${theme.colors.surface} ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter project description"
            />
            {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
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
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            {formErrors.technologies && <p className="text-red-500 text-sm mt-1">{formErrors.technologies}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
              Year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.Year}
              onChange={handleInputChange}
              name="Year"
              className={`w-full px-4 py-3 rounded-lg border ${theme.colors.border} ${theme.colors.surface} ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter project year"
            />
            {formErrors.Year && <p className="text-red-500 text-sm mt-1">{formErrors.Year}</p>}
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
            {loading ? "Adding..." : "Add Project"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const EditModal = ({ showEdit, handleCloseEdit, editData, handleEditInputChange, editTechInput, setEditTechInput, handleAddEditTechnology, handleRemoveEditTechnology, editErrors, handleUpdate, updateWorkReducerLoading, theme }) => {
  if (!showEdit) return null;

  return (
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
          <h2 className={`text-2xl font-bold ${theme.colors.text}`}>Edit Project</h2>
          <button
            onClick={handleCloseEdit}
            className={`p-2 rounded-lg ${theme.colors.surfaceSecondary} ${theme.colors.textMuted} hover:${theme.colors.text}`}
          >
            <X size={24} />
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
              placeholder="Enter project title"
            />
            {editErrors.title && <p className="text-red-500 text-sm mt-1">{editErrors.title}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={editData.description}
              onChange={handleEditInputChange}
              name="description"
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border ${theme.colors.border} ${theme.colors.surface} ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter project description"
            />
            {editErrors.description && <p className="text-red-500 text-sm mt-1">{editErrors.description}</p>}
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
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            {editErrors.technologies && <p className="text-red-500 text-sm mt-1">{editErrors.technologies}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
              Year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editData.Year}
              onChange={handleEditInputChange}
              name="Year"
              className={`w-full px-4 py-3 rounded-lg border ${theme.colors.border} ${theme.colors.surface} ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter project year"
            />
            {editErrors.Year && <p className="text-red-500 text-sm mt-1">{editErrors.Year}</p>}
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
            disabled={updateWorkReducerLoading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
          >
            {updateWorkReducerLoading ? "Updating..." : "Update Project"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DeleteModal = ({ showDelete, handleCloseDelete, handleDelete, deleteWorkReducerLoading, theme }) => {
  if (!showDelete) return null;

  return (
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
            <Trash2 size={32} className="text-red-600 dark:text-red-400" />
          </div>
          <h3 className={`text-xl font-bold ${theme.colors.text} mb-2`}>Delete Project</h3>
          <p className={`${theme.colors.textSecondary} mb-6`}>
            Are you sure you want to delete this project? This action cannot be undone.
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
              disabled={deleteWorkReducerLoading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
            >
              {deleteWorkReducerLoading ? "Deleting..." : "Delete"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export { AddModal, EditModal, DeleteModal };
