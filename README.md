#Prototyping Test

##TECHNICAL REQUIREMENTS

Use the following tech stack

1. Angular
2. LESS
3. Grunt to compile less and run JSLint
4. Node (npm) to manage dependencies
5. Karma, PhantomJS & Jasmine for sample unit tests
6. Grunt connect to launch the local web server

Create a branch with your name and issue a pull request for repository https://github.com/kwilding/prototype_test to submit your code

Use the included JSON file as your data for the swim lanes. It should be pulled in through an angular service that calls uses an ajax call and parses the json 

Write up to five karma unit tests that check to make sure that the correct number of swim lanes are on the page and the correct number of assets are on the page

Code must be lint-free (use included config)
I must be able to build the app with `npm install`  and `grunt` as the only two commands.

##DESIGN

Overview:

1. Include swim lanes so we can see how the page will display and
interact with multiple swim lanes
2. Include a maximum of 12 assets in each swim lane
3. Use swim lane titles: Dynamic

*Second screen Movies Grid is optional*

Swimlanes:

1. Would like to have a quick ease as user goes from one asset to the next.
2. To focus on the View All tile, user arrows left from "The Grey" and that
tile will slide to the right and take first position, would like to use
same easing style and this tile will increase by 10%, same as when
hovering on cover art
3. *OPTIONAL* Swimlanes will fold under the filter bar (screen 2)
4. When going from one swim plane to another we would like to have a quick
easing in and if possible maintain the focus state in the same area as the
previous swim lane - just want to minimize the focus state bumping around
- want fluid movement between swim lanes
5. On Hover - quick ease in on poster getting larger
6. *OPTIONAL* Once user goes over to the 6th cover art in the swim lane we would like
the content to start sliding user when user presses rightŠwant to have a
terminal end to the ficus state placement so it doesn't go off the page


Filter:

1. Allow user to focus on the filter and left/right arrow to slide with an
ease to another category
2. Include With Subscription and All Charter
3. When user changes filter the content below will update
4. When on the All Charter filter we would want to include the subscribed
icon on the art work. this shows if that asset is available to the user
with their current subscription, if there is a lock then they need to
upgrade to view. We have an icon for when the asset is focused and
unfocused (on/off)


Grid:

1. *OPTIONAL* User presses View All on swim lane and goes to the grid page screen
(static)

Time:

1. *OPTIONAL* Can the time stamp have a blink or slight fade in and out, very subtle
