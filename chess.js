
const update_cell = (cell_id, board, piece, player) => {
    const [row_str, column_str] = cell_id.split("_");
    board[row_str][column_str].piece = piece;
    board[row_str][column_str].player = player;
};

// get cell from board by ID : see update_cell

const make_cell = () => {
    return {
        piece: "",
        player: "",
    };
};

// const cell = make_cell();
// cell.piece = "queen";
// cell.player = "b";

const make_board = () => {
    const board = {};
    const row_str_array = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const col_str_array = ["a", "b", "c", "d", "e", "f", "g", "h"];
    for (let row = 0; row < row_str_array.length; row++) {
        const row_str = row_str_array[row];
        board[row_str] = {};
        for (let col = 0; col < col_str_array.length; col++) {
            const col_str = col_str_array[col];
            board[row_str][col_str] = make_cell();
        };
    };
    return board;
};

const init_board = (board) => {
    update_cell("8_a", board, "rook", "b");
    update_cell("8_a", board, "rook", "b");
    update_cell("8_a", board, "rook", "b");
    update_cell("8_a", board, "rook", "b");
    update_cell("8_a", board, "rook", "b");
};

const board = make_board();
init_board(board);


console.log(board);
