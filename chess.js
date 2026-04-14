
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
    update_cell("8_b", board, "knight", "b");
    update_cell("8_c", board, "bishop", "b");
    update_cell("8_d", board, "queen", "b");
    update_cell("8_e", board, "king", "b");
    update_cell("8_f", board, "bishop", "b");
    update_cell("8_g", board, "knight", "b");
    update_cell("8_h", board, "rook", "b");
    update_cell("7_a", board, "pawn", "b");
    update_cell("7_b", board, "pawn", "b");
    update_cell("7_c", board, "pawn", "b");
    update_cell("7_d", board, "pawn", "b");
    update_cell("7_e", board, "pawn", "b");
    update_cell("7_f", board, "pawn", "b");
    update_cell("7_g", board, "pawn", "b");
    update_cell("7_h", board, "pawn", "b");
    update_cell("1_a", board, "rook", "w");
    update_cell("1_b", board, "knight", "w");
    update_cell("1_c", board, "bishop", "w");
    update_cell("1_d", board, "queen", "w");
    update_cell("1_e", board, "king", "w");
    update_cell("1_f", board, "bishop", "w");
    update_cell("1_g", board, "knight", "w");
    update_cell("1_h", board, "rook", "w");
    update_cell("2_a", board, "pawn", "w");
    update_cell("2_b", board, "pawn", "w");
    update_cell("2_c", board, "pawn", "w");
    update_cell("2_d", board, "pawn", "w");
    update_cell("2_e", board, "pawn", "w");
    update_cell("2_f", board, "pawn", "w");
    update_cell("2_g", board, "pawn", "w");
    update_cell("2_h", board, "pawn", "w");
};

const board = make_board();
init_board(board);

let current_piece = null;
let current_player = "w";

// handle clicking on a space on the chess board
const selection = (event) => {
    // get the space that was clicked
    const selected_td = event.currentTarget;
    // determine if this is a move or select or deselect click
    //      deselect when they click the cell that contains the current piece
    //      select when no current piece is selected
    //      otherwise, attempt to move the piece
    if (selected_td === ) {
        
    } else if (selected_td ===) {
        
    } else if () {

    }

}


console.log(board);