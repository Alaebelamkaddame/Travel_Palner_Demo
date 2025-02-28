"use client";

import { useState } from "react";
import axios from "axios";

export default function PlanPage() {
  const api_Key = "AIzaSyDzPRHzaBLVTyfZG_9B-ZSNU58esvFp9RI";
  const api_Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api_Key}`;

  const [form, setForm] = useState({
    Number_of_days: "",
    Number_of_people: "",
    city: "",
    cost: "luxury",
    type: "",
    weather: "sunny",
    Date: ""
  });

  const [aiResponse, setAiResponse] = useState(null);
  const [isPlanGenerated, setIsPlanGenerated] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePlan();
  };

  const generatePlan = async () => {
    try {
      const response = await axios.post(api_Url, {
        contents: [
          {
            parts: [
              {
                text: `Generate a detailed travel plan for Morocco in valid JSON format only. Do not include any explanations, markdown, or extra formatting. The response should strictly follow this structure:
                {
                  "days": [
                    {
                      "day": 1,
                      "title": "Arrival in ${form.city}",
                      "activities": ["describe the activity"],
                      "accommodation": "",
                      "transportation": "Airport transfer",
                      "dining": "",
                      "tips": "Carry local currency",
                      "image_search_query": "Best tourist spots in ${form.city}"
                    }
                  ]
                }
                Ensure the JSON output is valid and properly formatted, don't suggest anything isn't in the form, stick to the form strictly, if only a one city is 
                mentionned don't suggest travel to other city .`
              }
            ]
          }
        ]
      });

      console.log("API Response:", response.data);

      let rawText = response.data.candidates[0]?.content?.parts[0]?.text.trim();

      if (rawText.startsWith("```json")) {
        rawText = rawText.replace(/```json|```/g, "").trim();
      }

      try {
        const aiData = JSON.parse(rawText);
        setAiResponse(aiData);
        setIsPlanGenerated(true);
      } catch (parseError) {
        console.error("JSON Parsing Error:", parseError);
        setAiResponse({ error: "Invalid response format from AI." });
        setIsPlanGenerated(true);
      }
    } catch (error) {
      console.error("API Error:", error);
      setAiResponse({ error: "Failed to generate a plan. Please try again." });
      setIsPlanGenerated(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen -mt-14">
      {!isPlanGenerated ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-white p-8 shadow-2xl w-full max-w-md rounded-md"
        >
          {[{ label: "Number of days:", name: "Number_of_days", type: "number" },
            { label: "Number of people:", name: "Number_of_people", type: "number" },
            { label: "City:", name: "city", type: "text" },
            { label: "Activities:", name: "type", type: "text" },
            { label: "Date:", name: "Date", type: "date" }
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                type={type}
                name={name}
                placeholder={label}
                value={form[name]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          ))}

          {[{
              label: "Budget:",
              name: "cost",
              options: ["Luxury", "Middle High", "Middle", "Low"]
            },
            {
              label: "Preferred weather:",
              name: "weather",
              options: ["Sunny", "Rainy", "Cold", "Hot"]
            }
          ].map(({ label, name, options }) => (
            <div key={name}>
              <label htmlFor={name}>{label}</label>
              <select
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {options.map((option) => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            type="submit"
            className="mt-6 px-8 py-4 font-bold text-white bg-teal-500 rounded-xl hover:bg-teal-600 transition-all"
          >
            Generate Plan
          </button>
        </form>
      ) : (
        <div className="mt-10 p-6 bg-white shadow-lg rounded-lg w-5/6 space-y-4 border border-gray-200">
          <h2 className="text-2xl font-bold text-teal-600 mb-4">AI-Generated Plan</h2>
          {aiResponse?.error ? (
            <p className="text-red-500">{aiResponse.error}</p>
          ) : (
            <div className="text-gray-800 text-lg space-y-3">
              {aiResponse?.days?.map((day, index) => (
                <div key={index} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-blue-600">{`Day ${day.day}: ${day.title}`}</h3>
                  {day.image_search_query && (
                    <a
                      href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(day.image_search_query)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-teal-600 font-semibold mt-2 hover:underline"
                    >
                      View Images on Google
                    </a>
                  )}
                  <h4 className="text-lg font-semibold text-teal-500 mt-2">Activities:</h4>
                  <ul className="list-disc list-inside">
                    {day.activities.map((activity, i) => (
                      <li key={i} className="text-gray-700">{activity}</li>
                    ))}
                  </ul>
                  <p className="text-gray-700"><strong>Accommodation:</strong> {day.accommodation}</p>
                  <p className="text-gray-700"><strong>Dining:</strong> {day.dining}</p>
                  <p className="text-gray-700"><strong>Transportation:</strong> {day.transportation}</p>
                  <p className="text-gray-700"><strong>Tips:</strong> {day.tips}</p>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => setIsPlanGenerated(false)}
            className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition duration-300"
          >
            Regenerate Plan
          </button>
        </div>
      )}
    </div>
  );
}
