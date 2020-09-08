/// Breadth First Search ////////
/// search on <td> with id="x+1, y" || "x-1, y" || "x, y-1" || "x, y+1" //////////
/// split in x and y coordinates each id ///////////////
/// const loc = $("#1-1").attr("id").split("-");

let actualExplored = 0;
let unexpectedEnd = false;

$("#Play").click(() => main());



function main(){
    unexpectedEnd = false;
    let pathQueue = [findStartPoint()];
    let i = 0;
    while(!$(".end").hasClass("explored")){
        try{ 
            pathQueue = pathQueue.concat(findNeighbors(pathQueue[i][0], pathQueue[i][1])) 
            i += 1;  
        }
        catch (err){
            console.log("unexpected end of algorithm")
            unexpectedEnd = true;
            break;
        }
    }

    /// animation to see the path creation
    var explorationUI = setInterval(() => {
        exploredUI(pathQueue, actualExplored); 
        actualExplored += 1;
        if(actualExplored >= pathQueue.length){
            if (!unexpectedEnd){
                findPath();
            }
            else if (unexpectedEnd){
                $("*").removeClass(["explored", "path", "green"]);
            }
            reloadPath();
            clearInterval(explorationUI)
        }
    }, 5)

}


function exploredUI(list, actual){
    $(`#${list[actual][0]}-${list[actual][1]}`).addClass("green");
}


function findStartPoint(){
    actualExplored = 0;
    $("*").removeClass(["explored", "path", "green"]);
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
    if (walls.includes(coord)){return [];}
    
    if($(`#${x + 1}-${y}`).length === 1 && !$(`#${x + 1}-${y}`).hasClass("explored") ){
        neighbors.push([x + 1, y]);
        $(`#${x + 1}-${y}`).addClass([x + "-" + y, "explored"]);

    }
    if($(`#${x - 1}-${y}`).length === 1 && !$(`#${x - 1}-${y}`).hasClass("explored") ){
        neighbors.push([x - 1, y]);
        $(`#${x - 1}-${y}`).addClass([x + "-" + y, "explored"]);
    }
    if($(`#${x}-${y + 1}`).length === 1 && !$(`#${x}-${y + 1}`).hasClass("explored") ){
        neighbors.push([x, y + 1]);
        $(`#${x}-${y + 1}`).addClass([x + "-" + y, "explored"]);
    }
    if($(`#${x}-${y - 1}`).length === 1 && !$(`#${x}-${y - 1}`).hasClass("explored") ){
        neighbors.push([x, y - 1]);
        $(`#${x}-${y - 1}`).addClass([x + "-" + y, "explored"]);
    }

    return neighbors;
}

////////// create the shortest path to reach the end
function findPath(){
    try{
        let lastExplored = $(".end").attr("class").split(" ")[1];
        $("#" + lastExplored).addClass("path");
        while(!$("#" + lastExplored).hasClass("start")){
            lastExplored = $("#" + lastExplored).attr("class").split(" ")[0];
            $("#" + lastExplored).addClass("path");
        }
    }
    catch(e){
        unexpectedEnd = true;
        $("*").removeClass(["explored", "path", "green"]);
    }
}


/////// delete path exploredFrom coordinates from cells classes
function reloadPath(){
    const pattern = /\d-+\d/
    $("td").map(function() {
        const classes = this.className.split(" ")
        if ( pattern.test(classes[0]) ){
            $(this).removeClass(classes[0])
        }
        else if ( pattern.test(classes[1]) ){
            $(this).removeClass(classes[1])
       }
  })
}