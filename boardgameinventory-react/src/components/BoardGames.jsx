import React, { useEffect, useState } from 'react';
import { getBoardGames, createBoardGame, deleteBoardGame, updateBoardGame } from '../services/boardgameApi';
import './BoardGames.css';

const BoardGameList = () => {
    const [boardgames, setBoardGames] = useState([]);
    const [name, setName] = useState('');
    const [publisher, setPublisher] = useState('');
    const [reorder_quantity, setReorder_Quantity] = useState('');
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [currentBoardGame, setCurrentBoardGame] = useState({});
    const [showForm, setShowForm] = useState(false);

    // Handle GET Request
    useEffect(() => {
        const fetchBoardGames = async () => {
            try {
                const data = await getBoardGames();
                setBoardGames(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBoardGames();
    }, []);

    // Handle POST Request
    const handleCreateBoardGame = async () => {
        const newBoardGame = { name, publisher, reorder_quantity };
        try {
            await createBoardGame(newBoardGame);
            const data = await getBoardGames();
            setBoardGames(data);
            setShowForm(false); // Hide form after creating
        } catch (error) {
            setError(error.message);
        }
    };

    // Handle DELETE Request
    const handleDeleteBoardGame = async (boardgame_id) => {
        console.log('Deleting board game with id:', boardgame_id); // Log the id
        // Show confirmation dialog with a message about cascading deletes
        const userConfirmed = window.confirm(
            'Are you sure you want to delete this warehouse? All associated inventory will also be deleted.'
        );
        if (userConfirmed) {
            try {
                await deleteBoardGame(boardgame_id);
                const data = await getBoardGames();
                setBoardGames(data);
            } catch (error) {
                setError(error.message);
            }
        }

    };

    // Handle EDIT Request
    const handleEditBoardGame = (boardgame) => {
        setEditing(true);
        setCurrentBoardGame(boardgame);
        setName(boardgame.name);
        setPublisher(boardgame.publisher);
        setReorder_Quantity(boardgame.reorder_quantity);
        setShowForm(true); // Show form when editing
    };

    const handleUpdateBoardGame = async () => {
        const updatedBoardGame = { ...currentBoardGame, name, publisher, reorder_quantity };
        try {
            await updateBoardGame(updatedBoardGame);
            const data = await getBoardGames();
            setBoardGames(data);
            setEditing(false);
            setCurrentBoardGame({});
            setName('');
            setPublisher('');
            setReorder_Quantity(0);
            setShowForm(false); // Hide form after updating
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleForm = () => {
        setEditing(false);
        setShowForm(!showForm);
        setName('');
        setPublisher('');
        setReorder_Quantity('');
    };

    return (
        <div className="container">
            {error && <p className="error">{error}</p>}
            <button onClick={toggleForm}>
                {showForm ? 'Cancel' : 'Add Board Game'}
            </button>
            {showForm && (
                <div className="form-container">
                    <h2>{editing ? 'Edit Board Game' : 'Add Board Game'}</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Publisher"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Reorder Quantity"
                        value={reorder_quantity}
                        onChange={(e) => setReorder_Quantity(e.target.value)}
                    />
                    <button onClick={editing ? handleUpdateBoardGame : handleCreateBoardGame}>
                        {editing ? 'Update' : 'Create'}
                    </button>
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Publisher</th>
                        <th>Reorder Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {boardgames.map(boardgame => (
                        <tr key={boardgame.boardgame_id}>
                            <td>{boardgame.name}</td>
                            <td>{boardgame.publisher}</td>
                            <td>{boardgame.reorder_quantity}</td>
                            <td>
                                <button onClick={() => handleDeleteBoardGame(boardgame.boardgame_id)}>Delete</button>
                                <button onClick={() => handleEditBoardGame(boardgame)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default BoardGameList;
