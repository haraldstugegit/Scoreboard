import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './Scoreboard.css'; // Make sure you have the CSS file linked here

const Scoreboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch('/scores.xlsx')
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const wb = XLSX.read(buffer, { type: 'buffer' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const scoresData = data.slice(1).map(row => ({
          'Team Name': row[0],
          'Country': row[1],
          'Score': row[2],
        }));
        scoresData.sort((a, b) => b.Score - a.Score);
        setScores(scoresData);
      });
  }, []);

  return (
    <div className="scoreboard-container">
      <h1>Competition Scoreboard</h1>
      <table className="scoreboard">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Country</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((item, index) => {
            const flagFileName = item.Country.replace(/\s+/g, '').toLowerCase();
            return (
              <tr key={index} className={index % 2 === 0 ? "even" : ""}>
                <td>{item['Team Name']}</td>
                <td>
                  <img src={`/flags/${flagFileName}.png`} alt={item.Country} className="country-flag" />
                </td>
                <td>{item.Score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
