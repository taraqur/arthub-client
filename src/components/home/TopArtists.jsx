import React from 'react';

const artists = [
  {
    id: 1,
    name: 'Frida Kahlo',
    role: 'Surrealism / Magic Realism',
    sales: '124 Sales',
    avatar: '/artists/frida-kahlo.png',
    cover: '/featured/artwork1.jpg',
    rank: 1,
  },
  {
    id: 2,
    name: 'Diego Rivera',
    role: 'Muralism',
    sales: '98 Sales',
    avatar: '/artists/diego-rivera.png',
    cover: '/featured/artwork4.jpg',
    rank: 2,
  },
  {
    id: 3,
    name: 'Gustav Klimt',
    role: 'Symbolism / Art Nouveau',
    sales: '87 Sales',
    avatar: '/artists/gustav-klimt.png',
    cover: '/featured/artwork5.jpg',
    rank: 3,
  }
];

export default function TopArtists() {
  return (
    <section className="py-24 px-4 md:px-8 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 4h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16m-10-7.34V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22m4-7.34V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Top Selling Artists
            </h2>
          </div>
          {/* A small golden underline */}
          <div className="w-12 h-1.5 bg-amber-500 rounded-full mb-4 mt-2"></div>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">


          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {artists.map((artist) => (
            <div key={artist.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
              {/* Cover Image */}
              <div className="h-32 w-full relative overflow-hidden">
                <img
                  src={artist.cover}
                  alt="cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Avatar Section */}
              <div className="flex justify-center -mt-12 relative">
                <div className="relative">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-24 h-24 rounded-full object-cover border-[5px] border-white shadow-md bg-white object-top"
                  />
                  {/* Rank Badge */}
                  <div className="absolute bottom-1 -right-1 bg-amber-400 text-gray-900 text-xs font-extrabold w-7 h-7 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                    #{artist.rank}
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="text-center px-6 pt-5 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">{artist.name}</h3>
                <p className="text-sm text-gray-500 mb-6">{artist.role}</p>
                <div className="inline-block">
                  <p className="text-amber-500 font-bold text-sm tracking-wide">
                    {artist.sales}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
