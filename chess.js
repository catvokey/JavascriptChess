
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

const getPiece = (cell_id) => {
    const [row, col] = cell_id.split("_");
    return board[row][col];
};

// check for opponent piece in cell
const checkForOpponent = (cell_id) => {
    const piece = getPiece(cell_id);
    return piece.player != current_player && piece.player != ""
};

// check if cell is empty
const isCellEmpty = (cell_id) => {
    const piece = getPiece(cell_id);
    return piece.type === ""
};


const convertColToNum = (col) => {
    if (col === "a") {
        return 1;
    } else if (col === "b") {
        return 2;
    } else if (col === "c") {
        return 3;
    } else if (col === "d") {
        return 4;
    } else if (col === "e") {
        return 5;
    } else if (col === "f") {
        return 6;
    } else if (col === "g") {
        return 7;
    } else if (col === "h") {
        return 8;
    };
};

const convertColToLetter = (col) => {
    if (col === 1) {
        return "a";
    } else if (col === 2) {
        return "b";
    } else if (col === 3) {
        return "c";
    } else if (col === 4) {
        return "d";
    } else if (col === 5) {
        return "e";
    } else if (col === 6) {
        return "f";
    } else if (col === 7) {
        return "g";
    } else if (col === 8) {
        return "h";
    };
}; 


const checkPawnMove = (piece) => {
    // get pawn position
    // calculate allowed pawn moves
    // pawns can move forward one space, or two spaces if they are in their starting 
    // position. They can also capture diagonally one space forward.
    const [row, col] = piece.current_pos.split("_");
    const row_num = parseInt(row);
    const col_num = convertColToNum(col);

    const allowed_moves = [];
    if (piece.current_pos === piece.origin) {
        // can move forward one or two spaces
        if (piece.player === "w") {
            allowed_moves.push(`${row_num + 1}_${col}`);
            allowed_moves.push(`${row_num + 2}_${col}`);
        } else if (piece.player === "b") {
            allowed_moves.push(`${row_num - 1}_${col}`);
            allowed_moves.push(`${row_num - 2}_${col}`);
        };
    } else if (piece.current_pos !== piece.origin) {
        // can move forward one space and can capture diagonally one space forward
        if (piece.player === "w") {
            if (checkForOpponent(`${row_num + 1}_${col}`)) {
                allowed_moves.push(`${row_num + 1}_${col}`);
                break;
            } else if (!isCellEmpty(`${row_num + 1}_${col}`)) {
                break;
            } else {
                allowed_moves.push(`${row_num + 1}_${col}`);
            }
            if (checkForOpponent(`${row_num + 1}_${convertColToLetter(col_num + 1)}`)) {
                allowed_moves.push(`${row_num + 1}_${convertColToLetter(col_num + 1)}`);
                break;
            } else if (!isCellEmpty(`${row_num + 1}_${convertColToLetter(col_num + 1)}`)) {
                break;
            } else {
                allowed_moves.push(`${row_num + 1}_${convertColToLetter(col_num + 1)}`);
            }
            if (checkForOpponent(`${row_num + 1}_${convertColToLetter(col_num - 1)}`)) {
                allowed_moves.push(`${row_num + 1}_${convertColToLetter(col_num - 1)}`);
                break;
            } else if (!isCellEmpty(`${row_num + 1}_${convertColToLetter(col_num - 1)}`)) {
                break;
            } else {
                allowed_moves.push(`${row_num + 1}_${convertColToLetter(col_num - 1)}`);
            }
        } else if (piece.player === "b") {
            if (checkForOpponent(`${row_num - 1}_${col}`)) {
                allowed_moves.push(`${row_num - 1}_${col}`);
                break;
            } else if (!isCellEmpty(`${row_num - 1}_${col}`)) {
                break;
            } else {
                allowed_moves.push(`${row_num - 1}_${col}`);
            }
            if (checkForOpponent(`${row_num - 1}_${convertColToLetter(col_num + 1)}`)) {
                allowed_moves.push(`${row_num - 1}_${convertColToLetter(col_num + 1)}`);
                break;
            } else if (!isCellEmpty(`${row_num - 1}_${convertColToLetter(col_num + 1)}`)) {
                break;
            } else {
                allowed_moves.push(`${row_num - 1}_${convertColToLetter(col_num + 1)}`);
            }
            if (checkForOpponent(`${row_num - 1}_${convertColToLetter(col_num - 1)}`)) {
                allowed_moves.push(`${row_num - 1}_${convertColToLetter(col_num - 1)}`);
                break;
            } else if (!isCellEmpty(`${row_num - 1}_${convertColToLetter(col_num - 1)}`)) {
                break;
            } else {
                allowed_moves.push(`${row_num - 1}_${convertColToLetter(col_num - 1)}`);
            }
        };
    }
    return allowed_moves;
};

