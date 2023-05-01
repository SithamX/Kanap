var str = "http://localhost:3000/api/products";
var url = new URL(str);
var idP = url.searchParams.get("id");
console.log(idP);