export default function Categories() {
  return (
    <section className="bg-gray-50 py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 relative inline-block">
          Art Categories
          <span className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-16 h-1 bg-indigo-500 rounded-full"></span>
        </h2>
        <p className="text-gray-600 mt-8 mb-12 max-w-2xl mx-auto text-sm md:text-base">
          Filter through our diverse creative collections of physical and digital products.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group">
            <span className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-sm">🎨</span>
            <h3 className="text-gray-900 font-bold text-lg mb-1">Painting</h3>
            <p className="text-gray-500 text-sm">Oil & Watercolors</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group">
            <span className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-sm">💻</span>
            <h3 className="text-gray-900 font-bold text-lg mb-1">Digital</h3>
            <p className="text-gray-500 text-sm">3D & Illustration</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group">
            <span className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-sm">🗿</span>
            <h3 className="text-gray-900 font-bold text-lg mb-1">Sculpture</h3>
            <p className="text-gray-500 text-sm">Clay & Wire frame</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group">
            <span className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-sm">🌀</span>
            <h3 className="text-gray-900 font-bold text-lg mb-1">Abstract</h3>
            <p className="text-gray-500 text-sm">Mixed Media</p>
          </div>
        </div>
      </div>
    </section>
  );
}