const checkRookMove = (piece) => {
    // get rook position
    // calculate allowed rook moves
    // rooks can move any number of spaces left or right, or forward or backward, 
    // but cannot jump over other pieces.

    const [row, col] = piece.current_pos.split("_");
    const row_num = parseInt(row);
    const col_num = convertColToNum(col);
    
    const allowed_moves = [];
    if (piece.player === "w") {
        for (let i = col_num + 1; i <= 8; i++) {
            if (checkForOpponent(`${row}_${convertColToLetter(i)}`)) {
                break;
            } else if (!isCellEmpty(`${row}_${convertColToLetter(i)}`)) {
                allowed_moves.push(`${row}_${convertColToLetter(i)}`);
                break;
            } else {
                allowed_moves.push(`${row}_${convertColToLetter(i)}`);
            }
        }
        for (let i = row_num + 1; i <= 8; i++) {
            if (checkForOpponent(`${i}_${col}`)) {
                break;
            } else if (!isCellEmpty(`${i}_${col}`)) {
                allowed_moves.push(`${i}_${col}`);
                break;
            } else {
                allowed_moves.push(`${i}_${col}`);
            }
        }
    } else if (piece.player === "b") {
        for (let i = col_num - 1; i >= 1; i--) {
            if (checkForOpponent(`${row}_${convertColToLetter(i)}`)) {
                break;
            } else if (!isCellEmpty(`${row}_${convertColToLetter(i)}`)) {
                allowed_moves.push(`${row}_${convertColToLetter(i)}`);
                break;
            } else {
                allowed_moves.push(`${row}_${convertColToLetter(i)}`);
            }
        }
        for (let i = row_num - 1; i >= 1; i--) {
             if (checkForOpponent(`${i}_${col}`)) {
                break;
            } else if (!isCellEmpty(`${i}_${col}`)) {
                allowed_moves.push(`${i}_${col}`);
            } else {
                allowed_moves.push(`${i}_${col}`);
            }
        }
    }
    return allowed_moves;
};


const checkKnightMove = (piece) => {
    // get knight position
    // calculate allowed knight moves
    // knights can move in an L shape: two spaces in one direction and then one
    // space perpendicular to that. They can jump over other pieces. horsey can jump
    const [row, col] = piece.current_pos.split("_");
    const row_num = parseInt(row);
    const col_num = convertColToNum(col);

    const allowed_moves = [];
    if (isCellEmpty(`${row_num + 2}_${convertColToLetter(col_num + 1)}`) || checkForOpponent(`${row_num + 2}_${convertColToLetter(col_num + 1)}`))
        allowed_moves.push(`${row_num + 2}_${convertColToLetter(col_num + 1)}`);
    if (isCellEmpty(`${row_num + 2}_${convertColToLetter(col_num - 1)}`) || checkForOpponent(`${row_num + 2}_${convertColToLetter(col_num - 1)}`))
        allowed_moves.push(`${row_num + 2}_${convertColToLetter(col_num - 1)}`);
    if (isCellEmpty(`${row_num - 2}_${convertColToLetter(col_num + 1)}`) || checkForOpponent(`${row_num - 2}_${convertColToLetter(col_num + 1)}`))
        allowed_moves.push(`${row_num - 2}_${convertColToLetter(col_num + 1)}`);
    if (isCellEmpty(`${row_num - 2}_${convertColToLetter(col_num - 1)}`) || checkForOpponent(`${row_num - 2}_${convertColToLetter(col_num - 1)}`))
        allowed_moves.push(`${row_num - 2}_${convertColToLetter(col_num - 1)}`);
    if (isCellEmpty(`${row_num + 1}_${convertColToLetter(col_num + 2)}`) || checkForOpponent(`${row_num + 1}_${convertColToLetter(col_num + 2)}`))
        allowed_moves.push(`${row_num + 1}_${convertColToLetter(col_num + 2)}`);
    if (isCellEmpty(`${row_num + 1}_${convertColToLetter(col_num - 2)}`) || checkForOpponent(`${row_num + 1}_${convertColToLetter(col_num - 2)}`))
        allowed_moves.push(`${row_num + 1}_${convertColToLetter(col_num - 2)}`);
    if (isCellEmpty(`${row_num - 1}_${convertColToLetter(col_num + 2)}`) || checkForOpponent(`${row_num - 1}_${convertColToLetter(col_num + 2)}`))
        allowed_moves.push(`${row_num - 1}_${convertColToLetter(col_num + 2)}`);
    if (isCellEmpty(`${row_num - 1}_${convertColToLetter(col_num - 2)}`) || checkForOpponent(`${row_num - 1}_${convertColToLetter(col_num - 2)}`))
        allowed_moves.push(`${row_num - 1}_${convertColToLetter(col_num - 2)}`);
    return allowed_moves;
};

