const fetchJoke = document.getElementById('fetchJoke')
const ulContainer = document.getElementById('jokeList')
const API = 'https://api.chucknorris.io/jokes/random'

const getJoke = () => {
    fetch(API)
    .then((response) => response.json())
    .then((joke) => saveJoke(joke))
    .catch((error) => console.error(error.message))
}

const saveJoke = (data) => {
    const joke = localStorage.getItem('joke') // no existe por ahora
    
    const array = joke ? JSON.parse(joke) : [] // nos queda un array vacio

    array.push(data) // aqui el array tiene el chiste

    // console.log(array); //deberia mostrar chiste

    localStorage.setItem('joke', JSON.stringify(array))
    
    template(localStorage.getItem('joke'))
}

const template = (data) => {
    const itemsToTemplate = JSON.parse(data)

    
    const allListItems = itemsToTemplate.map((item) => {
        const {value,id} = item
        return `<li id=${id} ><h3>${value}</h3><button id=${id} class='button'>Eliminar</button></li>`
    }).join('')
    

    ulContainer.innerHTML = allListItems
}

const loadJoke = () =>{
    const jokesToLoad = localStorage.getItem('joke')
    
    jokesToLoad ? template(jokesToLoad) : null

   
}
ulContainer.addEventListener('click', (event)=>{
    const isClicked = event.target.classList.contains('button')
    if (isClicked) {
        removeItem(event.target.id)
    }

})

const removeItem = (itemId) => {
    // console.log(typeof itemId);
    let array = JSON.parse(localStorage.getItem('joke'))
    let arrayFiltered = array.filter((item) => item.id !== itemId)
    
    localStorage.setItem('joke', JSON.stringify(arrayFiltered))
   

    template(localStorage.getItem('joke'))
}

fetchJoke.addEventListener('click', getJoke)
window.addEventListener('load',loadJoke)

 