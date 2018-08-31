
let movie = [
    "In Bruges",
    "Snatch",
    "Pulp Fiction",
    "I Saw the Devil",
    "Jurrasic Park",
    "Slumdog Millionaire",
    "Bad Boys",
];

let buttonDisplay = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
];

let button;
let buttonColorCount = 0;

// Funtion for creating buttons dynamically based on the values in an array.
function initialExperience () {

    $(".buttons").empty();

        for (let i = 0; i < movie.length; i++) {

            let button = $("<button>")
                .attr("type", "button")
                .attr("data-typed", movie[i])
                .addClass("btn btn-sm call-api btn-outline-" + buttonDisplay[i])
                .append(movie[i]);
            $(".buttons").append(button);
        }
}

// Click handler for adding a new entry to the list of buttons.
$(".add-new").on("click", function(event){
    
    event.preventDefault();

    // Get the value out of the input field to display as a button
    let newEntry = $(".form-control").val().trim();
 
        console.log(newEntry); 

    // Push the typed value into the movie array that is storing all the movies 
    movie.push(newEntry);

        console.log(movie);

    // Whenever a new movie is added to the movie array, push another button display color to that array so that the new movie is displayed with a different button color.
    buttonDisplay.push(buttonDisplay[buttonColorCount]);
 
    // Increment up this count to just cycle through the 7 button colors that we started with. 
    buttonColorCount++;

    // Make sure that when a new movie is added we don't all the arrray values being repeated -- only the new entry.
    initialExperience();

    // Clear the value in the input field once the form is submitted.
    $(".form-control").val(""); 

});

// Click handler for reaching out to the API once a button is clicked
$("body").on("click", ".call-api", function(event){
    let buttonVal = $(this).attr("data-typed");
        console.log(buttonVal);

    let queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=FzsstZRyKhIEJZWO56UXiJBmy3IzbvXc&limit=5";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
            let responseData = response.data;
                console.log(responseData);

        });

});

// Click handler for going from a still gif to an animated one and back
// Function for creating a button based on value typed in an input

initialExperience();