const checkBishopMove = (piece) => {
    // get bishop position
    // calculate allowed bishop moves
    // bishops can move any number of spaces diagonally, but cannot jump over other pieces.
    const [row, col] = piece.current_pos.split("_");
    const row_num = parseInt(row);
    const col_num = convertColToNum(col);

    const allowed_moves = [];
    for (let i = 1; i <= 8; i++) {
        if (checkForOpponent(`${row_num + i}_${convertColToLetter(col_num + i)}`)) {
            allowed_moves.push(`${row_num + i}_${convertColToLetter(col_num + i)}`);
            break;
        } else if (!isCellEmpty(`${row_num + i}_${convertColToLetter(col_num + i)}`)) {
            break;
        } else {
            allowed_moves.push(`${row_num + i}_${convertColToLetter(col_num + i)}`);
        }
    }
    for (let i = 1; i <= 8; i++) {
        if (checkForOpponent(`${row_num + i}_${convertColToLetter(col_num - i)}`)) {
            allowed_moves.push(`${row_num + i}_${convertColToLetter(col_num - i)}`);
            break;
        } else if (!isCellEmpty(`${row_num + i}_${convertColToLetter(col_num - i)}`)) {
            break;
        } else {
            allowed_moves.push(`${row_num + i}_${convertColToLetter(col_num - i)}`);
        }
    }
    for (let i = 1; i <= 8; i++) {
        if (checkForOpponent(`${row_num - i}_${convertColToLetter(col_num + i)}`)) {
            allowed_moves.push(`${row_num - i}_${convertColToLetter(col_num + i)}`);
            break;
        } else if (!isCellEmpty(`${row_num - i}_${convertColToLetter(col_num + i)}`)) {
            break;
        } else {
            allowed_moves.push(`${row_num - i}_${convertColToLetter(col_num + i)}`);
        }
    }
    for (let i = 1; i <= 8; i++) {
        if (checkForOpponent(`${row_num - i}_${convertColToLetter(col_num - i)}`)) {
            allowed_moves.push(`${row_num - i}_${convertColToLetter(col_num - i)}`);
            break;
        } else if (!isCellEmpty(`${row_num - i}_${convertColToLetter(col_num - i)}`)) {
            break;
        } else {
            allowed_moves.push(`${row_num - i}_${convertColToLetter(col_num - i)}`);
        }
    };
    return allowed_moves;
};

