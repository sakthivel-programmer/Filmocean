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
				    <img src="${data.Poster}" alt="Image not available">
			        <svg class="add-to-fav-button" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
				       <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
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

	else if(target.tagName==="svg"){

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