const BOARDGAME_API_URL = 'http://localhost:8080/boardgames';

export const getBoardGames = async () => {
    const response = await fetch(BOARDGAME_API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const createBoardGame = async (boardgame) => {
    const response = await fetch(BOARDGAME_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardgame),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const deleteBoardGame = async (id) => {
    const response = await fetch(`${BOARDGAME_API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};

export const updateBoardGame = async (boardgame) => {
    const response = await fetch(`${BOARDGAME_API_URL}/${boardgame.boardgame_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardgame),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};