const checkKingMove = (piece) => {
    // get king position
    // calculate allowed king moves
    // kings can move one space in any direction, but cannot move into check.
    const [row, col] = piece.current_pos.split("_");
    const row_num = parseInt(row);
    const col_num = convertColToNum(col);

    const allowed_moves = [];
    if (checkForOpponent(`${row_num + 1}_${convertColToLetter(col_num)}`) || isCellEmpty(`${row_num + 1}_${convertColToLetter(col_num)}`)) 
        allowed_moves.push(`${row_num + 1}_${convertColToLetter(col_num)}`);
    if (checkForOpponent(`${row_num - 1}_${convertColToLetter(col_num)}`) || isCellEmpty(`${row_num - 1}_${convertColToLetter(col_num)}`)) 
        allowed_moves.push(`${row_num - 1}_${convertColToLetter(col_num)}`);
    if (checkForOpponent(`${row_num}_${convertColToLetter(col_num + 1)}`) || isCellEmpty(`${row_num}_${convertColToLetter(col_num + 1)}`)) 
        allowed_moves.push(`${row_num}_${convertColToLetter(col_num + 1)}`);
    if (checkForOpponent(`${row_num}_${convertColToLetter(col_num - 1)}`) || isCellEmpty(`${row_num}_${convertColToLetter(col_num - 1)}`)) 
        allowed_moves.push(`${row_num}_${convertColToLetter(col_num - 1)}`);
    if (checkForOpponent(`${row_num + 1}_${convertColToLetter(col_num + 1)}`) || isCellEmpty(`${row_num + 1}_${convertColToLetter(col_num + 1)}`)) 
        allowed_moves.push(`${row_num + 1}_${convertColToLetter(col_num + 1)}`);
    if (checkForOpponent(`${row_num + 1}_${convertColToLetter(col_num - 1)}`) || isCellEmpty(`${row_num + 1}_${convertColToLetter(col_num - 1)}`)) 
        allowed_moves.push(`${row_num + 1}_${convertColToLetter(col_num - 1)}`);
    if (checkForOpponent(`${row_num - 1}_${convertColToLetter(col_num + 1)}`) || isCellEmpty(`${row_num - 1}_${convertColToLetter(col_num + 1)}`)) 
        allowed_moves.push(`${row_num - 1}_${convertColToLetter(col_num + 1)}`);
    if (checkForOpponent(`${row_num - 1}_${convertColToLetter(col_num - 1)}`) || isCellEmpty(`${row_num - 1}_${convertColToLetter(col_num - 1)}`)) 
        allowed_moves.push(`${row_num - 1}_${convertColToLetter(col_num - 1)}`);
    return allowed_moves;
};

const checkQueenMove = (piece) => {
    // get queen position
    // calculate allowed queen moves
    // queens can move any number of spaces in any direction, but cannot jump over other pieces.
    const [row, col] = piece.current_pos.split("_");
    const row_num = parseInt(row);
    const col_num = convertColToNum(col);

    const allowed_moves = [];
    checkRookMove(piece).forEach(move => allowed_moves.push(move));
    checkBishopMove(piece).forEach(move => allowed_moves.push(move));
    return allowed_moves;
};

// check if attempted move is legal

const checkMove = (cell_id, piece) => {
    let moveList = [];
    if (piece.type === "pawn") {
        moveList = checkPawnMove(piece);
        return moveList.includes(cell_id)
    } else if (piece.type === "rook") {
        moveList = checkRookMove(piece);
        return moveList.includes(cell_id)
    } else if (piece.type === "knight") {
        moveList = checkKnightMove(piece);

        return moveList.includes(cell_id)
    } else if (piece.type === "bishop") {
        moveList = checkBishopMove(piece);
        return moveList.includes(cell_id)
    } else if (piece.type === "king") {
        moveList = checkKingMove(piece);
        return moveList.includes(cell_id)
    } else if (piece.type === "queen") {
        moveList = checkQueenMove(piece);
        return moveList.includes(cell_id)
    } else {
        console.log("Invalid piece type.");
    };
};

const change_player = () => {
    if (current_player === "w") {
        current_player = "b"
    } else {
        current_player = "w"
    }
};

// create timer for blitz chess

const blitz_timer = (time) => {
    let timer = time;
    const timer_interval = setInterval(() => {
        timer--;
        if (timer === 0) {
            clearInterval(timer_interval);
        }
    }, 1000);
};

// event listener for choosing game mode (blitz or classic) depending on which button they click

document.addEventListener("DOMContentLoaded", () => {
    const blitz_button = document.getElementById("blitz_mode");
    const classic_button = document.getElementById("classic_mode");
    blitz_button.addEventListener("click", () => {
        document.getElementById("blitz").style.display = "block";
        document.getElementById("classic").style.display = "none";
    });
    classic_button.addEventListener("click", () => {
        document.getElementById("classic").style.display = "block";
        document.getElementById("blitz").style.display = "none";
    });
});

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