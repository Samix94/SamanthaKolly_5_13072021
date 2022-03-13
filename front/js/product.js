let param = new URLSearchParams(window.location.search);
const id = param.get('id');
console.log(id)

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
        img.innerHTML = `<img src="../images/${data.imageUrl}" alt="${data.altTxt}"`

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

      

        // Pour les option des couleurs voir la boucle "foreach" sur un tableau //

        })
    })

          // Appelez également la fonction qui exécutera automatiquement renderQuote()

  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  })