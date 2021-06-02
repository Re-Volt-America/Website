$(document).ready(function() {
    $("#input").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".car-card").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
