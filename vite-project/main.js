async function getData(){
  let res = await fetch(
    "https://pokeapi.co/api/v2/"
  );
  let data= await res.json();
  console.log(data);
}
getData();