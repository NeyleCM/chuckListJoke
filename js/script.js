
const fetchJoke = document.getElementById('fetchJoke')
const ulContainer = document.getElementById('jokeList')

const API = `https://api.chucknorris.io/jokes/random`
//peticion API
const getJoke = () => {
    fetch(API)
    .then((response) => response.json())
    .then((data) => saveJoke(data)) //Aqui invocamos la funcion pasandole la data
    .catch((error) => console.error(error.message))
}

//Function 
const saveJoke = (data) => {
    const joke = localStorage.getItem('joke') // en la primera vuelta no existe, en la segunda si.
    
    const array = joke ? JSON.parse(joke) : [] // nos queda un array vacio en la primera.

    array.push(data) // aqui el array tiene el chiste

    // console.log(array); //deberia mostrar chiste

    localStorage.setItem('joke', JSON.stringify(array))
    
    template(localStorage.getItem('joke'))//Invocamos esta funcion y le pasamos los jokes guardados en la variable localStorage
}
//funcion para crear item list 
const template = (data) => {
    const itemsToTemplate = JSON.parse(data)//Aqui lo convertir data en un array de objetos para recorrerlo.

    
    const allListItems = itemsToTemplate.map((item) => {
        const {value,id} = item //usamos en destructiring para sacar el value y id.
        return `<li id=${id} ><h3>${value}</h3><button id=${id} class='button'>Eliminar</button></li>`
    }).join('')
    

    ulContainer.innerHTML = allListItems //Agregamos allListItems a al ul. contenedor.
}

//FUNCTION para renderizar los elementos de la variable localStorage, si existe.
const loadJoke = () =>{
    const jokesToLoad = localStorage.getItem('joke') // para amacenar los valores que tiene localStorage
    
    jokesToLoad ? template(jokesToLoad) : null

   
}

//Verificar en que boton fue el click y luego pasamos el id a la function removeItem(event)
ulContainer.addEventListener('click', (event)=>{
    const isClicked = event.target.classList.contains('button')
    
    isClicked ? removeItem(event.target.id) : null
})

//Function para eliminar el <li>.
const removeItem = (itemId) => {
    let array = JSON.parse(localStorage.getItem('joke')) //Almacenar en el array variable localStorage.
    
    let arrayFiltered = array.filter((item) => item.id !== itemId)//Devuelve un array, sin el button ID seleccionado.
    
    localStorage.setItem('joke', JSON.stringify(arrayFiltered))//Agrega el arrayFiltered a localStorage.
   

    template(localStorage.getItem('joke'))//Invocamos template(), para renderizar con localStorage actualizado.
}

fetchJoke.addEventListener('click', getJoke)//Fetch data a la API

window.addEventListener('load',loadJoke)//Cuando se cargue toda la pagina, me llama a la function loadJoke para renderizar los itemsList 

 