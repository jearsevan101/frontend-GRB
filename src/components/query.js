import React, { useState } from "react";

const InputQuery = () => {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const handleQuery = async () => {
    try {
      const response = await fetch("https://backend-grb.vercel.app/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Query execution failed");
      }

      const data = await response.json();

      // Process the data or format it as per your requirement
      const processedOutput = JSON.stringify(data, null, 2);
      setOutput(processedOutput);
    } catch (error) {
      console.error(error.message);
    }
  };
  const refreshPage = () => {
    window.location = "/";
  };
  return (
    <div>
      <h1 className="text-center mt-5">SQL Builder</h1>
      <div>
        <label htmlFor="query">Query:</label>
        <textarea
          id="query"
          rows={10}
          style={{ width: "100%" , height: "200px"}}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button onClick={handleQuery} className="btn btn-warning" style={{ backgroundColor: "#ffcc00", color: "#fff" }}>Submit</button>
      <button onClick={refreshPage} className="btn btn-warning" style={{ backgroundColor: "#66ccff", color: "#fff" }}>Refresh</button>
      <div>
      <label htmlFor="output">Output:</label>
        <textarea
          style={{ width: "100%", height: "200px" }}
          readOnly
          value={output}
        />
      </div>
    </div>
  );
};

export default InputQuery;
