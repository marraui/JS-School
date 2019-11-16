# TagDisplay #

Component for displaying all tags from an intervals and to add and remove them.

## Props ##

* interval ({
    id: number,
    start: number,
    end: number,
    color: string,
    tag: [],
}): Interval to add the tags to.

* updateInterval (interval): Function callback called when the interval is updated.