// src/App.tsx

import React from 'react';

function App() {
  return (
    // Usa clases de Tailwind directamente en el className
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      {/* Tarjeta de Contenido */}
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full transform transition duration-500 hover:scale-105">
        
        {/* Título */}
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 text-center">
          ✅ Tailwind Funciona
        </h1>
        
        {/* Descripción */}
        <p className="text-gray-600 mb-6 text-center">
          Si ves este estilo (fondo gris, texto púrpura, sombra de tarjeta), ¡todo está instalado!
        </p>

        {/* Botón interactivo */}
        <button 
          className="w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300"
        >
          Haz Clic para Probar
        </button>

        {/* Ejemplo de diseño responsivo */}
        <div className="mt-6 p-3 bg-yellow-100 border-l-4 border-yellow-500">
          <p className="text-sm text-yellow-700">
            **Clase responsiva de prueba:** El texto es <span className="text-base font-bold sm:text-lg md:text-xl text-red-600">GRANDE en móvil (sm) y aún más GRANDE en tablet (md)</span>.
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;