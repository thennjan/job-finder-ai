
import { GoogleGenAI, Type } from "@google/genai";
import { JobListing } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const jobListingSchema = {
  type: Type.OBJECT,
  properties: {
    jobTitle: { type: Type.STRING, description: "The title of the job." },
    companyName: { type: Type.STRING, description: "The name of the company hiring." },
    location: { type: Type.STRING, description: "The location of the job (e.g., 'San Francisco, CA' or 'Remote')." },
    description: { type: Type.STRING, description: "A brief, one to two-sentence summary of the job." },
    applyLink: { type: Type.STRING, description: "The direct URL to the job application page." },
    companyWebsite: { type: Type.STRING, description: "The URL to the company's main website." },
  },
  required: ["jobTitle", "companyName", "location", "description", "applyLink"],
};

export const fetchJobLisings = async (query: string): Promise<JobListing[]> => {
  const prompt = `
    Act as a job aggregation engine. Find 12 diverse job listings related to the query: "${query}".
    For each job, provide the job title, company name, location, a brief 1-2 sentence description, a direct application link, and the company website.
    Ensure the links are valid and direct URLs. Avoid returning listings without application links. If a company website is not available, you can leave that field blank.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: jobListingSchema,
        },
      },
    });
    
    const responseText = response.text.trim();
    if (!responseText) {
      return [];
    }
    const listings = JSON.parse(responseText);
    
    // Basic validation to ensure we have an array
    if (!Array.isArray(listings)) {
        throw new Error("AI response was not in the expected format (array).");
    }

    return listings;
  } catch (error) {
    console.error("Error fetching or parsing job listings from Gemini API:", error);
    throw new Error("Failed to fetch job listings from the AI. The model may be unable to find results for your query.");
  }
};
