## Switch Media Coding Task

#### Overview

-------
#### Approach
-----
##### JSON5

The biggest stumbling block for the whole task was dealing with the json data.  The keys not being in a string was a big issue in trying to utilise the data.  I ended up finding the JSON5 library which allowed me to use key without strings, though it couldn't deal with the internal double quotes in the value and I ended up editing the data manually so that I could move on.

##### jQuery

I decided to use jQuery as it is the the library I am most familiar with. I took the appoach to add a  template so I utilised the jQuery LoadTemplate Library.


##### Slick Slider

Knowing that I had to implement a slider function, I chose the slick library stright away.  I have used it extensively and I knew it not only had responsive functionality but also filtering capabilities.

##### Bootstrap

I chose to utilise the most current verson of Bootstrap - Bootstap 4 alpha to help with responsive design.  This allowed me to use some new classes such as col and justify-center.

##### Gulp

I was able to implement gulp into the app which allowed me to utilise the the css preprocessor scss.

#### Improvements
-----

I think the app functionality is completed as required.  Improvements would be in regards to minification of js and css for production.  This could be done as a gulp task.
I would also improve the responiveness of the slider and different breakpoints.
