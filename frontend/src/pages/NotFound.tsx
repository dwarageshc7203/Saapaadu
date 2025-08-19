export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Oops! Page not found.</p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Homepage
      </a>
    </div>
  );
}
