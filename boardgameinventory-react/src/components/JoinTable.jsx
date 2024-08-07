import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BoardGames.css'

const JoinTable = () => {
  const { id } = useParams();
  const [joinTableData, setJoinTableData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJoinTableData = async () => {
      console.log('Fetching data...');
      try {
        const response = await fetch(`http://localhost:8080/warehouses/${id}/inventories`); // Adjust the API endpoint as needed
        if (!response.ok) {
          console.error('Network response was not ok:', response.statusText);
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        setJoinTableData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      }
    };

    fetchJoinTableData();
  }, [id]);

  return (
    <div className="container">
      <h2>Board Games in Warehouse</h2>
      {error && <div>Error: {error}</div>}
      <table>
        <thead>
          <tr>
            <th>Board Game Name</th>
            <th>Quantity in Stock</th>
          </tr>
        </thead>
        <tbody>
          {joinTableData.map((inventory) => (
            <tr key={inventory.inventory_id}>
              <td>{inventory.boardgame.name}</td>
              <td>{inventory.quantity_available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JoinTable;
