$(function(){
    var size = 4,
    container = $("#puzzle figure"),
    img = container.find("img"),
    path = img.attr("src"),
    width = img.width() / size,
    height = img.height() / size,
    empty = 0,
    moves = 0,
    started = false;

    container.css({
        position: "relative",
        width: width * size,
        height: height * size
    });

    // Create 15 files leaving position 0 empty
    for (var i = 1; i < size * size; i++){
        $("<div/>").attr("data-id", i).css({
            position: "absolute",
            width: width,
            height: height,
            top: Math.floor(i / size) * height,
            left: (i % size) * width,
            backgroundImage: "url(" + path + ")",
            backgroundSize: (width * size) + "px " + (height * size) + "px",
            backgroundPosition: "-" + (i % size * width) + "px -" + (Math.floor(i / size) * height) + "px",
            cursor: "pointer"   
        }).appendTo(container);
    }

    img.remove();

    // Find tile at particular board position
    function tileAt(pos){
        return container.children("div").filter(function(){
            return $(this).data("pos") === pos;
        });
    }

    // Assign starting positions
    container.children("div").each(function(){
        $(this).data("pos", Number($(this).attr("data-id")));
    });

    // Check whether two positions are adjacent
    function adjacent(a, b){
        return (
            Math.abs(Math.floor(a / size) - Math.floor(b / size)) + Math.abs(a % size - b % size)
        ) === 1;
    }

    // Move a tile into the empty space
    function move(tile, animate = true){
        var pos = tile.data("pos");

        if(!adjacent(pos, empty)) return false;

        var oldEmpty = empty;

        tile.data("pos", oldEmpty);

        var css = {
            top: Math.floor(oldEmpty / size) * height,
            left: (oldEmpty % size) * width
        };

        if (animate) {
            tile.stop(true, true).animate(css, 150);
        } else {
            tile.css(css);
        }

        empty = pos;
        return true;
    }

    // Click a tile to move it
    container.on("click", "div", function(){
        if (!started) return;

        if (move($(this))){
            moves++;

            // Check if sovled
            var solved = container.children("div").toArray().every(function(el){
                return $(el).data("pos") === Number($(el).attr("data-id"));
            });

            if (solved) {
                started = false;

                setTimeout(function(){
                    alert("Puzzle solved in " + moves + " moves!");
                }, 200);
            }
        }
    });

    // Shuffle using valid moves
    $("#start").on("click", function(){
        container.children("div").stop(true, true);

        // Reset to solved positions
        container.children("div").each(function(){
            var id = Number($(this).attr("data-id"));

            $(this).data("pos", id).css({
                top: Math.floor(id / size) * height,
                left: (id % size) * width
            });
        });

        empty = 0;
        moves = 0;
        started = false;

        var previous = -1;

        for (var i = 0; i < 200; i++){
            var options = container.children("div").filter(function(){
                var pos = $(this).data("pos");
                return adjacent(pos, empty) && pos !== previous;
            });

            var tile = options.eq(Math.floor(Math.random() * options.length));
            previous = empty;
            move(tile, false);
        }

        started = true;
    });
});