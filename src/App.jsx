import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="bg-blue-600 w-full text-white text-center py-6 shadow-md">
        <h1 className="text-3xl font-bold">Prueba de Tailwind CSS</h1>
      </header>

      <main className="mt-10 p-6 bg-white rounded-lg shadow-lg w-[90%] max-w-md text-center">
        <p className="text-gray-700 mb-4">
          Si ves este diseño con colores y espaciado, Tailwind está funcionando correctamente 🎉
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">
          ¡Haz clic aquí!
        </button>
      </main>
    </div>
  );
}

export default App;