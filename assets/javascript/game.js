var opponentsToBeat;
var player;
var opponent;

function restart() {
    $("#opponentWrap").hide();
    $("#attack").hide();
    $("#results").empty();
    $("#continue").hide();

    $("#playerMsg").text("Choose your champion!");

    //weakest character.  only one path to victory
    $(".darthVader").data("stats", { name: "Darth Vader", health: 80, attack: 4, attackPoints: 0, counter: 8, defeated: false, finishingMove: "Darth Vader lobs off OPPONENT-POSSESSION hand and proclaims to be PRONOUN-POSSESSION father" });
    
    //three narrow paths to victory
    $(".millenniumFalcon").data("stats", { name: "Millennium Falcon", health: 90, attack: 4, attackPoints: 0, counter: 9, defeated: false, finishingMove: "Millennium Falcon cleans OPPONENT-POSSESSION clock in less than 12 parsecs" });

    //low attack.  two paths to victory.
    $(".maxRebo").data("stats", { name: "Max Rebo", health: 140, attack: 1, attackPoints: 0, counter: 10, defeated: false, finishingMove: "Max Rebo uses jazz to enchant Obi Wan into slicing off OPPONENT-POSSESSION arm" });

    //low counter and attack.  three paths to victory.
    $(".jarJar").data("stats", { name: "Jar Jar Binks", health: 150, attack: 2, attackPoints: 0, counter: 4, defeated: false, finishingMove: "Jar Jar Binks trips into OPPONENT, knocking PRONOUN down a shaft inside the Death Star" });

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
    var playerName = player.data("stats").name;
    var opponentName = opponent.data("stats").name;
    var playerAttack = player.data("stats").attackPoints;
    var opponentHealth = damage(opponent, playerAttack);

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

    //declare after possible return, so they're not declared for nothing!
    var opponentAttack = opponent.data("stats").counter;
    var playerHealth = damage(player, opponentAttack);

    if (playerHealth === 0) {
        var finishingMove = finish(opponent, player);
        $("#results").append("<br>" + finishingMove + " for " + opponentAttack + " HP!");
        $("#attack").hide();
        return;
    }
    else{
        $("#results").append("<br>" + opponentName + " attacks " + playerName + " for " + opponentAttack + " HP!");
    }
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