/**
 * TuEnergíaMaya AI Assistant - Google Apps Script
 * Este script actúa como proxy entre tu frontend y la API de Gemini
 * 
 * IMPORTANTE: Después de modificar este archivo, debes:
 * 1. Implementar → Nueva implementación
 * 2. Copiar la nueva URL
 */

// Tu API Key de Gemini (configúrala en Propiedades del script)
const GEMINI_API_KEY = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');

// System prompt del asistente Maya
const SYSTEM_PROMPT = `Eres Ixchel, la sabia guardiana del Tzolkin Maya. 
Respondes preguntas sobre el calendario Maya, los 20 sellos solares, 
los 13 tonos galácticos, y la sincronicidad. 
Hablas en español con un tono místico pero accesible.
Mantén las respuestas concisas pero profundas (máximo 3 párrafos).`;

// Usamos doGet para evitar problemas de CORS con POST
function doGet(e) {
  // Si no hay parámetro 'text', es un health check
  if (!e.parameter.text) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', service: 'TuEnergíaMaya AI' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    const userMessage = e.parameter.text || '';
    const historyParam = e.parameter.history || '[]';
    const contextParam = e.parameter.context || '{}';
    
    const history = JSON.parse(decodeURIComponent(historyParam));
    const context = JSON.parse(decodeURIComponent(contextParam));
    
    // Construir mensajes para Gemini
    const messages = [];
    
    // Añadir historial si existe
    if (history.length > 0) {
      history.forEach(msg => {
        messages.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        });
      });
    }
    
    // Construir instrucción de sistema dinámica con contexto
    let effectiveSystemPrompt = SYSTEM_PROMPT;
    if (context && context.kinNumber) {
        effectiveSystemPrompt += `\n\nCONTEXTO ACTUAL (EL KIN QUE EL USUARIO VE EN PANTALLA):\n`;
        effectiveSystemPrompt += `Kin: ${context.kinNumber}\n`;
        effectiveSystemPrompt += `Sello: ${context.seal}\n`;
        effectiveSystemPrompt += `Tono: ${context.tone}\n`;
        effectiveSystemPrompt += `Color: ${context.color}\n`;
        effectiveSystemPrompt += `Fecha: ${context.date}\n`;
        effectiveSystemPrompt += `Afirmación: ${context.affirmation}`;
    }

    // Llamar a Gemini API con el prompt dinámico
    const response = callGemini(messages, effectiveSystemPrompt);
    
    return ContentService
      .createTextOutput(JSON.stringify({ response: response }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// También soportamos POST por compatibilidad
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const userMessage = data.text || data.message || '';
    const history = data.history || [];
    // En POST, context ya viene como objeto normalmente
    let context = data.context || {};
    // Si viene como string, intentamos parsear
    if (typeof context === 'string') {
        try { context = JSON.parse(context); } catch(e) {}
    }
    
    const messages = [];
    
    if (history.length > 0) {
      history.forEach(msg => {
        messages.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        });
      });
    }
    
    messages.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });
    
    // Construir instrucción de sistema dinámica con contexto
    let effectiveSystemPrompt = SYSTEM_PROMPT;
    if (context && context.kinNumber) {
        effectiveSystemPrompt += `\n\nCONTEXTO ACTUAL (EL KIN QUE EL USUARIO VE EN PANTALLA):\n`;
        effectiveSystemPrompt += `Kin: ${context.kinNumber}\n`;
        effectiveSystemPrompt += `Sello: ${context.seal}\n`;
        effectiveSystemPrompt += `Tono: ${context.tone}\n`;
        effectiveSystemPrompt += `Color: ${context.color}\n`;
        effectiveSystemPrompt += `Fecha: ${context.date}\n`;
        effectiveSystemPrompt += `Afirmación: ${context.affirmation}`;
    }
    
    const response = callGemini(messages, effectiveSystemPrompt);
    
    return ContentService
      .createTextOutput(JSON.stringify({ response: response }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function callGemini(messages, systemPrompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const payload = {
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    contents: messages,
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 1024
    }
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const result = JSON.parse(response.getContentText());
  
  if (result.candidates && result.candidates[0]) {
    return result.candidates[0].content.parts[0].text;
  }
  
  // Log error details if available
  if (result.error) {
      throw new Error(`Gemini API Error: ${result.error.message}`);
  }
  
  throw new Error('No response from Gemini');
}

// Test function (ejecutar desde el editor)
function testAssistant() {
  const testEvent = {
    parameter: {
      text: "¿Qué significa el sello del Dragón Rojo?"
    }
  };
  
  const result = doGet(testEvent);
  Logger.log(result.getContent());
}
