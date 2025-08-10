'use client';

import { motion } from 'framer-motion';
import { Book, Video, Code2, Music, ExternalLink } from 'lucide-react';

const resources = [
  {
    category: 'Coding',
    icon: <Code2 size={24} className="text-blue-400" />,
    items: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', description: 'Comprehensive web development documentation' },
      { title: 'JavaScript.info', url: 'https://javascript.info', description: 'Modern JavaScript tutorial' },
      { title: 'React Documentation', url: 'https://react.dev', description: 'Official React documentation' },
    ]
  },
  {
    category: 'Music Production',
    icon: <Music size={24} className="text-green-400" />,
    items: [
      { title: 'Spotify for Developers', url: 'https://developer.spotify.com', description: 'Spotify Web API documentation' },
      { title: 'Web Audio API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API', description: 'Browser audio processing' },
      { title: 'Tone.js', url: 'https://tonejs.github.io', description: 'Web Audio framework for music' },
    ]
  },
  {
    category: 'Learning',
    icon: <Book size={24} className="text-purple-400" />,
    items: [
      { title: 'freeCodeCamp', url: 'https://freecodecamp.org', description: 'Free coding bootcamp' },
      { title: 'Coursera', url: 'https://coursera.org', description: 'Online courses from universities' },
      { title: 'YouTube', url: 'https://youtube.com', description: 'Video tutorials and courses' },
    ]
  }
];

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <motion.h1
        className="text-3xl font-heading"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Resources
      </motion.h1>

      <div className="space-y-8">
        {resources.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              {category.icon}
              <h2 className="text-xl font-poppins">{category.category}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item, itemIndex) => (
                <motion.a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-4 rounded-lg hover:shadow-glow transition group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-poppins group-hover:text-accent transition">
                      {item.title}
                    </h3>
                    <ExternalLink size={16} className="opacity-60 group-hover:opacity-100 transition" />
                  </div>
                  <p className="text-sm opacity-70">{item.description}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}