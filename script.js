const getInput=document.querySelector(".search-box");

const InfoSpace=document.querySelector(".space");

var apiKey="33f48d46";

var url="http://www.omdbapi.com/?apikey="+apiKey;

const favoriteMovies=[];

var count=0;

function apiCall(call){
	const request=new XMLHttpRequest();
	request.open("GET",`${url}&t=${call}`);
	request.send();
	request.onreadystatechange=function(){
		if(request.status===200){
			var data=JSON.parse(request.responseText);
			favoriteMovies.push(data);
				if(data.Title){
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
			    	InfoSpace.innerHTML=`<h2>Movie Info Not Found!!!<h2><h4>Check your spell Human!!!<h4>`
			    }
		}
	}
};


function removeFromFav(id){
	var child=document.getElementById(`${id}`)
	child.remove()
}


function keyPressHandler(presses) {
	if(presses.key==="Enter"){
		console.log("pressed")
		var movieName=presses.target.value;
		apiCall(movieName)
    }
};

function clicksHandler(clicks){
    const target=clicks.target;
    console.log(target);
	if(target.className==="search-button"){
		var movieName=getInput.value
		apiCall(movieName)
		return;
	}else if(target.tagName==="svg"){
		console.log("clicks")
		let idCreation=Date.now()
		// favoriteMovies.push(apiCall().movieObject)
		for(var i=0; i<=count;i++){
			var div=document.createElement("div")
			div.innerHTML=`<div id="${idCreation}" class="item">
                	<a class="dropdown-item" style="text-decoration:capitalize; " href="#">${favoriteMovies[count].Title}</a>
			        <img src="trash.png" class="img" id="${idCreation}">
			    </div>`
		    document.querySelector(".dropdown-menu").appendChild(div);
	        count+=1
	    }
	    return;
	}else if(target.className==="img"){
		console.log("comes")
		removeFromFav(target.id)
		return;
	}
};
getInput.addEventListener("keyup",keyPressHandler)
document.addEventListener("click",clicksHandler)
