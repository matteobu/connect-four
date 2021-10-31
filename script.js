(function () {
    /// PRIMA DI GIOCARE

    setTimeout(popUp, 250);

    function popUp() {
        $("#popUpOpacity").removeClass("hidden");
    }

    $("#btn").on("click", function () {
        console.log("closing button just got clicked");
        $(".colorPlayerTwo").removeClass("hidden");
        $(".textPlayerTwo").removeClass("hidden");
        $(".colorPlayerOne").removeClass("hidden");
        $(".textPlayerOne").removeClass("hidden");
        $("#cerchio").removeClass("hidden");

        $("#popUpOpacity").fadeOut(1000);
    });

    // PRIMA DI GIOCARE
    var currentPlayer = "player1";

    console.log("current player prima di click", currentPlayer);

    var coordX = 0;
    var coordY = 0;

    $(".board").on("mousemove", function (event) {
        var cerchio = document.getElementById("cerchio");
        coordX = event.clientX - 45;
        coordY = event.clientY - 45;

        cerchio.style.left = coordX + "px";
        cerchio.style.top = coordY + "px";
    });
    $(".board").on("mouseleave", function () {
        var cerchio = document.getElementById("cerchio");
        cerchio.style.left = "32%";
        cerchio.style.top = "2%";
    });

    $(".column").on("click", function (e) {
        var diags = [
            [0, 7, 14, 21],
            [1, 8, 15, 22],
            [2, 9, 16, 23],
            [3, 8, 13, 18],
            [4, 9, 14, 19],
            [5, 10, 15, 20],
            [6, 13, 20, 27],
            [7, 14, 21, 28],
            [8, 15, 22, 29],
            [9, 14, 19, 24],
            [10, 15, 20, 25],
            [11, 16, 21, 26],
            [12, 19, 26, 33],
            [13, 20, 27, 34],
            [14, 21, 28, 35],
            [15, 20, 25, 30],
            [16, 21, 26, 31],
            [17, 22, 27, 32],
            [18, 25, 32, 39],
            [19, 26, 33, 40],
            [20, 27, 34, 41],
            [21, 26, 31, 36],
            [22, 27, 32, 37],
            [23, 28, 33, 38],
        ];

        var col = $(e.currentTarget);

        var slotsInCol = col.children();

        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);

                break;
            }
        }
        if (i === -1) {
            return;
        }

        var slotsInRow = $(".row-" + i);

        if (checkForVictory(slotsInCol)) {
            popVictory();

            console.log("YOU WON WITH A COLUMN! ");
        } else if (checkForVictory(slotsInRow)) {
            popVictory();

            console.log("YOU WON WITH A ROW!");
        } else if (checkForDiagonalVictory(diags)) {
            popVictory();

            console.log("YOU WON WITH A DIAGONAL");
        }

        console.log("current player prima di switch", currentPlayer); //LOGS PLAYER ONE

        switchPlayer();

        if (currentPlayer === "player2") {
            $("#popUpVictory").addClass("giocatoreUno");
            $("#popUpVictory").removeClass("giocatoreDue");
            $("#buttonVictory").addClass("giocatoreUno");
            $("#buttonVictory").removeClass("giocatoreDue");
            $("#cerchio").addClass("giocatoreDue");
            $(".colorPlayerTwo").removeClass("opacity");
            $(".textPlayerTwo").removeClass("opacity");
            $(".colorPlayerOne").addClass("opacity");
            $(".textPlayerOne").addClass("opacity");
        }
        if (currentPlayer === "player1") {
            $("#popUpVictory").removeClass("giocatoreUno");
            $("#popUpVictory").addClass("giocatoreDue");
            $("#buttonVictory").removeClass("giocatoreUno");
            $("#buttonVictory").addClass("giocatoreDue");
            $("#cerchio").removeClass("giocatoreDue");
            $(".colorPlayerTwo").addClass("opacity");
            $(".textPlayerTwo").addClass("opacity");
            $(".colorPlayerOne").removeClass("opacity");
            $(".textPlayerOne").removeClass("opacity");
        }
    });

    function popVictory() {
        $(".slot").toggle("explode").fadeOut(1000);
        $("#cerchio").addClass("hidden");
        $(".colorPlayerTwo").addClass("hidden");
        $(".textPlayerTwo").addClass("hidden");
        $(".colorPlayerOne").addClass("hidden");
        $(".textPlayerOne").addClass("hidden");
        $("#cerchio").addClass("hidden");
        $("<p> " + currentPlayer + "</p>").appendTo(".win");

        setTimeout(function () {
            $("#popUpVictory").removeClass("hidden");
        }, 800);
    }

    $("#btnVctr").on("click", function () {
        $(".board").removeClass();
        $("#popUpVictory").fadeOut(1000);
    });

    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    function checkForDiagonalVictory(diagsSlots) {
        var slot = $(".slot");
        var diagsCount = 0;

        for (var x = 0; x < diagsSlots.length; x++) {
            var diagsSlotsX = diagsSlots[x];

            for (var y = 0; y < diagsSlotsX.length; y++) {
                var diagsSlotsXY = diagsSlotsX[y];

                if (slot.eq(diagsSlotsXY).hasClass(currentPlayer)) {
                    diagsCount++;
                    if (diagsCount === 4) {
                        return true;
                    }
                } else {
                    diagsCount = 0;
                }
            }
        }
    }

    function checkForVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count === 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }
})();
