# VideoPlayer #

Component in charge of reproducing and editing videos.

## Props ##

* interval ({
    id: number,
    start: number,
    end: number,
    color: string,
    tag: [],
}): Clip to reproduce.

* intervals ({
    id: number,
    start: number,
    end: number,
    color: string,
    tag: [],
}[]): All clips the can be selected.

* addInterval ((interval) => {}): Function callback called when a new interval is added.

* selectInterval ((interval) => {}): Function callback called when an interval is selected.

* editable (bool): Boolean prop indicating wether editing features are enabled.

* autoPlay (bool): Boolean prop indication wether auto-play is enabled.