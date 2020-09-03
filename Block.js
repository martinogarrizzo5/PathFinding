class Block{
    constructor() {
        this.isExplored = false;
        this.exploredFrom = null;
    }

    get exploredFrom(){
        return this.exploredFrom;
    }

    set exploredFrom(coord){
        this.exploredFrom = coord;
    }
}