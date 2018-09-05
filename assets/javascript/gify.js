//======================Global Variables======================================================================

let movie = [
    "The Witch",
    "The Babadook",
    "Let the Right One In",
    "It",
    "Blair Witch",
    "Paranormal Activity",
    "28 Days Later",
];

let buttonDisplay = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "primary",
];

let button;
let buttonColorCount = 0;
let buttonVal;
let state;
let animatedGify;
let stillGify;
let gifyRating;

//====================== Functions ======================================================================

// Funtion for creating buttons dynamically based on the values in an array.
function initialExperience () {
    $(".buttons").empty();
    $(".user-buttons").empty();

   
        for (let i = 0; i < movie.length; i++) {

            let button = $("<button>")
                .attr("type", "button")
                .attr("data-typed", movie[i])
                .addClass("btn btn-sm call-api btn-outline-" + buttonDisplay[i])
                .append(movie[i]);

            if (i > 6) {
                $(".user-buttons").append(button);

            }else {
                $(".buttons").append(button);
            }
        }
}


function callApiDisplayGifys () {
    
        // console.log(buttonVal);
        

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonVal + "&api_key=FzsstZRyKhIEJZWO56UXiJBmy3IzbvXc&limit=10";
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
            let responseData = response.data;
                // console.log(responseData);

        for (i = 0; i < 10; i++) {
        animatedGify = responseData[i].images.original.url;
        stillGify = responseData[i].images.original_still.url;
        gifyRating = responseData[i].rating;
        console.log(gifyRating);
        
        

            let gifyDiv = $("<div>")
                        .addClass("gify");
            
            let gifyImg = $("<img>")
                        .attr("src", stillGify)
                        .attr("data-still", stillGify)
                        .attr("data-animate", animatedGify)
                        .attr("data-img-state", "still")
                        .addClass("gify-image");
            
            let gifyRatingP = $("<p>")
                            .addClass("gify-rating");
                
                gifyRatingP.text("Rating: " + gifyRating);
                gifyDiv.append(gifyImg);
                gifyDiv.append(gifyRatingP);
                
                // These if statements determine where gifys and posters are placed on the page based on whether or not they are generated by clicking one of the buttons that were originally on the page or clicking one of the newly added buttons.
                if ((i === 0 && buttonColorCount === 0) || (i === 1 && buttonColorCount === 0) || (i === 2 && buttonColorCount === 0) || (i === 3 && buttonColorCount === 0) || (i === 4 && buttonColorCount === 0)) {
                    $(".gify-area1").prepend(gifyDiv);

                }else if ((i === 0 && buttonColorCount > 0) || (i === 1 && buttonColorCount > 0) || (i === 2 && buttonColorCount > 0) || (i === 3 && buttonColorCount > 0) || (i === 4 && buttonColorCount > 0)){
                    $(".user-gify-area1").prepend(gifyDiv);

                }else if ((i === 5 && buttonColorCount > 0) || (i === 6 && buttonColorCount > 0) || (i === 7 && buttonColorCount > 0) || (i === 8 && buttonColorCount > 0) || (i === 9 && buttonColorCount > 0)) {
                    $(".user-gify-area2").prepend(gifyDiv);  
                }else {
                    $(".gify-area2").prepend(gifyDiv);
                }
        }   
    });
}

function callOmdbApi () {

    console.log(buttonVal);

    let queryURL = "https://www.omdbapi.com/?t=" + buttonVal + "&apikey=265b0607";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
            let responseData = response;
                console.log(responseData);

            let posterDiv = $("<div>");
            
            let posterImg = $("<img>")
                        .attr("src", response.Poster)
                        .addClass("poster-image");

                posterDiv.append(posterImg);

        

        if (buttonColorCount > 0) {
            $(".user-poster-area").prepend(posterDiv);
        }else {
            $(".poster-area").prepend(posterDiv);
        }
});

}


//====================== Handlers/Calls ======================================================================


initialExperience();

// Click handler for reaching out to the API once a button is clicked and displaying content on the page appropriately
$("body").on("click", ".call-api", function(event){
    buttonVal = $(this).attr("data-typed");

    callApiDisplayGifys();
    callOmdbApi();

});

// Click handler for adding a new entry to the list of buttons.
$(".add-new").on("click", function(event){
    
    event.preventDefault();

    // Get the value out of the input field to display as a button
    let newEntry = $(".form-control").val().trim();
 
        // console.log(newEntry); 

    // Push the typed value into the movie array that is storing all the movies 
    movie.push(newEntry);

        // console.log(movie);

    // Whenever a new movie is added to the movie array, push another button display color to that array so that the new movie is displayed with a different button color.
    buttonDisplay.push(buttonDisplay[buttonColorCount]);
 
    // Increment up this count to just cycle through the 7 button colors that we started with. 
    buttonColorCount++;

    // Make sure that when a new movie is added we don't all the arrray values being repeated -- only the new entry.
    initialExperience();

    // Clear the value in the input field once the form is submitted.
    $(".form-control").val(""); 

});

// Click handler for going from a still gif to an animated one and back
$("body").on("click", ".gify-image", function (event){
    state = $(this).attr("data-img-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-img-state", "animated");
    
    }else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-img-state", "still");
        
    }
});
