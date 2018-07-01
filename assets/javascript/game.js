function restart() {
    $("#opponentWrap").hide();

    $(".darthVader").data("stats", { name: "Darth Vader", health: 100, attack: 3, counter: 6 });
    $(".millenniumFalcon").data("stats", { name: "Millennium Falcon", health: 125, attack: 6, counter: 9 });
    $(".maxRebo").data("stats", { name: "Max Rebo", health: 150, attack: 9, counter: 12 });
    $(".jarJar").data("stats", { name: "Jar Jar Binks", health: 200, attack: 15, counter: 18 });

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

    $(".players").each(function (i) {
        if ($(this).attr("name") !== that.attr("name")) {
            $(this).hide();
        }
    });

    $("#opponentWrap").show();
});

$(document).ready(restart());