const featuredArtworks = [
  {
    id: 1,
    image: '/featured/artwork1.jpg',
    category: 'Sculpture',
    date: 'Uploaded 6/6/2026',
    title: 'Shattered Grace',
    description: 'Modern wire frame sculpture that casts dramatic shifting shadows under direct spotlights, showing geometric...',
    price: '$600'
  },
  {
    id: 2,
    image: '/featured/artwork2.jpg',
    category: 'Sculpture',
    date: 'Uploaded 6/6/2026',
    title: 'The Silent Thinker',
    description: 'Carved clay sculpture demonstrating the gravity of human reflection in a fast-paced technology world.',
    price: '$850'
  },
  {
    id: 3,
    image: '/featured/artwork3.jpg',
    category: 'Digital',
    date: 'Uploaded 6/6/2026',
    title: 'Neon Oasis',
    description: 'Cyberpunk inspired glowing 3D render exploring virtual escapism and synthetic urban nature.',
    price: '$250'
  },
  {
    id: 4,
    image: '/featured/artwork4.jpg',
    category: 'Painting',
    date: 'Uploaded 6/6/2026',
    title: 'Ethereal Forest',
    description: 'Watercolors capturing the misty landscapes of Northern cascades, layering colors for depth and tranquility.',
    price: '$320'
  },
  {
    id: 5,
    image: '/featured/artwork5.jpg',
    category: 'Digital',
    date: 'Uploaded 6/6/2026',
    title: 'Fragments of Time',
    description: 'A striking digital abstract illustration investigating the impermanence of digital memory and fractured interfaces.',
    price: '$120'
  },
  {
    id: 6,
    image: '/featured/artwork6.jpg',
    category: 'Painting',
    date: 'Uploaded 6/6/2026',
    title: 'Celestial Whispers',
    description: 'A beautiful oil-on-canvas representation of starry dynamics. Inspired by cosmic dust clouds and early impressionist...',
    price: '$450'
  }
];

import Link from 'next/link';

export default function FeaturedArtworks() {
  return (
    <section className="py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Artworks
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most captivating pieces carefully selected by our curators.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArtworks.map((artwork) => (
            <Link href={`/artworks/${artwork.id}`} key={artwork.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-indigo-500/30 hover:shadow-xl transition-all duration-300 group cursor-pointer shadow-md block">
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={artwork.image} 
                  alt={artwork.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 right-4 bg-[#00d084] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  AVAILABLE
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1.5 rounded-full">
                  {artwork.category}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <p className="text-gray-500 text-xs mb-3">{artwork.date}</p>
                <h3 className="text-gray-900 font-bold text-xl mb-3">{artwork.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[3rem]">
                  {artwork.description}
                </p>
                
                <div className="w-full h-px bg-gray-100 mb-5"></div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-gray-500 text-[10px] font-bold tracking-wider uppercase mb-1">PRICE</p>
                    <p className="text-gray-900 text-2xl font-bold">{artwork.price}</p>
                  </div>
                  <button className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full text-xs font-semibold transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/browse" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-full text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300">
            View All Artworks
          </Link>
        </div>
      </div>
    </section>
  );
}
