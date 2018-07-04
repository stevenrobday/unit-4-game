var opponentsToBeat;
var player;
var opponent;

function restart() {
    $("#opponentWrap").hide();
    $("#attack").hide();
    $("#results").empty();
    $("#continue").hide();

    $("#playerMsg").text("Choose your champion!");

    $(".darthVader").data("stats", { name: "Darth Vader", health: 100, attack: 3, attackPoints: 0, counter: 6, defeated: false, finishingMove: "Darth Vader lobs off OPPONENT-POSSESSION hand and proclaims to be PRONOUN-POSSESSION father" });
    $(".millenniumFalcon").data("stats", { name: "Millennium Falcon", health: 125, attack: 6, attackPoints: 0, counter: 9, defeated: false, finishingMove: "Millennium Falcon cleans OPPONENT-POSSESSION clock in less than 12 parsecs" });
    $(".maxRebo").data("stats", { name: "Max Rebo", health: 150, attack: 9, attackPoints: 0, counter: 12, defeated: false, finishingMove: "Max Rebo uses jazz to enchant Obi Wan into slicing off OPPONENT-POSSESSION arm" });
    $(".jarJar").data("stats", { name: "Jar Jar Binks", health: 200, attack: 15, attackPoints: 0, counter: 18, defeated: false, finishingMove: "Jar Jar Binks trips into OPPONENT, knocking PRONOUN down a shaft inside the Death Star" });

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

function renderHealth(fighter) {
    $("." + fighter + " .health").text("♥ " + $("." + fighter).data("stats").health);
}

function playerClick(player) {
    $("#playerMsg").text("PLAYER ONE:");
    player.css("border-color", "#0506ec");
    $(".players").each(function () {
        if ($(this).data("stats").name !== player.data("stats").name) {
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
    $("#opponentMsg").text("Choose your opponent!");
    $(".opponents").each(function () {
        $(this).show();
        if ($(this).data("stats").name === player.data("stats").name || $(this).data("stats").defeated) {
            $(this).hide();
        }
    });
}

function opponentClick(opponent) {
    $("#opponentMsg").text("CPU:");
    opponent.css("border-color", "#f02c27");
    $(".opponents").each(function () {
        if ($(this).data("stats").name !== opponent.data("stats").name) {
            $(this).hide();
        }
    });
    $(".opponents").off('click');
    $("#attack").show();
}

function fight() {
    player.data("stats").attackPoints += player.data("stats").attack;
    var playerAttack = player.data("stats").attackPoints;
    var opponentHealth = damage(opponent, playerAttack);
    var playerName = player.data("stats").name;
    var opponentName = opponent.data("stats").name;

    if (opponentHealth === 0) {
        var finishingMove = finish(player, opponent);
        $("#results").text(finishingMove + " for " + playerAttack + " HP!");
        $("#attack").hide();
        opponent.data("stats").defeated = true;
        opponentsToBeat--;
        $("#continue").show();
        return;
    }
    else{
        $("#results").text(playerName + " attacks " + opponentName + " for " + playerAttack + " HP!");
    }

    var opponentAttack = opponent.data("stats").attack;
    var playerHealth = damage(player, opponentAttack);
}

function damage(fighter, points) {
    fighter.data("stats").health -= points;
    var health = fighter.data("stats").health;
    if (health < 0) {
        health = 0;
        fighter.data("stats").health = 0;
    }
    renderHealth(fighter.attr("name"));
    return health;
}

function finish(finisher, finished) {
    var opponentName = finished.data("stats").name;
    var opponentPossession = opponentName + "'s";
    var pronoun;
    var pronounPossession;
    var finishingMove = finisher.data("stats").finishingMove;

    switch (opponentName) {
        case "Darth Vader":
        case "Max Rebo":
        case "Jar Jar Binks":
            pronoun = "him";
            pronounPossession = "his";
            break;
        case "Millennium Falcon":
            pronoun = "her";
            pronounPossession = "her";
            break;
    }

    finishingMove = finishingMove.replace(/OPPONENT-POSSESSION/g, opponentPossession);
    finishingMove = finishingMove.replace(/OPPONENT/g, opponentName);
    finishingMove = finishingMove.replace(/PRONOUN-POSSESSION/g, pronounPossession);
    finishingMove = finishingMove.replace(/PRONOUN/g, pronoun);

    return finishingMove;
}

$("#attack").on("click", fight);
$("#continue").on("click", function(){
    $(this).hide();
    $("#results").empty();

    showOpponents(player);

    $(".opponents").on("click", function () {
        opponent = $(this);
        opponentClick(opponent);
    });
});

$(document).ready(restart());