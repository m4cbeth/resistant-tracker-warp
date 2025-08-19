# Things to ask


- move into day view when click day:
    day view "RESISTANCE" up top.
    start timer: running
    end timer:
    "did you say on task the whole time?":
        bar with slider, slider assumes you did so is at 100% saying 27 mintues or whatever
        but user can slide it back to any time, including zero,
        add time to "acting the beat" metric. default 0. display below resistance.
    "did you beat it?"
    if no:
        "that's ok, plently light before bed"
    if yes:
        "RESISTANCE" destroys and record is made for that day.




# completed / asked
some modifications:
date number inside checkboxes: behind the check/x, font-black and size jumbo almost filling the box, faint gray.

no shading of alternating months; rather use that shading for weekends, sunday's and saturdays being the slightly lighter columns (I've changed week to start on sunday; let's keep that)

the state of check mark will now be actually trenary. True, false or null. All future dates are null; no checkmark or X.

Move "Jan" and other month marker to sit closer on top of the first row that contains a "Jan". The negative space should be beteen the top of "jan" and the bottom of the previous month. The font should be "black" or as bold as possible, and slightly larger. It's left end should be in line of the left end of the Sunday column.

color: if date == false, it has red X, the background goes full black,
the x is red. If the value for a date is "true" (if there's a record in the db... (like the display assumes a past date is x if no data, future is null no matter what and green check if db record with that date)) then the background becomes tailwind bg-green-950 and the check text-green-500 or the equivilant colors


