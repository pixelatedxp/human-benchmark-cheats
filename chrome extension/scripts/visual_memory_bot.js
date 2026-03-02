const monitorTiles = async () => {
    const gridSelector = '.css-1qk3bhi';
    const tileSelector = '.css-hqmwod';
    const flippedClass = 'active';
    let initialState = null;
    let gridChangedOnce = false;
    let flippedTiles = [];
    let intervalID, emptyIntervalID;

    const getGridState = () => {
        const gridContainer = document.querySelector(gridSelector);
        if (!gridContainer) return null;

        const rows = Array.from(gridContainer.children);
        return rows.map(row => Array.from(row.children).map(tile => tile.classList.contains(flippedClass)));
    };

    const printBoardReadyForInput = () => {
        console.log('Board is populated and ready for user input!');
    };

    const clickTile = (rowIndex, colIndex) => {
        const gridContainer = document.querySelector(gridSelector);
        const targetTile = gridContainer?.children[rowIndex]?.children[colIndex];
        if (targetTile) {
            ['mousedown', 'mouseup', 'click'].forEach(type =>
                targetTile.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, clientX: 0, clientY: 0 }))
            );
            console.log(`Clicked on tile at (${rowIndex}, ${colIndex})`);
        }
    };

    const stopLoop = () => {
        if (intervalID) clearInterval(intervalID);
        if (emptyIntervalID) clearInterval(emptyIntervalID);
        console.log('Monitoring stopped.');
    };

    const monitorGrid = async () => {
        intervalID = setInterval(() => {
            const gridState = getGridState();
            if (!gridState) return;

            if (!initialState) {
                initialState = gridState;
                console.log('Captured initial board state. Waiting for changes...');
                return;
            }

            const isGridChanged = !gridState.every((row, rowIndex) =>
                row.every((tile, colIndex) => tile === initialState[rowIndex][colIndex])
            );

            if (!gridChangedOnce && isGridChanged) {
                gridChangedOnce = true;
                flippedTiles = gridState.reduce((tiles, row, rowIndex) => {
                    row.forEach((tile, colIndex) => {
                        if (tile) tiles.push({ rowIndex, colIndex });
                    });
                    return tiles;
                }, []);
                console.log('Grid state changed. Waiting for full update...');
                return;
            }

            if (gridChangedOnce && isGridChanged) {
                printBoardReadyForInput();
                clearInterval(intervalID);
                setTimeout(() => {
                    flippedTiles.forEach(tile => clickTile(tile.rowIndex, tile.colIndex));
                    setTimeout(() => {
                        console.log('Waiting for the board to reset...');
                        monitorEmptyBoard();
                    }, 500);
                }, 1500);
            }
        }, 500);
    };

    const monitorEmptyBoard = async () => {
        emptyIntervalID = setInterval(() => {
            const gridState = getGridState();
            if (!gridState) return;

            const isEmpty = gridState.every(row => row.every(tile => !tile));

            if (isEmpty) {
                console.log('Board is empty. Starting a new round!');
                clearInterval(emptyIntervalID);
                initialState = null;
                gridChangedOnce = false;
                monitorGrid();
            }
        }, 500);
    };

    monitorGrid();

    window.stopLoop = stopLoop;
};
monitorTiles();
