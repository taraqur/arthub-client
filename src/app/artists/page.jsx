import React from 'react';

const artists = [
  {
    id: 1,
    name: 'Frida Kahlo',
    image: '/artists/frida-kahlo.png',
    specialty: 'Surrealism / Magic Realism',
    bio: 'Mexican painter known for her many portraits, self-portraits, and works inspired by the nature and artifacts of Mexico.',
  },
  {
    id: 2,
    name: 'Diego Rivera',
    image: '/artists/diego-rivera.png',
    specialty: 'Muralism',
    bio: 'Prominent Mexican painter. His large frescoes helped establish the Mexican mural movement in Mexican art.',
  },
  {
    id: 3,
    name: 'Gustav Klimt',
    image: '/artists/gustav-klimt.png',
    specialty: 'Symbolism / Art Nouveau',
    bio: 'Austrian symbolist painter and one of the most prominent members of the Vienna Secession movement. Known for his "Golden Phase".',
  }
];

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Our Artists
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the creative minds behind the masterpieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {artists.map((artist) => (
            <div key={artist.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{artist.name}</h3>
                  <p className="text-indigo-300 font-medium">{artist.specialty}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {artist.bio}
                </p>
                <button className="w-full bg-indigo-50 text-indigo-700 font-semibold py-3 px-4 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors duration-300">
                  View Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
