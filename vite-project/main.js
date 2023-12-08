async function getData(){
  let res = await fetch(
    "https://bungie-net.github.io/multi/index.html"
  );
  let data= await res.json();
  console.log(data);
}
getData();