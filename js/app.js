"use strict"

function Board (m,n){
    let board = [];
    for(let i = 0; i < m; i++){
        board[i] = [];
        for(let j = 0; j < n; j++){
            board[i][j] = new Cell;
        }
    }
	this.board = board;
}

Board.prototype.evolve = function evolve(){
    let newBoard = this.board.map(function(element, indexI, board){
        let temp = element.map(function(element, indexJ, elem){
        let sum = Board.prototype.getAliveNeighbors([indexI, indexJ], this.board);
        // for(let i = indexI-1; i <= indexI+1; i++){
        //     for(let j = indexJ-1; j <= indexJ+1; j++){
        //         if(i < 0 || i === board.length ||
        //            j < 0 || j === elem.length ||
        //           (i === indexI && j === indexJ)){
        //             continue;
        //         }
        //         if(board[i][j].isAlive){
        //             sum++;
        //         }
        //     }
        // }
        if(element.isAlive === 1){
            if(sum === 2 || sum === 3){
                return element;
            } else {
                element = new Cell(0);
                return element;
            }
        } else if(sum === 3){
            element = new Cell(1);
            return element;
        } else {
            return element;
        }
        });
        return temp;
	});
	this.board = newBoard;
	return this;
};

Board.prototype.get = function get(){
    let boardCopy = this.board.map(function (element){
        let elementCopy = element.map(function (element){
            return element.isAlive;
        });
        return elementCopy;
    });
    return boardCopy;
};

Board.prototype.getAliveNeighbors = function getAliveNeighbors(coords, board) {
    let neighborsCords = [
        [coords[0] - 1, coords[1] - 1],
        [coords[0] - 1, coords[1]],
        [coords[0] - 1, coords[1] + 1],
        [coords[0], coords[1] - 1],
        [coords[0], coords[1] + 1],
        [coords[0] + 1, coords[1] - 1],
        [coords[0] + 1, coords[1]],
        [coords[0] + 1, coords[1] + 1],
    ];
    let aliveNighbors = 0;
    neighborsCords.forEach((coord) => {
        let row = board[coord[0]];
        let cell;
        if (row) {
            cell = row[coord[1]];
        }
        if (cell) {
            aliveNighbors += cell.isAlive;
        }
    });
    return aliveNighbors;
}

function Cell (cell){
	this.isAlive = cell === 0 || cell === 1 ? cell : Math.round(Math.random());
}

$(".table-container").load("https://migueld1324.github.io/thegameoflife/html/table.html", function(response, status){
    $("table").load("https://migueld1324.github.io/thegameoflife/html/row.html", function (response, status){
        for (let i = 0; i < 99; i++) {
            $(this).append(response);
        }
        $("tr").load("https://migueld1324.github.io/thegameoflife/html/cell.html", function (response, status){
            for (let i = 0; i < 99; i++) {
                $(this).append(response);
            }
        });
    });
});

(function btnClick(){
    let rows = $("tr");
    let cells = $("td");
    let newBoard;
    let boardForPrint;
    let stopped = false;
    let btnCreate = $(".btn-create");
    let btnEvolve = $(".btn-evolve");
    let btnPlay = $(".btn-play");
    let btnStop = $(".btn-stop");

    $(btnEvolve).attr("disabled", true).addClass("btn-disabled");
    $(btnPlay).attr("disabled", true).addClass("btn-disabled");
    $(btnStop).attr("disabled", true).addClass("btn-disabled");

    $(".btn-container").on("click", ".btn-create", function (ev){
        $(btnEvolve).attr("disabled", false).removeClass("btn-disabled");
        $(btnPlay).attr("disabled", false).removeClass("btn-disabled");

        rows = $("tr");
        cells = $("td");

        $(cells).css("backgroundColor", "orange");

        newBoard = new Board(100,100);
        boardForPrint = newBoard.get();

        for(let i = 0; i < rows.length; i++){
            for(let j = 0; j < rows.length; j++){
                if(boardForPrint[i][j] === 0){
                    if($(cells[(i*100) + j]).css("backgroundColor") === "rgb(255, 165, 0)"){
                        $(cells[(i*100) + j]).css("backgroundColor", "black");
                    }
                } else {
                    if($(cells[(i*100) + j]).css("backgroundColor") === "rgb(0, 0, 0)"){
                        $(cells[(i*100) + j]).css("backgroundColor", "orange");
                    }
                }
            }
        }

    });

    $(".btn-container").on("click", ".btn-evolve", function (ev){

        rows = $("tr");
        cells = $("td");

        boardForPrint = newBoard.evolve().get();

        for(let i = 0; i < rows.length; i++){
            for(let j = 0; j < rows.length; j++){
                if(boardForPrint[i][j] === 0){
                    if($(cells[(i*100) + j]).css("backgroundColor") === "rgb(255, 165, 0)"){
                        $(cells[(i*100) + j]).css("backgroundColor", "black");
                        console.log($(cells[(i*100) + j]).css("backgroundColor"));
                    }
                } else {
                    if($(cells[(i*100) + j]).css("backgroundColor") === "rgb(0, 0, 0)"){
                        $(cells[(i*100) + j]).css("backgroundColor", "orange");
                        console.log($(cells[(i*100) + j]).css("backgroundColor"));
                    }
                }
            }
        }

    });

    $(".btn-container").on("click", ".btn-play", function (ev){
        $(btnCreate).attr("disabled", true).addClass("btn-disabled");
        $(btnEvolve).attr("disabled", true).addClass("btn-disabled");
        $(btnPlay).attr("disabled", true).addClass("btn-disabled");
        $(btnStop).attr("disabled", false).removeClass("btn-disabled");

        rows = $("tr");
        cells = $("td");

        function played() {
            if(stopped){
                stopped = false;
                return;
            }
            setTimeout(function () {
                boardForPrint = newBoard.evolve().get();
                for(let i = 0; i < rows.length; i++){
                    for(let j = 0; j < rows.length; j++){
                        if(boardForPrint[i][j] === 0){
                            if($(cells[(i*100) + j]).css("backgroundColor") === "rgb(255, 165, 0)"){
                                $(cells[(i*100) + j]).css("backgroundColor", "black");
                            }
                        } else {
                            if($(cells[(i*100) + j]).css("backgroundColor") === "rgb(0, 0, 0)"){
                                $(cells[(i*100) + j]).css("backgroundColor", "orange");
                            }
                        }
                    }
                }
                played();
            }, 10);
        }
        played();
    });

    $(".btn-container").on("click", ".btn-stop", function (ev){
        $(btnCreate).attr("disabled", false).removeClass("btn-disabled");
        $(btnEvolve).attr("disabled", false).removeClass("btn-disabled");
        $(btnPlay).attr("disabled", false).removeClass("btn-disabled");
        $(btnStop).attr("disabled", true).addClass("btn-disabled");
        stopped = true;
    });
})()
