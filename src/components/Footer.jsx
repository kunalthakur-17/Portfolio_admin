import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

export default function Footer() {
  const theme = useTheme();

  const socialLinks = [
    { name: 'LinkedIn', icon: FiLinkedin, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: FiTwitter, url: 'https://twitter.com' },
    { name: 'GitHub', icon: FiGithub, url: 'https://github.com' },
    { name: 'Instagram', icon: FiInstagram, url: 'https://instagram.com' },
  ];

  return (
    <footer className={`${theme.colors.surfaceSecondary} mt-16 border-t ${theme.colors.border}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${theme.colors.surface} ${theme.colors.textMuted} hover:bg-blue-600 hover:text-white transition-all`}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>
          <p className={`text-center ${theme.colors.textMuted} text-sm`}>
            Copyright © {new Date().getFullYear()} Kunal Thakur. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
