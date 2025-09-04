// src/services/aiService.js
import OpenAI from 'openai';

// Debug line - remove this later
console.log('API Key loaded:', import.meta.env.VITE_OPENAI_API_KEY ? 'YES' : 'NO');

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Upload file function - replace Base44's UploadFile
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return { file_url: data.url };
  } catch (error) {
    console.error('File upload error:', error);
    throw new Error('Failed to upload file. Please try again.');
  }
}

// Analyze image function - replace Base44's InvokeLLM
export async function analyzeImage({ prompt, file_urls, response_json_schema }) {
  try {
    const modifiedPrompt = response_json_schema 
      ? `${prompt}\n\nPlease respond with ONLY a valid JSON object, no additional text.`
      : prompt;

    const messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: modifiedPrompt
          },
          {
            type: "image_url",
            image_url: {
              url: file_urls[0],
              detail: "high"
            }
          }
        ]
      }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      max_tokens: 1000,
      temperature: 0.1,
      response_format: response_json_schema ? { type: "json_object" } : undefined
    });

    const content = response.choices[0].message.content;
    console.log('Raw AI response:', content); // Debug line
    
    if (response_json_schema) {
      try {
        // Try to extract JSON if it's wrapped in text
        let jsonString = content;
        
        // Look for JSON object patterns
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonString = jsonMatch[0];
        }
        
        return JSON.parse(jsonString);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', content);
        console.error('Parse error:', parseError);
        
        // Fallback: try to extract key information manually
        throw new Error('AI returned invalid JSON format');
      }
    }
    
    return content;
  } catch (error) {
    console.error('AI analysis error:', error);
    
    if (error.code === 'rate_limit_exceeded') {
      throw new Error('Too many requests. Please wait a moment and try again.');
    } else if (error.code === 'invalid_api_key') {
      throw new Error('API configuration error. Please check your settings.');
    } else if (error.code === 'insufficient_quota') {
      throw new Error('API quota exceeded. Please check your OpenAI account.');
    }
    
    throw new Error('Failed to analyze image. Please try again.');
  }
}

// Text-only AI search function - no images required
export async function searchRecyclingAdvice(searchTerm) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `A user in Melbourne, Australia is searching for how to recycle "${searchTerm}". Provide clear recycling advice.

Respond with a JSON object containing:
1. "name": The common name of the item.
2. "category": The material category (plastic, glass, paper, cardboard, metal, organic, landfill, e-waste).
3. "bin_type": The correct Melbourne bin (yellow_recycling, green_organics, red_landfill, special_collection).
4. "tip": A short, actionable recycling tip for this item.
5. "explanation": A brief explanation of why it belongs in that bin.

If it's a very ambiguous item, make a best guess or classify it as landfill for safety. Please respond with a valid JSON object.`
        }
      ],
      max_tokens: 1000,
      temperature: 0.1,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    console.log('Raw text search response:', content);
    
    return JSON.parse(content);
  } catch (error) {
    console.error('Text search error:', error);
    throw new Error('Failed to get recycling advice. Please try again.');
  }
}