
const update_cell = (cell_id, board, piece) => {
    const [row_str, column_str] = cell_id.split("_");
    board[row_str][column_str].piece = piece;
};

// get cell from board by ID : see update_cell

const make_cell = (current_pos) => {
    return {
        piece: make_piece("", "", "", current_pos),
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
            board[row_str][col_str] = make_cell(`${row_str}_${col_str}`);
        };
    };
    return board;
};


// make piece object

const make_piece = (type, player, origin, current_pos) => {
    return {
        type: type,
        player: player,
        origin: origin,
        current_pos: current_pos
    };
};

const checkPawnMove = (cell_id, piece) => {
    // get pawn position
    // calculate allowed pawn moves
    // check if cell_id in allowed moves
};

const checkRookMove = (cell_id, piece) => {

};

const checkKnightMove = (cell_id, piece) => {

};

const checkBishopMove = (cell_id, piece) => {

};

const checkKingMove = (cell_id, piece) => {

};

const checkQueenMove = (cell_id, piece) => {

};

// check if attempted move is legal

const checkMove = (cell_id, piece) => {
    // check which piece is selected 
    // check what moves are allowed by piece
    if (piece.type === "pawn") {
        if (checkPawnMove(cell_id, piece)) {
            
        };
    } else if (piece.type === "rook") {
        if (checkRookMove(cell_id, piece)) {
            
        };
    } else if (piece.type === "knight") {
        if (checkKnightMove(cell_id, piece)) {
            
        };
    } else if (piece.type === "bishop") {
        if (checkBishopMove(cell_id, piece)) {
            
        };
    } else if (piece.type === "king") {
        if (checkKingMove(cell_id, piece)) {
            
        };
    } else if (piece.type === "queen") {
        if (checkQueenMove(cell_id, piece)) {
            
        };
    } else {
        console.log("Invalid piece type.")
    };
};

const change_player = () => {
    if (current_player === "w") {
        current_player = "b"
    } else {
        current_player = "w"
    }
}

// initialze board

const init_board = (board) => {
    update_cell("8_a", board, make_piece("rook", "b", "8_a", "8_a"));
    update_cell("8_b", board, make_piece("knight", "b", "8_b", "8_b"));
    update_cell("8_c", board, make_piece("bishop", "b", "8_c", "8_c"));
    update_cell("8_d", board, make_piece("queen", "b", "8_d", "8_d"));
    update_cell("8_e", board, make_piece("king", "b", "8_e", "8_e"));
    update_cell("8_f", board, make_piece("bishop", "b", "8_f", "8_f"));
    update_cell("8_g", board, make_piece("knight", "b", "8_g", "8_g"));
    update_cell("8_h", board, make_piece("rook", "b", "8_h", "8_h"));
    update_cell("7_a", board, make_piece("pawn", "b", "7_a", "7_a"));
    update_cell("7_b", board, make_piece("pawn", "b", "7_b", "7_b"));
    update_cell("7_c", board, make_piece("pawn", "b", "7_c", "7_c"));
    update_cell("7_d", board, make_piece("pawn", "b", "7_d", "7_d"));
    update_cell("7_e", board, make_piece("pawn", "b", "7_e", "7_e"));
    update_cell("7_f", board, make_piece("pawn", "b", "7_f", "7_f"));
    update_cell("7_g", board, make_piece("pawn", "b", "7_g", "7_g"));
    update_cell("7_h", board, make_piece("pawn", "b", "7_h", "7_h"));
    update_cell("1_a", board, make_piece("rook", "w", "1_a", "1_a"));
    update_cell("1_b", board, make_piece("knight", "w", "1_b", "1_b"));
    update_cell("1_c", board, make_piece("bishop", "w", "1_c", "1_c"));
    update_cell("1_d", board, make_piece("queen", "w", "1_d", "1_d"));
    update_cell("1_e", board, make_piece("king", "w", "1_e", "1_e"));
    update_cell("1_f", board, make_piece("bishop", "w", "1_f", "1_f"));
    update_cell("1_g", board, make_piece("knight", "w", "1_g", "1_g"));
    update_cell("1_h", board, make_piece("rook", "w", "1_h", "1_h"));
    update_cell("2_a", board, make_piece("pawn", "w", "2_a", "2_a"));
    update_cell("2_b", board, make_piece("pawn", "w", "2_b", "2_b"));
    update_cell("2_c", board, make_piece("pawn", "w", "2_c", "2_c"));
    update_cell("2_d", board, make_piece("pawn", "w", "2_d", "2_d"));
    update_cell("2_e", board, make_piece("pawn", "w", "2_e", "2_e"));
    update_cell("2_f", board, make_piece("pawn", "w", "2_f", "2_f"));
    update_cell("2_g", board, make_piece("pawn", "w", "2_g", "2_g"));
    update_cell("2_h", board, make_piece("pawn", "w", "2_h", "2_h"));
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
    if (current_piece && selected_td.id === current_piece.current_pos) {
        current_piece = null;
    } else if (!current_piece) {
        current_piece = getPiece(selected_td.id)
    } else {
        checkMove(selected_td.id, current_piece)
        current_player = change_player(current_player)
    }
}

console.log(board);