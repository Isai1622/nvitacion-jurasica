
import React, { useState, useEffect } from 'react';
import JurassicCard from './JurassicCard';

interface SetupGuideProps {
    scriptUrl: string;
    onSaveUrl: (url: string) => void;
}

const SetupGuide: React.FC<SetupGuideProps> = ({ scriptUrl, onSaveUrl }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localUrl, setLocalUrl] = useState(scriptUrl);
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        setLocalUrl(scriptUrl);
    }, [scriptUrl]);

    const handleSaveClick = () => {
        onSaveUrl(localUrl);
        setSaveMessage('✅ ¡URL guardada! El contador intentará conectarse ahora.');
        setTimeout(() => setSaveMessage(''), 5000);
    };
    
    const appsScriptCode = `
// A doGet function is required for any web app deployment. 
// It can simply inform that the script is running.
function doGet(e) {
  return ContentService.createTextOutput("Jurassic Invitation API Endpoint is active.");
}

/**
 * Handles all API logic using POST requests to avoid CORS issues.
 * Routes requests based on an 'action' parameter.
 */
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Confirmations');
    if (!sheet) {
      throw new Error("Sheet 'Confirmations' not found. Please check the sheet name.");
    }
    
    // e.parameter holds form data for 'application/x-www-form-urlencoded' content type.
    const action = e.parameter.action;
    let responseData;
    
    if (action === 'getTotal') {
      const data = sheet.getRange('B2:B').getValues();
      let totalAsistentes = 0;
      data.forEach(row => {
        if (row[0] && typeof row[0] === 'number') {
          totalAsistentes += row[0];
        }
      });
      responseData = { success: true, totalAsistentes: totalAsistentes };
      
    } else if (action === 'confirm') {
      const quantity = parseInt(e.parameter.quantity, 10);
      if (isNaN(quantity) || quantity < 1) {
        throw new Error("Invalid quantity provided. Must be a number greater than 0.");
      }
      const timestamp = new Date();
      sheet.appendRow([timestamp, quantity]);
      responseData = { success: true, status: 'confirmed' };
      
    } else {
      throw new Error("Invalid action specified. Supported actions are 'getTotal' and 'confirm'.");
    }

    // Return a JSON response for the client.
    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return a structured error message.
    const errorResponse = { success: false, message: error.toString() };
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
    `.trim();

    return (
        <JurassicCard>
            <h3 className="font-bangers text-4xl text-amber-400 mb-4">¿Cómo Conectar el Contador?</h3>
            
            <div className="mb-6">
                <label htmlFor="script-url-input" className="block text-gray-300 mb-4 text-left">
                    Para que el contador funcione, sigue la guía de abajo para crear un script de Google y pega la URL de tu aplicación web aquí.
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <input 
                        id="script-url-input"
                        type="url"
                        value={localUrl || ''}
                        onChange={(e) => setLocalUrl(e.target.value)}
                        placeholder="Pega la URL de tu script aquí"
                        className="flex-grow p-3 rounded-lg bg-gray-900 border-2 border-gray-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors w-full text-white"
                        aria-label="URL del Google Apps Script"
                    />
                    <button onClick={handleSaveClick} className="btn-jurassic text-lg w-full sm:w-auto flex-shrink-0">
                        Guardar URL
                    </button>
                </div>
                {saveMessage && <p className="text-green-400 mt-3 text-sm animate-fadeIn">{saveMessage}</p>}
            </div>
            
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-700 hover:bg-gray-600 text-amber-300 font-bold py-2 px-4 rounded-lg transition-colors inline-flex items-center text-sm"
                aria-expanded={isOpen}
            >
                <svg className={`w-5 h-5 mr-2 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                {isOpen ? 'Ocultar Guía Detallada' : 'Mostrar Guía Detallada'}
            </button>

            {isOpen && (
                <div className="text-left text-gray-200 space-y-8 animate-fadeIn mt-6 border-t-2 border-amber-800 pt-6">
                    <div>
                        <h4 className="font-bold text-2xl text-amber-300 mb-3">Paso 1: Crear la Google Sheet</h4>
                        <ol className="list-decimal list-inside space-y-2 pl-4">
                            <li>Ve a <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">sheets.new</a> para crear una nueva hoja de cálculo.</li>
                            <li className="font-bold">
                                <p className="mb-2">
                                    Cambia el nombre de la <strong className="text-yellow-300 underline">PESTAÑA</strong> (abajo a la izquierda) a <code className="bg-gray-700 p-1 rounded">Confirmations</code>.
                                </p>
                                <div className="bg-gray-900 p-3 rounded-lg border border-amber-700 my-2">
                                    <img src="https://i.postimg.cc/kX8d7JJ4/sheet-vs-tab-name-es.png" alt="Diagrama mostrando la diferencia entre el nombre del archivo de Google Sheets y el nombre de la pestaña." className="rounded-md mx-auto" />
                                    <p className="text-xs text-center mt-2 text-gray-400">El script necesita el nombre de la <strong className="text-yellow-300">pestaña</strong>, no el nombre del <strong className="text-red-400">archivo</strong>.</p>
                                </div>
                            </li>
                            <li>En la primera fila, escribe los encabezados. En la celda A1: <code className="bg-gray-700 p-1 rounded">Timestamp</code>. En la celda B1: <code className="bg-gray-700 p-1 rounded">Quantity</code>.</li>
                        </ol>
                    </div>

                    <div>
                        <h4 className="font-bold text-2xl text-amber-300 mb-3">Paso 2: Crear el Google Apps Script</h4>
                        <ol className="list-decimal list-inside space-y-2 pl-4">
                            <li>En tu Google Sheet, ve al menú <code className="bg-gray-700 p-1 rounded">Extensiones</code> {'>'} <code className="bg-gray-700 p-1 rounded">Apps Script</code>.</li>
                            <li>Se abrirá una nueva pestaña con el editor de código. Borra cualquier código que haya por defecto.</li>
                            <li>Copia y pega el siguiente código en el editor:</li>
                        </ol>
                        <pre className="bg-gray-900 text-sm p-4 rounded-lg mt-4 overflow-x-auto">
                            <code>{appsScriptCode}</code>
                        </pre>
                    </div>

                    <div>
                        <h4 className="font-bold text-2xl text-amber-300 mb-3">Paso 3: Desplegar el Script como Web App</h4>
                         <ol className="list-decimal list-inside space-y-2 pl-4">
                            <li>Haz clic en el botón azul <code className="bg-blue-600 text-white p-1 rounded">Desplegar</code> y selecciona <code className="bg-gray-700 p-1 rounded">Nuevo despliegue</code>.</li>
                            <li>Haz clic en el ícono de engranaje (⚙️) y elige <code className="bg-gray-700 p-1 rounded">Aplicación web</code>.</li>
                            <li className="font-bold">En "Quién tiene acceso", selecciona <strong className="text-yellow-300 underline decoration-wavy decoration-red-500">'Cualquier persona'</strong>. ¡Este es el paso más importante!</li>
                            <li>Haz clic en <code className="bg-blue-600 text-white p-1 rounded">Desplegar</code>.</li>
                            <li>Autoriza los permisos que te pida Google.</li>
                            <li>Al final, te dará una <code className="bg-gray-700 p-1 rounded">URL de la aplicación web</code>. ¡Cópiala!</li>
                        </ol>
                    </div>

                    <div>
                        <h4 className="font-bold text-2xl text-amber-300 mb-3">Paso 4: Conectar la App</h4>
                         <ol className="list-decimal list-inside space-y-2 pl-4">
                            <li>Después de desplegar, copia la URL de la aplicación web.</li>
                            <li>Pega esa URL en el campo que está arriba de esta guía y haz clic en 'Guardar URL'.</li>
                            <li>¡Eso es todo! El contador debería conectarse automáticamente.</li>
                        </ol>
                    </div>

                     <div className="border-t-2 border-amber-700 pt-6">
                        <h4 className="font-bold text-2xl text-red-400 mb-3">Resolución de Problemas</h4>
                        <p className="text-gray-400 mb-2">Si ves un error de conexión, revisa estos puntos:</p>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-red-300">
                           <li><strong className="text-white">Error "Sheet 'Confirmations' not found":</strong> Este error se refiere al nombre de la <strong className="underline">PESTAÑA</strong> en la parte inferior de la hoja, no al nombre del archivo en la parte superior. Asegúrate de que la pestaña se llame exactamente `Confirmations`. ¡Revisa la imagen en el Paso 1 de la guía!</li>
                           <li><strong className="text-white">El error más común:</strong> ¿Estás 100% seguro de que en el Paso 3 seleccionaste <strong className="underline">'Cualquier persona'</strong> para "Quién tiene acceso"? Si no, la página web no tiene permiso para leer los datos.</li>
                           <li>¿Copiaste la URL correcta? Debe ser la <strong className="text-white">URL de la aplicación web</strong> (termina en /exec), no la URL del editor de scripts.</li>
                           <li>Si cambias el código del script, tienes que volver a desplegarlo (<code className="bg-gray-700 p-1 rounded">Desplegar</code> {'>'} <code className="bg-gray-700 p-1 rounded">Gestionar despliegues</code> {'>'} Editar (✏️) {'>'} Nueva versión).</li>
                        </ul>
                    </div>
                </div>
            )}
        </JurassicCard>
    );
};

export default SetupGuide;
