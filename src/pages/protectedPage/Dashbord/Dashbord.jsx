import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

export default function Dashboard() {
  const theme = useTheme();

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

  const stats = [
    { label: 'Total Projects', value: '12', change: '+2 this month' },
    { label: 'Blog Posts', value: '8', change: '+1 this week' },
    { label: 'Total Views', value: '2.4k', change: '+12% this month' },
    { label: 'Messages', value: '5', change: '3 unread' },
  ];

  const recentActivity = [
    { action: 'New project added', item: 'E-commerce Platform', time: '2 hours ago' },
    { action: 'Blog post published', item: 'React Best Practices', time: '1 day ago' },
    { action: 'Contact form submission', item: 'John Doe', time: '2 days ago' },
    { action: 'Project updated', item: 'Portfolio Website', time: '3 days ago' },
  ];

  return (
    <div className={`min-h-screen ${theme.colors.background} transition-colors duration-300`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className={`text-4xl md:text-5xl font-bold ${theme.colors.text} mb-4`}>
            Dashboard
          </h1>
          <p className={`text-lg ${theme.colors.textSecondary} max-w-2xl`}>
            Welcome back! Here's an overview of your portfolio and recent activity.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-6 rounded-xl border ${theme.colors.border} ${theme.colors.surface} shadow-sm hover:shadow-md transition-shadow duration-200`}
            >
              <h3 className={`text-sm font-semibold ${theme.colors.textMuted} uppercase tracking-wide mb-2`}>
                {stat.label}
              </h3>
              <p className={`text-3xl font-bold ${theme.colors.text} mb-1`}>
                {stat.value}
              </p>
              <p className={`text-sm ${theme.colors.primary}`}>
                {stat.change}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <div className={`p-6 rounded-xl border ${theme.colors.border} ${theme.colors.surface} shadow-sm`}>
              <h2 className={`text-2xl font-bold ${theme.colors.text} mb-6`}>
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${theme.colors.surfaceSecondary}`}>
                    <div>
                      <p className={`font-semibold ${theme.colors.text}`}>
                        {activity.action}
                      </p>
                      <p className={`text-sm ${theme.colors.textSecondary}`}>
                        {activity.item}
                      </p>
                    </div>
                    <span className={`text-sm ${theme.colors.textMuted}`}>
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <div className={`p-6 rounded-xl border ${theme.colors.border} ${theme.colors.surface} shadow-sm`}>
              <h2 className={`text-2xl font-bold ${theme.colors.text} mb-6`}>
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className={`w-full text-left px-4 py-3 rounded-lg ${theme.colors.surfaceSecondary} ${theme.colors.text} ${theme.colors.primaryHover} transition-colors duration-200`}>
                  Add New Project
                </button>
                <button className={`w-full text-left px-4 py-3 rounded-lg ${theme.colors.surfaceSecondary} ${theme.colors.text} ${theme.colors.primaryHover} transition-colors duration-200`}>
                  Write Blog Post
                </button>
                <button className={`w-full text-left px-4 py-3 rounded-lg ${theme.colors.surfaceSecondary} ${theme.colors.text} ${theme.colors.primaryHover} transition-colors duration-200`}>
                  View Messages
                </button>
                <button className={`w-full text-left px-4 py-3 rounded-lg ${theme.colors.surfaceSecondary} ${theme.colors.text} ${theme.colors.primaryHover} transition-colors duration-200`}>
                  Settings
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
