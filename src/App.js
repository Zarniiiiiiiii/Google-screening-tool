import React, { useState } from "react";

function App() {
  const [entities, setEntities] = useState("");
  const [dorkTemplate, setDorkTemplate] = useState(`"%s" fraud OR AML OR sanctions`);
  const [delay, setDelay] = useState(500);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Funcție generică să deschidă taburile cu un tip de query: "normal" sau "dork"
  const openTabs = async (type) => {
    const lines = entities
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    for (const name of lines) {
      let query = "";
      if (type === "normal") {
        query = name;
      } else if (type === "dork") {
        query = dorkTemplate.replace("%s", name);
      }
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.open(url, "_blank");
      await sleep(delay);
    }
  };

  // Butonul care caută ambele tipuri (normal + dork)
  const openTabsAll = async () => {
    await openTabs("normal");
    await openTabs("dork");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
        rel="stylesheet"
      />
      <div className="container">
        <h1>
          🔍 Google Screening Tool{" "}
          <span role="img" aria-label="detective">
            🕵️‍♂️
          </span>
        </h1>

        <label htmlFor="entities">Enter one entity per line:</label>
        <textarea
          id="entities"
          placeholder="John Doe&#10;Smart Solar Ltd&#10;ABC Ventures"
          rows={10}
          value={entities}
          onChange={(e) => setEntities(e.target.value)}
        />

        <label htmlFor="dorkTemplate" className="mt-20">
          Google Dork Template
        </label>
        <input
          id="dorkTemplate"
          type="text"
          value={dorkTemplate}
          onChange={(e) => setDorkTemplate(e.target.value)}
        />

        <label htmlFor="delay" className="mt-20">
          Delay between tab openings (in ms)
        </label>
        <select
          id="delay"
          value={delay}
          onChange={(e) => setDelay(parseInt(e.target.value))}
        >
          <option value={250}>250 ms (very fast, may be blocked)</option>
          <option value={500}>500 ms (recommended for &lt;20 entities)</option>
          <option value={1000}>1000 ms (safe for 20–40 entities)</option>
          <option value={2000}>2000 ms (safe for big lists)</option>
        </select>

        <p className="info">
          ⚠️ If screening fewer than 20 entities, 500ms delay is usually safe.
          <br />
          Remember: each entity opens 2 searches – one normal and one using
          dork string.
        </p>

        <div className="button-group">
          <button onClick={() => openTabs("normal")} title="Search normal queries">
            🔎 Search Normal
          </button>
          <button onClick={() => openTabs("dork")} title="Search dork queries">
            💰 Search Dork
          </button>
          <button onClick={openTabsAll} title="Search both normal and dork queries">
            ❗ Search All
          </button>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          background-color: #f5f7fa;
          font-family: 'Inter', sans-serif;
          color: #2c3e50;
        }
        .container {
          max-width: 700px;
          margin: 3rem auto;
          background: white;
          padding: 2.5rem 3rem;
          border-radius: 12px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
        }
        h1 {
          font-weight: 600;
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
          color: #1a1a1a;
          border-bottom: 2px solid #0070f3;
          padding-bottom: 0.3rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        label {
          font-weight: 600;
          display: block;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }
        textarea, input[type="text"], select {
          width: 100%;
          font-size: 1rem;
          padding: 0.65rem 0.75rem;
          border-radius: 8px;
          border: 1.8px solid #ccc;
          transition: border-color 0.25s ease;
          outline-offset: 2px;
          outline-color: transparent;
          font-family: 'Inter', sans-serif;
        }
        textarea:focus, input[type="text"]:focus, select:focus {
          border-color: #0070f3;
          outline-color: #0070f3;
          box-shadow: 0 0 8px rgba(0, 112, 243, 0.35);
        }
        textarea {
          resize: vertical;
          min-height: 150px;
        }
        select {
          cursor: pointer;
        }
        .info {
          margin-top: 0.75rem;
          font-size: 0.9rem;
          color: #555;
          line-height: 1.4;
        }
        .mt-20 {
          margin-top: 1.25rem;
        }
        .button-group {
          margin-top: 2rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        button {
          flex: 1;
          min-width: 150px;
          padding: 0.9rem 0;
          background-color: #0070f3;
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 6px 15px rgba(0, 112, 243, 0.4);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        button:hover {
          background-color: #005bb5;
          box-shadow: 0 8px 20px rgba(0, 91, 181, 0.6);
        }
        @media (max-width: 480px) {
          .container {
            padding: 1.5rem 1.5rem;
          }
          h1 {
            font-size: 1.7rem;
          }
          .button-group {
            flex-direction: column;
          }
          button {
            min-width: 100%;
          }
        }
      `}</style>
    </>
  );
}

export default App;
