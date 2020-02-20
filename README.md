Technical Assignment

· Mobile application:

· Architecture and testability are appreciated.

· There should be an abstraction for network usage. In other words it should be possible to replace the network module, for example, in compile time.

· Application:

· Application is expected to retrieve some information (temperature, game results, etc.) from the internet and show it to the user.

· Choose an API to be used. It can be your own, if you wish. The simpler, the better.

· The user triggers the retrieval after the app is launched.

· The user has possibility to input the used URL for retrieval.

· Functionality is not the main point here, keep it simple!

· We expect unit testing.

Application:

(Train locator)

API : https://www.digitraffic.fi/rautatieliikenne/

Retrieves every latest active trains/train (inside 15 min) after the app is launched.

User is able to locate train by its train number. User is also able to fetch train by using
API URL, for example: https://rata.digitraffic.fi/api/v1/train-locations/latest/<Train number>

User is also able to click train item in the list. After the click, a route action happens and new screen will open. In this specific screen, user will be able to see where the train is moving. 
(Train location will refresh every single 15 seconds because thats how the API functions, see: https://www.digitraffic.fi/rautatieliikenne/#junan-gps-sijainnit-train-locations )

If user wants to see another train in the map, user will be able to move back to starting screen from above the map.

How to run:

Installation

Make sure you have installed Expo

Personally I prefer yarn in React Native projects

- (npm install or yarn add) -g expo-cli
- git clone <Folder destination>
- cd <Project name>
- inside folder yarn add or npm install
- Run project using yarn-, npm- or expo start (Your prefer)

Scripts:

"test": "jest",
"format": "prettier \"src/\*_/_.{js, html}\" --write",
"start": "expo start",
"android": "expo start --android",
"ios": "expo start --ios",
"web": "expo start --web",
"eject": "expo eject"

Architecture: 

