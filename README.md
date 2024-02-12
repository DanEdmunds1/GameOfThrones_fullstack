Project 3: GameOfThrones 
FullStack ReadMe

Description
This is a full-stack application that serves as a basic compendium for Game of Thrones. It consists of a back-end Express Framework API and a front-end React user interface that consumes the API with full C.R.U.D (create, read, update, delete) capabilities.

Deployment link: https://gameofthronesfullstack-b965d7354f59.herokuapp.com/

Timeframe & Working Team
This was a group project between:
Dan Edmunds (https://github.com/danedmunds1), 
Nysha Dzvoti (https://github.com/NyashaDZT), 
Ben Kelly (https://github.com/benelliottkelly).
This project was created between 7/12/23 and 15/12/23 inclusive.

Technologies Used
Front-end: React, JavaScript, HTML, SASS, Bootstrap
Back-end: Express.js
Database: MongoDB
Development Tools: Excalidraw, QuickDBD

Brief
Technical Requirements:
Build a full-stack application by making your own backend and your own front-end
Use an Express API to serve your data from a Mongo database
Consume your API with a separate front-end built with React
Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers
Be deployed online so it's publicly accessible

Necessary Deliverables:
A working app hosted on the internet
A link to your hosted working app in the URL section of your Github repo
A git repository hosted on Github, with a link to your hosted project, and frequent commits dating back to the very beginning of the project
A readme.md file with:
An embedded screenshot of the app
Explanations of the technologies used
A couple paragraphs about the general approach you took
Installation instructions for any dependencies
Link to your user stories/wireframes – sketches of major views / interfaces in your application
Link to your pitch deck/presentation – documentation of your wireframes, user stories, and proposed architecture
Descriptions of any unsolved problems or major hurdles you had to overcome

Planning
We began planning by deciding the topic of our API. After much discussion we landed on creating some sort of Game of Thrones compendium as this is a franchise that all group members had an interest in and good knowledge of. Furthermore, it would allow us to create multiple schemas in our API and make good use of referenced relationships, i.e. giving the houses schema access to the characters schema so we could display all the characters in a specific house in the house’s index page.
We created a detailed wireframe outlining which schemas would have referenced relationships with which other schemas. It also included the layout of the index pages, the layout of the single display pages, and the outline of the profile section, including the ability to register, login, and logout.
Finally we took all of our ideas and separated them into necessary deliverables for the project, and stretch goals. We decided to complete the necessary deliverables first and then, if we had sufficient time, start working on the stretch goals. One of these goals was to add an interactive map to the places index page, allowing users to click points plotted on a map and navigate to the single display page for each place.

Build/Code Process
Back-End
We started by creating the Express API together because the process was still new to us, and so we thought going over it again from scratch would be a valuable learning opportunity. I was typing the code while Ben and Nyasha gave their input on how our back-end should be structured, i.e. where we wanted our referenced relationships to be. By the end of the first day our API was able to serve data from our Mongo Database via Insomnia, and therefore the next day we could get to work on the front-end to allow users to interact with the API.

Reactivity Features
As this was a group project we decided to split this work between the group members, allowing multiple sections of the front-end to progress at the same time. I was given the home page, the index pages, and the index filters to work on, and after these were completed I then helped to finish the create and edit character functionality. Finally I added some finishing touches around the site, as detailed below.
Reactive Components:
A modal that pops up when you click the logout button asking if you are sure you want to logout
Highlighting the navigation bar options when hovered
Other Finishing Touches:
Changing the input fields for house and home town in the create and edit character pages from text to dropdowns populated by an API call
Writing a function that checks whether a user’s token has expired when they try to create or edit a character. If it has expired a modal will pop up informing the user to login again, and navigate to the login page

Home Page
The home page does not make use of any loaders or actions related to our API, and instead simply acts as a hub to display the following information:
The outline and purpose of the project
The github links of those in the project group
The sources for images and descriptions we have used
The home page also includes links to the index pages for characters, locations, and houses found within the Game of Thrones fiction.

Index Pages
The index pages render all items of a given model on one page for users to scroll and/or filter through. Each item is organised into a card that contains an image, a title, and sometimes a brief description, and each card is a link to the single view for that item. It was fairly straightforward to render the relevant information for each item on the index pages as we has planned for this when creating the back-end. 

Filters
Using the Correct Filters
I wanted to create a filter component that could be used on all three index pages and that would allow users to search for items using the item’s name and other related information. For example, when on the places index, a user could type the name of a place into the search bar to return that place, but they could also enter the name of a house and the filters would return every place that has been occupied by that house. Users could also enter the name of a character, and the hometown of that character would be rendered.
As I wanted the filters to be a single component I wrapped the filter logic in an if statement that checks whether places is true (whether the place items are being rendered), if place is false it will check characters and houses until it finds what data has been loaded.

 const [places, setPlaces] = useState([])
 const [filteredPlaces, setFilteredPlaces] = useState([])




  useEffect(() => {
    setPlaces(location)
  }, [location])
  return (
<Filter places={places} setFilteredPlaces={setFilteredPlaces} filteredPlaces={filteredPlaces} />
)


if (places) {
// Places Filter logic
} else if (characters) {
// Character Filter Logic
} else if (houses) {
// Houses Filter Logic
} else {
// Condition for no data loaded }

Filter Logic
The filter logic took the most time to complete for reasons explained in greater detail in the challenges section of this ReadMe, but after lots of research and trial and error, this is how the filters work:
First the pattern is set to the contents of the search bar
Then filteredArray is initialised as a let variable, as the filtered array will differ depending on what index page is being rendered
The code then checks if the user is on the places index page, for this example they are
The places array is filtered through and tied to the filteredArray variable
If the any place doesn’t have a referenced relationship to a character that lives there, then it will only look for the place name and the house that occupies that place, as every place will have these two fields, they are required in the schema
If there is at least one referenced relationship with a character that lives in the place, then this list of characters if filtered through to test for their first name, last name, and a combined string of their first and last name
Then the code test for the place name, the house that occupies it, and any characters that live there
Finally the results are alphabetised by a function used by all documents

 useEffect(() => {


        const pattern = new RegExp(filters.search, 'i')
        let filteredArray
        if (places) {
            filteredArray = places.filter(place => {


                if (place.charactersInPlace.length === 0) {
                    return pattern.test(place.name) || pattern.test(place.occupiedBy)
                }


                else if (place.charactersInPlace.length > 0) {
                    const filtArr = place.charactersInPlace.filter(char => {
                        return pattern.test(char.firstName) || pattern.test(char.lastName) || pattern.test(`${char.firstName} ${char.lastName}`)
                    })
                    return pattern.test(place.name) || pattern.test(place.occupiedBy) || filtArr.length
                }


            })


            setFilteredPlaces(alphabetiseIndex(filteredArray, 'name'))


            // Create Places DropDown for Places
            if (places.length > 0 && placesDropDown.length === 0) {
                const placeArray = [...new Set(places.map(place => place.name))]


                setPlacesDropDown(alphabetiseDropDown(placeArray))
            }


            // Create Houses DropDown for Places
            if (places.length > 0 && housesDropDown.length === 0) {
                const uniqueOccupants = Array.from(new Set(places.flatMap(place => place.occupiedBy)));


                setHousesDropDown(alphabetiseDropDown(uniqueOccupants))
            }




        } else if (houses) {
		// House Logic
                   } else if (characters) {
            // Character Logic
        }




    }, [filters, places, setFilteredPlaces, (same for houses and characters)])




// Alphabetise Function
    function alphabetiseDropDown(arrayName) {
        const alphabet = [...arrayName].sort((a, b) => {
            const nameA = a.toUpperCase()
            const nameB = b.toUpperCase()
            return nameA.localeCompare(nameB)
        })
        return alphabet
    }





Dropdown Filters
The dropdowns essentially populate the search bar based on the option that is clicked, and the dropdown options are populated by accessing the loader data and creating a new array form unique instances of places and houses (though of course this differs between which type of data is being loaded)

Challenges
The primary challenge I faced was finding a way to test the Regex pattern found in the search bar against not only the name of the items being rendered, but also against the other related information stored inside the items. Prior to this project I had only ever tested one or two surface level values against this pattern so this was a new and difficult endeavor. This was such a challenge as I did not know how to test the Regex pattern against the name of the item, then also loop through arrays of items inside the item and test each of these against the same Regex pattern. Making use of online resources and the teaching team at General Assembly I found the correct syntax for accomplishing this and the filters now function very well.

Wins
Overcoming and finding the solution to the aforementioned filtering challenge as it took a lot of time to work through and I wasn’t sure if it was something I could even do. But I used a combination of online resources and the teaching assistants at GA to complete it, and I’m glad I did because it works very well and makes good use of the referenced relationships between our models.
Another win was the ability to work with Ben and Nyasha throughout this project. I really enjoyed the teamworking aspect of this project and I certainly lucked out being paired with my teammates. After this experience, group projects are now something I hope to participate more throughout my career.

Key Learnings/Takeaways
After this project I am a lot more confident working with filters and search bars due to the time spent overcoming the aforementioned challenges.
I am also more competent at using online resources to fix issues with my code as I am more aware of the sort of information to look for and how to log out each step of a process I am trying to create to find where the error is occurring.
After completing a group project I believe it is my favourite way to work. It was very useful to have teammates to go to with questions about ways to solve an issue as they will already possess a good understanding of the section I am working on. It was also a lot more pleasant to have company while coding as it made me feel more like part of a team, and I had people to chat with during down time. Finally, the fact that other team members were working on other aspects of the site meant that I had more time to work on my parts and complete them to a higher standard than if I had to do it all myself in the same time frame.

Bugs
There is a reactivity issue that can occur when a user is creating or editing a character and their token has expired. If their token expires while they are on the site, when they try to navigate to character creation or character edit, a modal will appear telling them to log in again, but if the token expires while they are on the page, no such modal appears. Therefore when a user tries to submit their creation or change, the inputs will return to their default state. No creation or update will take place, but there is also no message returned that tells the user this. Luckily this is an easy fix but as of writing this ReadMe, the issue still remains.

Future Improvements
I wanted to create an index page that could display all items at the same time and have working filters like the other indexes. Users would be able to search for any place, character, or house using the search bar and dropdowns, and the page would return whatever item they were searching for, alongside other relevant items. I.e. if a user searched “Stark”, the page would return House Stark, any Stark characters, and any places occupied by the Starks.
I would also like to include more documents for other types of information pertaining to Game of Thrones, such as wildlife, battles, eras, etc. Extremely comprehensive compendiums already exist for Game of Thrones and they manage to store a great amount of information, so really we are only just scratching the surface of what is possible with our project.





