/**
 * TuEnergíaMaya AI Assistant - Google Apps Script
 * Este script actúa como proxy entre tu frontend y la API de Gemini
 */

// Tu API Key de Gemini (configúrala en Propiedades del script)
const GEMINI_API_KEY = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');

// System prompt del asistente Maya
const SYSTEM_PROMPT = `Eres Ixchel, la sabia guardiana del Tzolkin Maya. 
Respondes preguntas sobre el calendario Maya, los 20 sellos solares, 
los 13 tonos galácticos, y la sincronicidad. 
Hablas en español con un tono místico pero accesible.
Mantén las respuestas concisas pero profundas.`;

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const userMessage = data.text || data.message || '';
    const history = data.history || [];
    const context = data.context || {};
    
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
    
    // Añadir mensaje actual con contexto
    let fullMessage = userMessage;
    if (context.kin_number) {
      fullMessage = `[Contexto: Kin ${context.kin_number}] ` + userMessage;
    }
    
    messages.push({
      role: 'user',
      parts: [{ text: fullMessage }]
    });
    
    // Llamar a Gemini API
    const response = callGemini(messages);
    
    return ContentService
      .createTextOutput(JSON.stringify({ response: response }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Health check
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'TuEnergíaMaya AI' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function callGemini(messages) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const payload = {
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }]
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
  
  throw new Error('No response from Gemini');
}

// Test function
function testAssistant() {
  const testEvent = {
    postData: {
      contents: JSON.stringify({
        text: "¿Qué significa el sello del Dragón Rojo?",
        history: [],
        context: { kin_number: 1 }
      })
    }
  };
  
  const result = doPost(testEvent);
  Logger.log(result.getContent());
}
