// Fetching the search box div

const getInput=document.querySelector(".search-box");

// Fetching the space div, where movie info will be shown

const InfoSpace=document.querySelector(".space");

// Api key from OMDB

var apiKey="33f48d46";

// URL for fetching desired movie from database

var url="http://www.omdbapi.com/?apikey="+apiKey;

// Favorite movies array/list 

const favoriteMovies=[];

// Count of how many favorite movie has been added

var count=0;

// This function for making API calls

function apiCall(call){
	// Create a http request

	const request=new XMLHttpRequest();

	// Open that by passing "GET", url with desired movie name

	request.open("GET",`${url}&t=${call}`);

	// To respond back

	request.send();

	// Proceesing the recieved responseText

	request.onload=function(){

		// Checking whether the request is active or not

		if(request.status===200){


			var data=JSON.parse(request.responseText);
			favoriteMovies.push(data);
				if(data.Title){

					// Appending li tag to the html in space div

				    InfoSpace.innerHTML=`
				    <img class="movie-poster" src="${data.Poster}" alt="Image not available">
			        <img class="add-to-fav-button" src="like.svg">
				    <ul>
				        <li><p>Movie : ${data.Title}</p></li>
				        <li><p>Director : ${data.Director}</p></li>
				        <li><p>Actors : ${data.Actors}</p></li>
				        <li><p>Released on : ${data.Year}</p></li>
				        <li><p>Genre of movie: ${data.Genre}</p></li>
				    </ul>`
			    }else {

			    	// Incase of errors and movies not found

			    	InfoSpace.innerHTML=`<h2>Movie Info Not Found!!!<h2><h4>Check your spell Human!!!<h4>`
			    }
		}
	}
};

// This function for removing favorite movies favoriteMovies list

function removeFromFav(id){

	// Fetching the particular div

	var child=document.getElementById(`${id}`)

	// Remove

	child.remove()
}

//Function for handling keypresses

function keyPressHandler(presses) {

	// When we press enter after entering movie name

	if(presses.key==="Enter"){

		// Collecting the movie name

		var movieName=presses.target.value;

		// Initialinzing API call with the Movie Name

		apiCall(movieName)
    }
};

// Function for handling the mouse clicks

function clicksHandler(clicks){

	// Collecting the target element/div

    const target=clicks.target;

    // Will triggered when targets class name was search-button

	if(target.className==="search-button"){

		// Collecting the movie name

		var movieName=getInput.value

		// Making api call with movie name

		apiCall(movieName)
		return;
	}

    // Will triggered when we press the like button and movie will be added in favorite movie list

	else if(target.className==="add-to-fav-button"){

		// Generating unique ID for each movies liked movies

		let idCreation=Date.now()

		// Running a loop so each times movies will be added in favoriteMovies based on the counts

		for(var i=0; i<=count;i++){

			// Creating an element div

			var div=document.createElement("div")

			// Appending the tags in it

			div.innerHTML=`<div id="${idCreation}" class="item">
                	<a class="dropdown-item" style="text-decoration:capitalize; " href="#">${favoriteMovies[count].Title}</a>
			        <img src="trash.png" class="img" id="${idCreation}">
			    </div>`

			// Appending the div into dropdown-menu div

		    document.querySelector(".dropdown-menu").appendChild(div);

		    // Appending className into dropdown div
		    document.querySelector(".dropdown").classList.add("dropdown-div-anim")

		    // setTimeout function for removing the className that appended earlier
		    // So that the animation will be available for another liked movie 

		    function removeClass() {
		    	document.querySelector(".dropdown").classList.remove("dropdown-div-anim")
		    }

		    setTimeout(removeClass,1000)

		    // Increasing the count by one

	        count+=1
	    }
	    return;
	}

	// Triggered when we clicks the delete button that present in the favoriteMovies

	else if(target.className==="img"){

		// Initialing the removeFromFav function with a target id

		removeFromFav(target.id)
		return;
	}
};

// Event handler for keypress

getInput.addEventListener("keyup",keyPressHandler)

// Event handler for clicks

document.addEventListener("click",clicksHandler)