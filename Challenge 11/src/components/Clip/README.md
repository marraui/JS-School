# Clip #

Component for displaying and editing clips

## Props ##

* interval ({
    id: number,
    start: number,
    end: number,
    color: string,
    tags: [],
}): Interval object show in the clip.

* updateInterval ((interval) => {}): Function callback called when the interval is updated.

* selectInterval ((interval) => {}): Function callback called when the interval is selected.

* removeInterval ((id) => {}): Function callback called when the interval is removed.
