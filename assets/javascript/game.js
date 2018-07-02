var opponentsToBeat;
var player;
var opponent;

function restart() {
    $("#opponentWrap").hide();
    $("#battleArena").hide();

    $("#playerMsg").text("Choose your champion!");

    $(".darthVader").data("stats", { name: "Darth Vader", health: 100, attack: 3, attackPoints: 0, counter: 6, defeated: false, finishingMove: "Darth Vader lobs off [OPPONENT-POSSESSION] hand and proclaims to be [PRONOUN-POSSESSION] FATHER" });
    $(".millenniumFalcon").data("stats", { name: "Millennium Falcon", health: 125, attack: 6, attackPoints: 0, counter: 9, defeated: false, finishingMove: "Millennium Falcon cleans [OPPONENT-POSSESSION] clock in less than 12 parsecs" });
    $(".maxRebo").data("stats", { name: "Max Rebo", health: 150, attack: 9, attackPoints: 0, counter: 12, defeated: false, finishingMove: "Max Rebo uses jazz to enchant Obi Wan into slicing off [OPPONENT-POSSESSION] arm" });
    $(".jarJar").data("stats", { name: "Jar Jar Binks", health: 200, attack: 15, attackPoints: 0, counter: 18, defeated: false, finishingMove: "Jar Jar Binks trips into [OPPONENT], knocking [PRONOUN] down a shaft inside the Death Star" });

    //$(".darthVader").data("stats").health = 69;

    renderHealth("darthVader");
    renderHealth("millenniumFalcon");
    renderHealth("maxRebo");
    renderHealth("jarJar");

    opponentsToBeat = $(".players").length - 1;

    $(".players").on("click", function () {
        player = $(this);
        playerClick(player);
    });
}

function renderHealth(character) {
    $("." + character + " .health").text("♥ " + $("." + character).data("stats").health);
}

function playerClick(player) {
    $("#playerMsg").text("PLAYER ONE:");
    player.css("border-color", "#0506ec");
    $(".players").each(function () {
        if ($(this).attr("name") !== player.attr("name")) {
            $(this).hide();
        }
    });

    showOpponents(player);

    $(".players").off('click');

    $(".opponents").on("click", function () {
        opponent = $(this);
        opponentClick(opponent);
    });
}

function showOpponents(player) {
    $("#opponentWrap").show();
    $("#opponentMsg").text("Now choose your opponent!");
    $(".opponents").each(function () {
        if ($(this).attr("name") === player.attr("name") || $(this).data("stats").defeated) {
            $(this).hide();
        }
    });
}

function opponentClick(opponent) {
    $("#opponentMsg").text("CPU:");
    opponent.css("border-color", "#f02c27");
    $(".opponents").each(function () {
        if ($(this).attr("name") !== opponent.attr("name")) {
            $(this).hide();
        }
    });
    $(".opponents").off('click');
    $("#battleArena").show();
}



$(document).ready(restart());