//Global VARs//
//-------------//
let forkIcon = "https://maxcdn.icons8.com/windows10/PNG/512/Programming/git_fork-512.png"
let starIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Octicons-star.svg/525px-Octicons-star.svg.png"
let publicRepos;

//Search function - launched on search button clicked//
//-------------//

function search() {
//reset on start
reset();
//get input from user and set url
let input = document.getElementById("lookFor").value;
let yourUrl = "https://api.github.com/users/" + input;
let yourUrl2 = yourUrl + "/repos";

  function Get(data){
    let Httpreq = new XMLHttpRequest(); // a new request - url for profile data
    Httpreq.open("GET",data,false);
    Httpreq.send(null);
    return Httpreq.responseText;
};
//creates data for name, avatar, bio and data2 for repositories info//
//-------------//
let data = JSON.parse(Get(yourUrl)); //url for profile data
let data2 = JSON.parse(Get(yourUrl2)); //url for repositories

//if user exists - execute 2 functions, if not - execute fail function//
//-------------//
  if (data['message'] === "Not Found") {
    fail();
  } else {
 mainProfile(data);
 repos(data2);
}};

//fail function - creates error box when no user//
//-------------//
function fail(){
    reset();
let divError = document.createElement("div");
divError.className = "error-box";
let messageError = document.createTextNode("There is no such user.");
divError.appendChild(messageError);
document.getElementById("repo-name").appendChild(divError);
  };


//reset function - resets data. Triggered on new search and fail//
//-------------//
function reset() {
let reset = document.getElementById("repo-name");
while (reset.firstChild) {
reset.removeChild(reset.firstChild);
}
reset = document.getElementById("profile");
while (reset.firstChild) {
reset.removeChild(reset.firstChild);
}}

//profile function - gets name, user, profile photo, bio//
//-------------//

function mainProfile(data) {
  reset();
//create space and line to separate from search bar
let br = document.createElement("br");
let hr = document.createElement("hr");
document.getElementById("profile").appendChild(br);
document.getElementById("profile").appendChild(hr);

let div = document.createElement("div");// create div with column
div.className = "col-md-3";
div.id = 'profile-left';
document.getElementById("profile").appendChild(div);

let img = document.createElement("IMG");// create div with AVATAR data
img.setAttribute("src", (data['avatar_url']));
img.id = 'avatar';
document.getElementById("profile-left").appendChild(img);

div = document.createElement("div");// create div with column
div.className = "col-md-9 text-left";
div.id = 'profile-right';
document.getElementById("profile").appendChild(div);

div = document.createElement("div");// create div with LOGIN data
div.id = 'username';
document.getElementById("profile-right").appendChild(div);
document.getElementById("username").innerHTML = "@" + data['login'];

div = document.createElement("h3");// create div with FULLNAME data
div.id = 'fullname';
document.getElementById("profile-right").appendChild(div);
document.getElementById("fullname").innerHTML = data['name'];

div = document.createElement("div");// create div with BIO data
div.id = 'bio';
document.getElementById("profile-right").appendChild(div);
document.getElementById("bio").innerHTML = data['bio'];

publicRepos = data['public_repos'] //gets number of public repositories into var - used for repos function//
};

//repositories function//
//-------------//
    function repos(data2){

    let hr = document.createElement("hr");// create div with hr to separate "profile" section from "repositories" section
    document.getElementById("repo-name").appendChild(hr);

      let i = 0;
      while (publicRepos > i && i < 30){  // API only shows up to 30 results

  //left column
let div = document.createElement("div"); //adds left column
div.className = "col-md-6 text-left";

let name = document.createTextNode(data2[i]['name']); //create div with Project Name
div.appendChild(name);
document.getElementById("repo-name").appendChild(div);

  //right column


    div = document.createElement("div"); //adds right column
    div.className = "col-md-6 text-right";
    div.id = ('nums' + i);
    document.getElementById("repo-name").appendChild(div);

    let star = document.createTextNode(data2[i]['stargazers_count']); //add "stars" number
    document.getElementById('nums' + i).appendChild(star);

    let img = document.createElement("IMG"); //create star icon
    img.setAttribute("src", starIcon);
    img.id = 'ico';
    document.getElementById("nums" + i).appendChild(img);

    let fork = document.createTextNode(data2[i]['forks_count']); //add "forks" number
    document.getElementById('nums' + i).appendChild(fork);

    img = document.createElement("IMG"); //create fork icon
    img.setAttribute("src", forkIcon);
    img.id = 'ico';
    document.getElementById("nums" + i).appendChild(img);

    //creates hr line by the end of each project
    let br = document.createElement("br");
    hr = document.createElement("hr");
    document.getElementById("repo-name").appendChild(br);
    document.getElementById("repo-name").appendChild(hr);


    i++; //executes again while loop until conditions are met
    }};
