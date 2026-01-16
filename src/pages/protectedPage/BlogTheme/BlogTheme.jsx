import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogsAction } from '../../../redux/protectedPage/blog/action';

export default function BlogTheme() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const blogs = store?.getBlogsReducer?.data?.response?.blogs || [];
  const loading = store?.getBlogsReducer?.loading;

  useEffect(() => {
    dispatch(getBlogsAction({ page: 1, limit: 100 }));
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Blog & Articles
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Insights, tutorials, and thoughts on modern web development, design patterns, 
            and best practices in building scalable applications.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-600 dark:text-gray-300">Loading...</div>
          </div>
        ) : (
          <motion.div variants={containerVariants} className="space-y-8">
            {blogs.map((post) => (
              <motion.article
                key={post._id}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="p-6 border-l-4 border-blue-600 dark:border-blue-400 bg-gray-50 dark:bg-gray-800 rounded-r-lg hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex-1">
                    {post.title}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {post.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm text-blue-600 dark:text-blue-400 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {post.content}
                </p>

                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200">
                  Read more →
                </button>
              </motion.article>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
