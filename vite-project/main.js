async function getData(){
  let res = await fetch(
    "https://pokeapi.co/api/v2/"
  );
  let data= await res.json();
  console.log(data);
}
getData();
const URL='https://pokeapi.co/api/v2/';

async function getData(URL){
    try{
    const response= await fetch(URL)
    console.log(response);
    if(response.status !=200){
        throw new Error(response.statusText);
    }
    //take response from server and convert it to JSON
    const data= await response.json();
    document.querySelector("h1").textContent = data.content;
    document.querySelector("h2").textContent = data.author;
    }
    catch(error){
        document.querySelector("h1").textContent = "Error";
    }
};
getData(URL);