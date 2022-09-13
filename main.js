const CARDS = 14;
// i = 0;

//Peticion de pokemon al API

for (let i=1; i <= CARDS; i++){
    let id = getRandomId(150)
    console.log(id)
    searchPokemonById(id)
}


function getRandomId(max){
    return Math.floor( Math.random()*max)+1
}

//Se crean los elementos que apuntan al html
let draggableElements = document.querySelector('.draggable-elements')
let droppableElements = document.querySelector('.droppable-elements')

//Se crea elementos vacios
let pokemonSearched = [];
let pokemonNames = [];

//Funcion async/await
async function searchPokemonById(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await res.json()

    //Arreglos de los pokemones e imagenes
    pokemonSearched.push(data)
    pokemonNames.push(data.name)
    console.log(pokemonNames)
    pokemonNames= pokemonNames.sort(() => Math.random() - 0.5)
    console.log(pokemonNames)

    //Insertando imagenes de los pokemones
    draggableElements.innerHTML = ''
    pokemonSearched.forEach(pokemon => {
        console.log(pokemon)
        draggableElements.innerHTML += `
            <div class="pokemon">
                <img id="${pokemon.name}" draggable="true" class="image" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="pokemon">
            </div> `
    })

    //Insertando nombres de los pokemones
    droppableElements.innerHTML = ''
    pokemonNames.forEach(name => {
        droppableElements.innerHTML += `
        <div class="names">
            <p>${name}</p>
        </div>
        
        `
    })

    let pokemon = document.querySelectorAll('.image')
    pokemon = [...pokemon]
    pokemon.forEach(pokemon => {
        pokemon.addEventListener('dragstart', event=>{
            event.dataTransfer.setData('text', event.target.id)
        })
    })

    let names = document.querySelectorAll('.names')
    let wrongMsg = document.querySelector('.wrong')
    let points = 0;
    names = [...names]
    names.forEach(name => {
    
        name.addEventListener('dragover', event => {
            event.preventDefault()
        })
    
        name.addEventListener('drop', event => {
            const   draggableElementData = event.dataTransfer.getData('text');
            let pokemonElement = document.querySelector(`#${draggableElementData}`)

            if (event.target.innerText == draggableElementData){
                event.target.innerHTML = ''
                points++
                event.target.appendChild(pokemonElement)
                wrongMsg.innerText = ``
                
                if(points == CARDS){
                    draggableElements.innerHTML = `<p class="win">Ganaste!</p>`
                }
            
            }
            else{
                console.log('NO')
                wrongMsg.innerText = `Ups!`
            }
        
        })

    })

}


// fetch('https://pokeapi.co/api/v2/ability/1/')
// .then(res => res.json())
// .then(respuesta => console.log(respuesta))
