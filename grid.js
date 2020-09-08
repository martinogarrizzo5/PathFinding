// handling colors activity
let buttons = {
    Wall : false,
    isWallPainting : false,
    Start : false,
    End : false,
    Delete : false,
    isDeleting : false,
    Play : false
}

// handling color selection with buttons
handleButtons();


// managing table creation
$("#createTable").click((event) => {
    event.preventDefault();
    const rows = $("#rows").val();
    const cols = $("#cols").val();
    deleteTable();
    createTable(rows, cols);
})

// creating default table to cover the infinite empty space on the screen!!
createTable($("#rows").attr("value"), $("#cols").attr("value"));

// handling user world creation and deletion
function manageGrid(event){
    if (buttons.Delete){
        $("table").mousedown(() => buttons.isDeleting = true);
        $("table").mouseup(() => buttons.isDeleting = false);
        if (buttons.isDeleting || event.type === "click"){
            $(event.target).removeClass("wall");
        }
    }
    else if (buttons.Start && event.type === "click"){
        $(event.target).removeClass();
        $("td").removeClass("start");
        $(event.target).addClass("start");
    }
    else if (buttons.End && event.type === "click"){
        $(event.target).removeClass();
        $("td").removeClass("end");
        $(event.target).addClass("end");
    }
    else if (buttons.Wall){
        $("table").mousedown(() => buttons.isWallPainting = true);
        $("table").mouseup(() => buttons.isWallPainting = false);
        if (buttons.isWallPainting || event.type === "click"){
            if(!$(event.target).hasClass("end") && !$(event.target).hasClass("start")){
                $(event.target).addClass("wall");
            }
        }
    }
}


function handleButtons(){
    
    $(".util-button").click((event) => {
        $(".util-button").removeClass("btn-light");
        $(event.target).addClass("btn-light");
        const button = event.target.id;
        for(key in buttons){
            buttons[key] = false
        }
        buttons[button] = true;

    })
}



// handle user input (cols, rows) to create new table
function createTable(cols, rows){
    for (var i = 0; i < cols; i++){
        $("#grid").append("<tr></tr>")
        for(var j = 0; j < rows; j++){
            $("tr").last().append("<td id=" + j + "-" +  i + "></td>");
            $("#" + j + "-" + i).last().hover((event) => manageGrid(event));
            $("#" + j + "-" + i).last().click((event) => manageGrid(event));
        }
    }
    const randStartX = Math.floor(Math.random() * rows);
    const randStartY = Math.floor(Math.random() * cols);

    const randEndX = Math.floor(Math.random() * rows);
    const randEndY = Math.floor(Math.random() * cols);

    console.log(cols + " " + rows)
    console.log(randStartX + " " + randStartY);
    console.log(randEndX + " " + randEndY);
    if (randEndX !== randStartX || randStartY !== randEndY){
        $("#" + randStartX + "-" + randStartY).addClass("start");
        $("#" + randEndX + "-" + randEndY).addClass("end");
    }
    else{
        $("#0-0").addClass("start");
        $("#19-19").addClass("end");
    }

}

// handle destruction of table
function deleteTable(){
    $("#grid").empty();
}





