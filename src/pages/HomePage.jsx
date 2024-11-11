// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { articles, genres } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import SidebarAds from '../components/SidebarAds';
import { Helmet } from 'react-helmet-async';
import { Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RandomQuestionModal from '../components/RandomQuestionModal';

export default function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredArticles = selectedGenre === 'All'
    ? articles
    : articles.filter(article => article.genre === selectedGenre);

  // Trigger the modal after a delay (simulate NYT-style pop-up)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 2000); // 2 seconds delay before the modal shows

    return () => clearTimeout(timer); // Clear the timer if component unmounts
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalAccept = () => {
    setIsModalOpen(false);
    // Handle the action when the user accepts (e.g., redirect to Terms page)
    // For now, we just log it
    console.log("User accepted to read Terms & Services");
  };

  return (
    <>
      <Helmet>
        <title>Our Days - Latest News and Stories</title>
        <meta name="description" content="Stay informed with the latest news from Our Days." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <button
              className="lg:hidden flex items-center space-x-2 mb-4 text-gray-600"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
              <span>Filter by Genre</span>
            </button>

            {/* Genre Filters */}
            <AnimatePresence>
              {(showFilters || window.innerWidth >= 1024) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-8"
                >
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-4 py-2 rounded-full transition-all duration-200 ${
                          selectedGenre === genre
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <SidebarAds />
        </div>
      </div>

      {/* Random Question Modal */}
      <RandomQuestionModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAccept={handleModalAccept}
      />
    </>
  );
}
