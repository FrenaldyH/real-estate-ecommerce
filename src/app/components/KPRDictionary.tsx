import { useState, useRef, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Star, 
  FileText, 
  DollarSign, 
  Scale, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles
} from 'lucide-react';
import { 
  kprTerms, 
  searchTerms, 
  getAvailableLetters, 
  getPopularTerms,
  categories, 
  KPRTerm 
} from '../data/kprTerms';

export function KPRDictionary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());
  const termRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  const availableLetters = getAvailableLetters();
  const popularTerms = getPopularTerms();

  // Helper: Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Dasar KPR':
        return <BookOpen className="w-4 h-4" />;
      case 'Bunga & Cicilan':
        return <TrendingUp className="w-4 h-4" />;
      case 'Biaya & Pajak':
        return <DollarSign className="w-4 h-4" />;
      case 'Syariah':
        return <Star className="w-4 h-4" />;
      case 'Legal & Dokumen':
        return <Scale className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // Helper: Get letter gradient color
  const getLetterColor = (letter: string) => {
    const colors: { [key: string]: string } = {
      'A': 'from-blue-500 to-cyan-500',
      'B': 'from-green-500 to-emerald-500',
      'C': 'from-purple-500 to-pink-500',
      'D': 'from-orange-500 to-red-500',
      'E': 'from-yellow-500 to-amber-500',
      'F': 'from-pink-500 to-rose-500',
      'G': 'from-indigo-500 to-blue-500',
      'H': 'from-teal-500 to-cyan-500',
      'I': 'from-violet-500 to-purple-500',
      'J': 'from-red-500 to-pink-500',
      'K': 'from-cyan-500 to-teal-500',
      'L': 'from-amber-500 to-orange-500',
      'M': 'from-rose-500 to-pink-500',
      'N': 'from-emerald-500 to-green-500',
      'O': 'from-blue-500 to-indigo-500',
      'P': 'from-fuchsia-500 to-pink-500',
      'R': 'from-lime-500 to-green-500',
      'S': 'from-sky-500 to-blue-500',
      'T': 'from-violet-500 to-fuchsia-500',
      'U': 'from-orange-500 to-amber-500',
      'W': 'from-pink-500 to-rose-500',
    };
    return colors[letter] || 'from-slate-500 to-slate-600';
  };

  // Helper: Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Dasar KPR':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Bunga & Cicilan':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Biaya & Pajak':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Syariah':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Legal & Dokumen':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Toggle term expansion
  const toggleTermExpansion = (termId: string) => {
    setExpandedTerms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(termId)) {
        newSet.delete(termId);
      } else {
        newSet.add(termId);
      }
      return newSet;
    });
  };

  // Scroll to letter section
  const scrollToLetter = (letter: string) => {
    setSelectedLetter(letter);
    const element = termRefs.current[letter];
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    let filtered = kprTerms;

    // Search filter
    if (searchQuery.trim()) {
      filtered = searchTerms(searchQuery);
    }

    // Category filter
    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Group terms by letter
  const groupedTerms = useMemo(() => {
    const groups: { [key: string]: KPRTerm[] } = {};
    filteredTerms.forEach(term => {
      if (!groups[term.letter]) {
        groups[term.letter] = [];
      }
      groups[term.letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const sortedLetters = Object.keys(groupedTerms).sort();

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Kamus Istilah KPR
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            Pahami istilah-istilah penting dalam dunia KPR dan properti
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari istilah seperti bunga, tenor, DP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Popular Terms (only show when no search/filter active) */}
        {!searchQuery && selectedCategory === 'Semua' && popularTerms.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <h3 className="text-xl font-bold text-slate-900">Istilah Populer</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {popularTerms.map((term) => (
                <button
                  key={`popular-${term.term}`}
                  onClick={() => {
                    scrollToLetter(term.letter);
                    setTimeout(() => {
                      toggleTermExpansion(`${term.letter}-${term.term}`);
                    }, 500);
                  }}
                  className="px-4 py-2 bg-white border-2 border-blue-200 text-blue-700 rounded-full hover:bg-blue-50 transition-all font-semibold text-sm shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {term.term}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* LEFT SIDEBAR - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200 lg:sticky lg:top-6 space-y-6">
              
              {/* Category Filter */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Kategori
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-md'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {category !== 'Semua' && (
                        <span className={selectedCategory === category ? 'text-white' : 'text-slate-500'}>
                          {getCategoryIcon(category)}
                        </span>
                      )}
                      <span className="text-sm">{category}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Alphabet Filter */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Filter Alfabet</h3>
                <div className="grid grid-cols-5 gap-2">
                  {availableLetters.map((letter) => {
                    const hasTerms = groupedTerms[letter] && groupedTerms[letter].length > 0;
                    return (
                      <button
                        key={letter}
                        onClick={() => hasTerms && scrollToLetter(letter)}
                        disabled={!hasTerms}
                        className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                          hasTerms
                            ? selectedLetter === letter
                              ? 'bg-gradient-to-br from-[#2563EB] to-[#3B82F6] text-white shadow-lg scale-110'
                              : 'bg-slate-100 hover:bg-gradient-to-br hover:from-[#2563EB] hover:to-[#3B82F6] hover:text-white'
                            : 'bg-slate-50 text-slate-300 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Filters Info */}
              {(searchQuery || selectedCategory !== 'Semua') && (
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-600 mb-2">Filter aktif:</div>
                  <div className="space-y-2">
                    {searchQuery && (
                      <div className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg">
                        <span className="text-xs text-blue-700 font-medium">Pencarian: "{searchQuery}"</span>
                        <button onClick={() => setSearchQuery('')} className="text-blue-600 hover:text-blue-800">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    {selectedCategory !== 'Semua' && (
                      <div className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg">
                        <span className="text-xs text-blue-700 font-medium">{selectedCategory}</span>
                        <button onClick={() => setSelectedCategory('Semua')} className="text-blue-600 hover:text-blue-800">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - Terms List */}
          <div className="lg:col-span-3">
            {/* Results count */}
            <div className="mb-4 text-sm text-slate-600">
              Ditemukan <span className="font-bold text-slate-900">{filteredTerms.length}</span> istilah
            </div>

            {/* Empty State */}
            {filteredTerms.length === 0 && (
              <div className="bg-white rounded-2xl shadow-md p-12 border border-slate-200 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Istilah tidak ditemukan</h3>
                <p className="text-slate-600 mb-6">
                  Coba kata kunci lain atau ubah filter kategori
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Semua');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Reset Filter
                </button>
              </div>
            )}

            {/* Terms grouped by letter */}
            <div className="space-y-8">
              {sortedLetters.map((letter) => (
                <div key={letter} ref={(el) => (termRefs.current[letter] = el)}>
                  {/* Letter Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getLetterColor(letter)} rounded-xl flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-2xl">{letter}</span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
                  </div>

                  {/* Terms under this letter */}
                  <div className="space-y-4">
                    {groupedTerms[letter].map((term) => {
                      const termId = `${term.letter}-${term.term}`;
                      const isExpanded = expandedTerms.has(termId);
                      const isLongDescription = term.description.length > 150;

                      return (
                        <div
                          key={termId}
                          className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition-all overflow-hidden group"
                        >
                          <div className="p-6">
                            <div className="flex items-start gap-4">
                              {/* Letter Icon */}
                              <div className={`w-12 h-12 bg-gradient-to-br ${getLetterColor(term.letter)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                <span className="text-white font-bold text-xl">{term.letter}</span>
                              </div>

                              <div className="flex-1 min-w-0">
                                {/* Term Title & Category Badge */}
                                <div className="flex items-start justify-between gap-3 mb-3">
                                  <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                      {term.term}
                                      {term.isPopular && (
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                      )}
                                    </h3>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(term.category)}`}>
                                      {getCategoryIcon(term.category)}
                                      {term.category}
                                    </span>
                                  </div>
                                </div>

                                {/* Description */}
                                <div className="text-slate-600 leading-relaxed">
                                  {isLongDescription && !isExpanded ? (
                                    <>
                                      <p className="line-clamp-2">{term.description}</p>
                                      <button
                                        onClick={() => toggleTermExpansion(termId)}
                                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                      >
                                        Baca selengkapnya
                                        <ChevronDown className="w-4 h-4" />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <p>{term.description}</p>
                                      {isLongDescription && (
                                        <button
                                          onClick={() => toggleTermExpansion(termId)}
                                          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                          Tampilkan lebih sedikit
                                          <ChevronUp className="w-4 h-4" />
                                        </button>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
