async function getData(){
  let res = await fetch(
    ""
  );
  let data= await res.json();
  console.log(data);
}
getData();