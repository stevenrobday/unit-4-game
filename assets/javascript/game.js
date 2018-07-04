//globals
var opponentsToBeat;
var player;
var opponent;

//(re)start function
function restart() {
    //hide or empty appropriate elements
    $("#opponentWrap").hide();
    $("#attack").hide();
    $("#results").empty();
    $("#continue").hide();
    $("#restart").hide();

    //necessary for restart only.  shows each player and resets css attribute
    $(".players").each(function () {
        $(this).show();
        $(this).css("border-color", "");
    });

    //same for opponents
    $(".opponents").each(function () {
        $(this).css("border-color", "");
    });

    //tell the end user what to do
    $("#playerMsg").html("<p>Choose your champion!</p>");


    //create or reset characters' data attributes

    //weakest character.  only one path to victory
    $(".darthVader").data("stats", { name: "Darth Vader", health: 80, attack: 4, attackPoints: 0, counter: 8, defeated: false, finishingMove: "Darth Vader lobs off OPPONENT-POSSESSION hand and proclaims to be PRONOUN-POSSESSION father" });

    //three narrow paths to victory
    $(".millenniumFalcon").data("stats", { name: "Millennium Falcon", health: 90, attack: 4, attackPoints: 0, counter: 9, defeated: false, finishingMove: "Millennium Falcon cleans OPPONENT-POSSESSION clock in less than 12 parsecs" });

    //low attack.  two paths to victory.
    $(".maxRebo").data("stats", { name: "Max Rebo", health: 140, attack: 1, attackPoints: 0, counter: 10, defeated: false, finishingMove: "Max Rebo uses jazz to enchant Obi Wan into slicing off OPPONENT-POSSESSION arm" });

    //low counter and attack.  three paths to victory.
    $(".jarJar").data("stats", { name: "Jar Jar Binks", health: 150, attack: 2, attackPoints: 0, counter: 4, defeated: false, finishingMove: "Jar Jar Binks trips into OPPONENT, knocking PRONOUN down a shaft inside the Death Star" });

    //render health field for all characters
    renderHealth("darthVader");
    renderHealth("millenniumFalcon");
    renderHealth("maxRebo");
    renderHealth("jarJar");

    //opponents left
    opponentsToBeat = $(".opponents").length - 1;

    //add this event listener every time restart is called
    //event listener gets removed later
    $(".players").on("click", function () {
        player = $(this);
        playerClick(player);
    });
}

//fills health div for fighter based on class name of element
function renderHealth(fighter) {
    $("." + fighter + " .health").html("<p>♥ " + $("." + fighter).data("stats").health + "</p>");
}

//runs when user selects their character
function playerClick(player) {
    //designate end user
    $("#playerMsg").html("<p>PLAYER ONE:</p>");
    
    //border selected character a shade of blue
    player.css("border-color", "#0506ec");

    //hide other characters
    $(".players").each(function () {
        if ($(this).data("stats").name !== player.data("stats").name) {
            $(this).hide();
        }
    });

    //now show available opponents to choose from
    showOpponents(player);

    //since the character was already selected, we don't want this function running again
    //remove listener
    $(".players").off('click');

    //add listener for user to choose opponent
    $(".opponents").on("click", function () {
        opponent = $(this);
        opponentClick(opponent);
    });
}

function showOpponents(player) {
    //pull the curtain
    $("#opponentWrap").show();

    //tell the user what to do, they like that
    $("#opponentMsg").html("<p>Choose your opponent!</p>");

    //loop through every each element in the opponents class
    $(".opponents").each(function () {
        //show if hidden
        $(this).show();

        //hide if either the character chose, or if they've been defeated
        if ($(this).data("stats").name === player.data("stats").name || $(this).data("stats").defeated) {
            $(this).hide();
        }
    });
}

//runs when user clicks opponent
function opponentClick(opponent) {
    $("#opponentMsg").html("<p>CPU:</p>");

    //border enemy Sith red
    opponent.css("border-color", "#f02c27");

    //hide other opponents
    $(".opponents").each(function () {
        if ($(this).data("stats").name !== opponent.data("stats").name) {
            $(this).hide();
        }
    });

    //remove this listener
    $(".opponents").off('click');

    //show the attack button
    $("#attack").show();
}

