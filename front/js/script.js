fetch('http://localhost:3000/api/products/')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      
     response.json()
      .then(function(data) {
        console.log(data);
              for (const q of data) {
                const item = document.querySelector('#items');

          //Créer tous les éléments nécessaires

                item.innerHTML += `<a href="./product.html?id=${q._id}">
                <article>
                  <img src="${q.imageUrl}" alt="${q.altTxt}">
                  <h3 class="productName">${q.name}</h3>
                  <p class="productDescription">${q.description}</p>
                </article>
              </a>`
                }
             })
    })

          // Appelez également la fonction qui exécutera automatiquement renderQuote()

  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  })