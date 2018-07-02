function restart() {
    $("#opponentWrap").hide();

    $(".darthVader").data("stats", { name: "Darth Vader", health: 100, attack: 3, attackPoints: 0, counter: 6, finishingMove: "Darth Vader lobs off [OPPONENT-POSSESSION] hand and proclaims to be [PRONOUN-POSSESSION] FATHER" });
    $(".millenniumFalcon").data("stats", { name: "Millennium Falcon", health: 125, attack: 6, attackPoints: 0, counter: 9, finishingMove: "Millennium Falcon cleans [OPPONENT-POSSESSION] clock in less than 12 parsecs" });
    $(".maxRebo").data("stats", { name: "Max Rebo", health: 150, attack: 9, attackPoints: 0, counter: 12, finishingMove: "Max Rebo uses jazz to enchant Obi Wan into slicing off [OPPONENT-POSSESSION] arm" });
    $(".jarJar").data("stats", { name: "Jar Jar Binks", health: 200, attack: 15, attackPoints: 0, counter: 18, finishingMove: "Jar Jar Binks trips into [OPPONENT], knocking [PRONOUN] down a shaft inside the Death Star" });

    //$(".darthVader").data("stats").health = 69;

    renderHealth("darthVader");
    renderHealth("millenniumFalcon");
    renderHealth("maxRebo");
    renderHealth("jarJar");
}

function renderHealth(character) {
    $("." + character + " .health").text($("." + character).data("stats").health);
}

$(".players").on("click", function () {
    var that = $(this);

    that.css("border-color", "#0506ec");

    $(".players").each(function () {
        if ($(this).attr("name") !== that.attr("name")) {
            $(this).hide();
        }
    });

    $("#opponentWrap").show();
});

$(document).ready(restart());