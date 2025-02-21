"use client";
import { useState } from "react";
import axios from "axios";

export default function PlanPage() {
    const api_Key = "AIzaSyDzPRHzaBLVTyfZG_9B-ZSNU58esvFp9RI";
    const api_Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api_Key}`;

    const [form, setForm] = useState({
        Number_of_days: "",
        Number_of_people: "",
        cost: "luxury",
        type: "",
        weather: "sunny",
        Date: ""
    });

    const [aiResponse, setAiResponse] = useState("");
    const [isPlanGenerated, setIsPlanGenerated] = useState(false); // To control form visibility

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        generatePlan(); // Call function to generate plan
    };

    const generatePlan = async () => {
        try {
            const response = await axios.post(api_Url, {
                contents: [
                    {
                        parts: [
                            { text: `Create a travel plan in morocco and must be based on real data, based on this data: ${JSON.stringify(form)} no emogy needed or ## or ** just text please` }
                        ]
                    }
                ]
            });

            setAiResponse(response.data.candidates[0].content.parts[0].text);
            setIsPlanGenerated(true); // Set flag to hide form and show plan
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setAiResponse("Failed to generate a plan.");
            setIsPlanGenerated(true); // Show message even in case of error
        }
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen -mt-14">
                {/* Conditionally render form or generated plan */}
                {!isPlanGenerated ? (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col bg-white p-8 shadow-2xl w-full max-w-md rounded-md "
                    >
                        <label htmlFor="Number_of_days">Number of days:</label>
                        <input
                            type="number"
                            name="Number_of_days"
                            placeholder="Number of days"
                            value={form.Number_of_days}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                        <label htmlFor="Number_of_people">Number of people:</label>
                        <input
                            type="number"
                            name="Number_of_people"
                            placeholder="Number of people"
                            value={form.Number_of_people}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                        <label htmlFor="cost">Budget:</label>
                        <select
                            id="cost"
                            name="cost"
                            value={form.cost}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="luxury">Luxury</option>
                            <option value="Middle High">Middle High</option>
                            <option value="Middle">Middle</option>
                            <option value="Low">Low</option>
                        </select>

                        <label htmlFor="type">Activities:</label>
                        <input
                            type="text"
                            name="type"
                            placeholder="Activities"
                            value={form.type}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                        <label htmlFor="weather">Preferred weather:</label>
                        <select
                            name="weather"
                            value={form.weather}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="sunny">Sunny</option>
                            <option value="rainy">Rainy</option>
                            <option value="cold">Cold</option>
                            <option value="hot">Hot</option>
                        </select>

                        <label htmlFor="Date">Date:</label>
                        <input
                            type="date"
                            name="Date"
                            placeholder="Date"
                            value={form.Date}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                        <button
                            type="submit"
                            className="mt-6 inline-block px-8 py-4 font-bold text-white bg-teal-500 rounded-xl hover:bg-teal-600 transition-all cursor-pointer"
                        >
                            Generate Plan
                        </button>
                    </form>
                ) : (
                    // This is the part that displays the generated plan
                    <div className="mt-10 p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto space-y-4 border border-gray-200">
                        <h2 className="text-2xl font-bold text-teal-600 mb-4">AI-Generated Plan</h2>
                        <div className="text-gray-800 text-lg">
                        {/* If AI Response contains newlines, you can break them into paragraphs */}
                        {aiResponse.split("\n").map((line, index) => (
                            <p key={index} className="mb-2">
                                {line}
                            </p>
                        ))}
                    </div>
                    <button
                        onClick={() => setIsPlanGenerated(false)} // This hides the plan and shows the form again
                        className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition duration-300"
                    >
                        Regenerate Plan
                    </button>

                        </div>
                    )}       
            </div>
        </>
    );
}
