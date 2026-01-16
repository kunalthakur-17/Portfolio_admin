import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorksAction } from '../../../redux/protectedPage/work/action';

export default function WorkTheme() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const works = store?.getWorksReducer?.data?.response?.blogs || [];
  const loading = store?.getWorksReducer?.loading;

  useEffect(() => {
    dispatch(getWorksAction({ page: 1, limit: 100 }));
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Project Work
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Selected projects showcasing expertise in full-stack development and modern web technologies.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-600 dark:text-gray-300">Loading...</div>
          </div>
        ) : (
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {works.map((work) => (
              <motion.div
                key={work._id}
                variants={itemVariants}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    {work.title}
                  </h3>
                  <span className="shrink-0 inline-block bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-semibold">
                    {work.Year}
                  </span>
                </div>

                <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {work.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {work.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-1 text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {work.link && (
                  <motion.a
                    href={work.link}
                    whileHover={{ x: 4 }}
                    className="mt-5 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200"
                    aria-label={`View ${work.title} project`}
                  >
                    View project
                    <ExternalLink size={18} />
                  </motion.a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>
    </div>
  );
}