//runs when user clicks attack button
function fight() {
    //increase player attack points
    player.data("stats").attackPoints += player.data("stats").attack;

    //create vars for easier reading
    var playerName = player.data("stats").name;
    var opponentName = opponent.data("stats").name;
    var playerAttack = player.data("stats").attackPoints;

    //damage opponent and get how much life they have left
    var opponentHealth = damage(opponent, playerAttack);

    //win condition
    if (opponentHealth === 0) {
        //get player's finishing move
        var finishingMove = finish(player, opponent);
        $("#results").html("<p class='spacer'>" + finishingMove + " for " + playerAttack + " HP!</p>");

        //hide attack button
        $("#attack").hide();

        //mark opponent defeated
        opponent.data("stats").defeated = true;

        //lower tally of opponents left
        opponentsToBeat--;

        //beat the game condition
        if(opponentsToBeat === 0){
            $("#results").append("<p class='spacer'>You saved the galaxy!  Do that again?</p>");
            $("#restart").show();
        }
        //otherwise, the user  must continue
        else{
            //show continue button
            $("#continue").show();
        }
        //we don't want to run the rest of this function at this point
        return;
    }
    //condition if opponent survives yet
    else{
        //show that the player attacked the opponent
        $("#results").html("<p class='spacer'>" + playerName + " attacks " + opponentName + " for " + playerAttack + " HP!</p>");
    }

    //declare after possible return, so they're not declared for nothing!
    var opponentAttack = opponent.data("stats").counter;

    //damage player and get amount of life left
    var playerHealth = damage(player, opponentAttack);

    //lose condition
    if (playerHealth === 0) {
        //get opponent's finishing move
        var finishingMove = finish(opponent, player);

        //show user finishing move and tell them it's GAME OVER
        $("#results").append("<p class='spacer'>" + finishingMove + " for " + opponentAttack + " HP!</p><p class='spacer'>GAME OVER</p>");

        //hide attack button
        $("#attack").hide();

        //show restart button
        $("#restart").show();
        return;
    }
    //if player survives yet
    else{
        //show user opponent's attack
        $("#results").append("<p class='spacer'>" + opponentName + " attacks " + playerName + " for " + opponentAttack + " HP!</p>");
    }
}

//function used to cause damage and return designated fighter's health
function damage(fighter, points) {
    //lower fighter's health
    fighter.data("stats").health -= points;

    //get this value for easier reading
    var health = fighter.data("stats").health;

    //set health to zero if subzero
    if (health < 0) {
        health = 0;
        fighter.data("stats").health = 0;
    }

    //render new health
    renderHealth(fighter.attr("name"));

    //return HP
    return health;
}

//finishing move function.  the finisher finishes the finished.
function finish(finisher, finished) {
    //these vars will fill in missing data from finishing move
    var opponentName = finished.data("stats").name;
    var opponentPossession = opponentName + "'s";
    var pronoun;
    var pronounPossession;

    //get the finishing move
    var finishingMove = finisher.data("stats").finishingMove;

    //switch the girls and boys
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

    //the finishing move must display the correct name, and add possession if necessary
    finishingMove = finishingMove.replace(/OPPONENT-POSSESSION/g, opponentPossession);
    finishingMove = finishingMove.replace(/OPPONENT/g, opponentName);

    //add in the gender-specific pronouns
    finishingMove = finishingMove.replace(/PRONOUN-POSSESSION/g, pronounPossession);
    finishingMove = finishingMove.replace(/PRONOUN/g, pronoun);

    //return finishingMove string
    return finishingMove;
}

//run fight function when user clicks on attack
$("#attack").on("click", fight);

//runs when user clicks on continue
$("#continue").on("click", function(){
    //hide this
    $(this).hide();

    //empty the battle results field
    $("#results").empty();

    //show remaining opponents
    showOpponents(player);

    //add listener for user to pick their opponent
    $(".opponents").on("click", function () {
        opponent = $(this);
        opponentClick(opponent);
    });
});

//run restart function when user clicks restart
$("#restart").on("click", restart);
//when document loads, as well
$(document).ready(restart);