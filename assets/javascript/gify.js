// Funtion for creating buttons dynamically based on the values in an array.
let movie = [
    "In Bruges",
    "Snatch",
    "Pulp Fiction",
    "I Saw the Devil",
    "Jurrasic Park",
    "Slumdog Millionaire",
    "Bad Boys",
    "New Jack City",
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


function initialExperience () {

    for (let i = 0; i < movie.length; i++) {

        let button = $("<button>")
            .attr("type", "button")
            .addClass("btn btn-sm btn-outline-" + buttonDisplay[i])
            .append(movie[i]);

            $(".buttons").append(button);
    }
}

// Click handler for reaching out to the API once a button is clicked
// Click handler for going from a still gif to an animated one and back
// Function for creating a button based on value typed in an input

initialExperience();