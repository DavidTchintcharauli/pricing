'use client';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Welcome to the Application</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Manage your tasks, employees, or projects efficiently and effectively with our easy-to-use interface.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
            onClick={() => alert('Redirect to Tasks Page')}
          >
            Get Started
          </button>
          <button
            className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-400 transition duration-300"
            onClick={() => alert('Learn More')}
          >
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
