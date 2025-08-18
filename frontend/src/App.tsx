import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center bg-gray-800 shadow-md">
        <h1 className="text-3xl font-bold">Saapadu</h1>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500">
          Start Now
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow text-center px-6 py-16">
        <h2 className="text-4xl font-extrabold mb-4">Food for All</h2>
        <p className="text-lg text-gray-300 max-w-xl mb-6">
          Delicious, fresh, colorful, and made with love. Affordable prices for everyone.
        </p>
        <button className="bg-green-500 px-6 py-3 rounded-xl font-semibold hover:bg-green-600">
          Order Now
        </button>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-10 py-16 bg-gray-800">
        <div>
          <h3 className="text-xl font-semibold">💸 Affordable Meals</h3>
          <p className="text-gray-400">Pocket-friendly pricing for all.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">🥗 Super Fresh</h3>
          <p className="text-gray-400">Top-quality ingredients, always fresh.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">🌍 Community Impact</h3>
          <p className="text-gray-400">Reducing waste, feeding more people.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-6 border-t border-gray-700">
        <p className="text-sm text-gray-400">Contact Us</p>
        <p className="text-sm">Duraragesh C</p>
        <p className="text-sm">9876548765 | duraragesh@example.com</p>
      </footer>
    </div>
  );
}
