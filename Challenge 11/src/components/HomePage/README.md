# HomePage #

Landing page for the application.

## Props ##

* intervals ({
    id: number,
    start: number,
    end: number,
    color: string,
    tags: [],
}[]): Array of intervals being displayed.

* searchValue (string): Search input made by the user.

* selectedInterval ({
    id: number,
    start: number,
    end: number,
    color: string,
    tags: [],
}): The interval that is currently selected for the video player.