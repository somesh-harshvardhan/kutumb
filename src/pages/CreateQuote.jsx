import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuote, uploadMedia } from "../utils/api";
import { toast } from "react-toastify";
import { routes } from "../utils/routes";

const CreateQuotePage = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const mediaUrl = await uploadMedia(file);
      await createQuote(text, mediaUrl);
      navigate(routes.quote);
      toast.success("Quote created successfully");
    } catch (error) {
      toast.error("Failed to create quote");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Create Quote
        </h1>
        <textarea
          placeholder="Enter quote text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 resize-none"
          rows="4"
        />
        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload Media
          </label>
          <input
            type="file"
            id="file-upload"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-sm text-gray-500 border border-gray-300 rounded-lg p-2"
          />
        </div>
        <button
          onClick={handleSubmit}
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg
                      ${
                        !text || !file
                          ? " bg-blue-300 cursor-not-allowed"
                          : " bg-blue-400 hover:bg-blue-500"
                      }
                  `}
          disabled={!text || !file}
        >
          Create Quote
        </button>
        <button
          onClick={() => navigate(routes.quote)}
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg  bg-gray-500 mt-2`}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CreateQuotePage;
