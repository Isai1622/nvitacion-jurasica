
/**
 * Checks if the SCRIPT_URL has been configured.
 * Throws an error if the URL is missing or invalid.
 */
function checkScriptUrl(scriptUrl: string | null | undefined) {
    if (!scriptUrl || scriptUrl.includes('YOUR_SCRIPT_ID_HERE') || scriptUrl.trim() === '') {
        throw new Error('La URL del script de Google no está configurada. Sigue la guía, obtén tu URL y pégala en el campo de configuración.');
    }
}

/**
 * Performs a fetch request to the Google Apps Script with detailed error handling.
 * @param {string} scriptUrl - The full URL of the Google Apps Script.
 * @param {string} body - The request body for the POST request.
 * @returns {Promise<any>} The JSON response from the script.
 */
const fetchFromScript = async (scriptUrl: string, body: string): Promise<any> => {
    checkScriptUrl(scriptUrl);
    let response;
    try {
        response = await fetch(scriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: body,
            // By default, fetch follows redirects. If permissions are wrong,
            // Google redirects to a login page, which causes a CORS error.
            // This catch block will handle that scenario.
        });
    } catch (networkError) {
        console.error('Network or CORS error during fetch:', networkError);
        throw new Error("Error de conexión (CORS). Causa más probable: En la configuración del script, 'Quién tiene acceso' NO está como 'Cualquier persona'.");
    }

    if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`, response);
        throw new Error(`Error del servidor (código: ${response.status}). Revisa que el script esté desplegado con acceso para 'Cualquier persona'.`);
    }
    
    let data;
    try {
        data = await response.json();
    } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError, 'Response Text:', await response.text());
        throw new Error('Respuesta inesperada del servidor. El script no devolvió un JSON válido. Revisa los permisos y el código del script.');
    }

    if (data.success === false) { // Explicitly check for false
        console.error('Google Script internal error:', data.message);
        let detailedMessage = data.message || 'Error desconocido.';
        if (typeof detailedMessage === 'string' && detailedMessage.includes("Sheet 'Confirmations' not found")) {
            detailedMessage = "La pestaña 'Confirmations' no se encontró. Por favor, revisa que: 1) El nombre de la PESTAÑA (abajo, no el nombre del archivo) es exactamente 'Confirmations'. 2) El script está vinculado a la hoja de cálculo correcta.";
        }
        throw new Error(`Error en el script de Google: ${detailedMessage}`);
    }

    return data;
};


/**
 * Fetches the total number of confirmed attendees from the Google Sheet.
 * @param {string} scriptUrl - The full URL of the Google Apps Script.
 * @returns {Promise<number>} The total number of attendees.
 */
export const getTotalAttendees = async (scriptUrl:string): Promise<number> => {
    const data = await fetchFromScript(scriptUrl, 'action=getTotal');
    return data.totalAsistentes || 0;
};

/**
 * Sends a new attendance confirmation to the Google Sheet.
 * @param {string} scriptUrl - The full URL of the Google Apps Script.
 * @param {number} quantity - The number of family members attending.
 */
export const confirmAttendance = async (scriptUrl: string, quantity: number): Promise<void> => {
    await fetchFromScript(scriptUrl, `action=confirm&quantity=${quantity}`);
};
