import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputData, setInputData] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      const apiResponse = await axios.post("https://22-bcs-10137-shourya-kapoor-ndbu.vercel.app/bfhl", parsedData);
      setResponse(apiResponse.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON input. Please check your input.");
      setResponse(null);
    }
  };

  const handleFilterChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedFilters(options);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    if (selectedFilters.includes("numbers")) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedFilters.includes("alphabets")) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedFilters.includes("highest_alphabet")) {
      filteredResponse.highest_alphabet = response.highest_alphabet;
    }

    return (
      <div>
        <h3>Filtered Response</h3>
        {Object.entries(filteredResponse).map(([key, value]) => (
          <p key={key}>
            {key}: {value.join(", ")}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>ABCD123</h1>
      <textarea
        placeholder='Enter JSON data (e.g., { "data": ["M","1","334","4","B"] })'
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <div>
          <select multiple onChange={handleFilterChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
};

export default App;