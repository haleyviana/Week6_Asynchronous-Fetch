

let currentPokemon = null;

//when user clicks find button, call findPokemon function
document.getElementById("findButton").addEventListener("click", find);
//when user clicks add to Team button, call addToTeam function
document.getElementById("addButton").addEventListener("click", add);


//function to find pokemon data from API and display it on the page
function find() {

  let nameID = document.getElementById("input").value.trim().toLowerCase();

  //sends request to pokeapi -> turns input into json -> stores data in currentPokemon variable
  fetch("https://pokeapi.co/api/v2/pokemon/" + nameID).then(response => response.json()).then(data => {currentPokemon = data;

    // display image from JSON
    document.getElementById("image").src=data.sprites.front_default;

    // audio from JSON
    document.getElementById("audio").src=data.cries.latest;

    // moveslist from JSON
    let movesList = data.moves;

    //array of dropdowns named selects
    let selects = [
      document.getElementById("move1"),
      document.getElementById("move2"),
      document.getElementById("move3"),
      document.getElementById("move4")
    ];

    //resets moveList
    document.getElementById("move1").innerHTML = "";
    document.getElementById("move2").innerHTML = "";
    document.getElementById("move3").innerHTML = "";
    document.getElementById("move4").innerHTML = "";

    //loops for each move 
    for (let i = 0; i < movesList.length; i++) {
      //gets move name from JSON
      let moveName = movesList[i].move.name;

      //loops for each dropdown 
      for (let s of selects) {
        //creates option element for each move and adds it to the dropdown
        let option = document.createElement("option");
        option.text = moveName;
        s.add(option);
      }
    }

  });

}

//function to add pokemon and moves to team section
function add() {

  //no pokemon found, do nothing
  if (currentPokemon==null) return;

  //array of moves from dropdowns selected by user
  let moves = [
    document.getElementById("move1").value,
    document.getElementById("move2").value,
    document.getElementById("move3").value,
    document.getElementById("move4").value
  ];


  //section for team 
  let team = document.getElementById("team");

  //each pokemon 
  let row = document.createElement("div");

  row.style.display = "flex";
  row.style.alignItems = "center";
  row.style.border = "2px solid black";
  row.style.margin = "11px";
  row.style.padding = "11px";

  // image from JSON
  let img = document.createElement("img");
  img.src = currentPokemon.sprites.front_default;
  img.width = 85;

  row.appendChild(img);

  // move list 
  let ul = document.createElement("ul");

  //loops for each move and adds it to the list
  for (let i of moves) {

    let li = document.createElement("li");
    li.textContent = i;

    //adds move to list
    ul.appendChild(li);

  }

  //adds information to team section
  row.appendChild(ul);
  team.appendChild(row);

}