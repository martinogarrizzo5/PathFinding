/// Breadth First Search ////////
/// search on <td> with id="x+1, y" || "x-1, y" || "x, y-1" || "x, y+1" //////////
/// split in x and y coordinates each id ///////////////
/// const loc = $("#1-1").attr("id").split("-");

///// TODO: Maybe use a set //////////////////////
const shifted = [];

$("#Play").click(() => main());



function main(){
    const startPos = findStartPoint();
    let pathQueue = [startPos];
    let i = 0;
    while(!$(".end").hasClass("explored")){
        pathQueue = pathQueue.concat(findNeighbors(pathQueue[i][0], pathQueue[i][1])) 
        i += 1;  
    }
    console.log(pathQueue); 
}


function findStartPoint(){
    $("*").removeClass("explored");
    return $(".start").attr("id").split("-");
}

function findEndPoint(){
    return $(".end").attr("id").split("-");
}

function findWalls(){
    return $(".wall")
        .map(function () {
            return this.id;
        })
        .get();
}


// find  IDs equals ot  "x+1, y" and "x-1, y" and "x, y-1" and "x, y+1" //////////
function findNeighbors(x, y, walls=findWalls()){
    const neighbors = [];
    x = Number(x);
    y = Number(y);
    const coord = x + "-" + y
    
    if($(`#${x + 1}-${y}`).length === 1 && !$(`#${x + 1}-${y}`).hasClass("explored") && !walls.includes(coord)){
        neighbors.push([x + 1, y]);
        $(`#${x + 1}-${y}`).addClass([x + "_" + y, "explored"]);

    }
    if($(`#${x - 1}-${y}`).length === 1 && !$(`#${x - 1}-${y}`).hasClass("explored") && !walls.includes(coord)){
        neighbors.push([x - 1, y]);
        $(`#${x - 1}-${y}`).addClass([x + "_" + y, "explored"]);
    }
    if($(`#${x}-${y + 1}`).length === 1 && !$(`#${x}-${y + 1}`).hasClass("explored") && !walls.includes(coord)){
        neighbors.push([x, y + 1]);
        $(`#${x}-${y + 1}`).addClass([x + "_" + y, "explored"]);
    }
    if($(`#${x}-${y - 1}`).length === 1 && !$(`#${x}-${y - 1}`).hasClass("explored") && !walls.includes(coord)){
        neighbors.push([x, y - 1]);
        $(`#${x}-${y - 1}`).addClass([x + "_" + y, "explored"]);
    }

    return neighbors;
}