let param = new URLSearchParams(window.location.search);
const id = param.get('id');
console.log(id)

let panier = []
  if (localStorage.getItem("panier")){
  console.log("coucou")
}
  else{
    let panier = JSON.parse(localStorage.getItem("panier"))
  console.log(panier)
  }

fetch('http://localhost:3000/api/products/' + id)
     .then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

     response.json()
      .then(function(data) {
        console.log(data.colors);

        let img = document.getElementById("imageUrl")
        img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`
        let colors= document.getElementById("colors")
        let option = ""
        data.colors.forEach(color => {
          option = document.createElement("option")
          colors.appendChild(option)
          option.setAttribute("value", color)
          option.textContent = color
        });

        let title = document.getElementById("title")
        title.innerHTML = `${data.name}`

        let price = document.getElementById("price")
        price.innerHTML = `${data.price}`

        let description = document.getElementById("description")
        description.innerHTML = `${data.description}`
        
        let quantity = document.getElementById("quantity")

        let addToCart = document.getElementById("addToCart")
        addToCart.addEventListener("click", function(){
          console.log(id)
          
          if(colors.value === "" || quantity.value <= 0 || quantity.value >100){
              let msg="Attention, vous avez oublié de saisir la couleur et la quantité !"
              console.log(msg)
              alert(msg);
            }
          else {
          let addkanap = {
            _id: id,
            color: colors.value,
            qts: quantity.value,
            }

          let compare = panier.find( kanap => kanap._id === addkanap._id && kanap.color === addkanap.color);
          if(compare){
            console.log(compare.qts)
            compare.qts = parseInt(compare.qts) + parseInt(addkanap.qts)
            console.log(compare)
            localStorage.setItem("panier", JSON.stringify(panier))
          }
          else{
            console.log("pas d'objet trouvé")

            panier.push(addkanap)
          localStorage.setItem("panier", JSON.stringify(panier))
          }
        }
      })
     })
   })

  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  })
