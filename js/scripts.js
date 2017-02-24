/* Fechar menu navbar-collapse */
$('.navbar-collapse a').click(function () {
    $(".navbar-collapse").collapse('hide');
});

/* Trazendo JSON Potions */
var request = new XMLHttpRequest();
request.open('GET', 'assets/potions.json', true);

request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        var products = document.getElementById("products")

        for (var i in data.potions) {
            var figure = document.createElement('figure');
            var a = document.createElement('a');
            var img = document.createElement('img');
            var figCaption = document.createElement('figcaption');

            figure.appendChild(a);
            figure.appendChild(figCaption);
            a.appendChild(img);

            a.href = '#';
            img.idLightBox = `light${data.potions[i].id}`
            img.addEventListener('click', e => {
                document.getElementById(e.target.idLightBox).style.display = 'block';
            });

            img.src = `assets/products/${data.potions[i].image}`;
            figCaption.innerHTML = `${data.potions[i].name}  - <span>$ ${data.potions[i].price}</span>`;
            products.appendChild(figure);

            var raizLightbox = document.createElement('div');
            raizLightbox.id = `light${data.potions[i].id}`;
            raizLightbox.className = 'lightbox';
            raizLightbox.style.display = 'none';

            var conteudoLightbox = document.createElement('div');
            raizLightbox.appendChild(conteudoLightbox);
            conteudoLightbox.className = 'lightbox-content';

            var conteudoLigthBox = document.createElement('a');
            conteudoLightbox.appendChild(conteudoLigthBox);
            conteudoLigthBox.href = '#';
            conteudoLigthBox.id = `fecharLightbox${data.potions[i].id}`;
            conteudoLigthBox.innerText = 'X';
            conteudoLigthBox.lightBoxToHide = raizLightbox.id;
            conteudoLigthBox.addEventListener('click', e => {
                document.getElementById(e.target.lightBoxToHide).style.display = 'none';
            })

            var divImagemEsq = document.createElement('div');
            divImagemEsq.className = 'left';
            conteudoLightbox.appendChild(divImagemEsq);

            var figureLightBox = document.createElement('figure');
            var imgLightBox = document.createElement('img');
            imgLightBox.src = `assets/products/${data.potions[i].image}`;
            divImagemEsq.appendChild(figureLightBox);
            figureLightBox.appendChild(imgLightBox);

            var divTextoDir = document.createElement('div');
            divTextoDir.className = 'right';
            conteudoLightbox.appendChild(divTextoDir);

            var nameHeader = document.createElement('h4');
            nameHeader.innerText = data.potions[i].name;
            divTextoDir.appendChild(nameHeader);

            var efeitoH4 = document.createElement('h4');
            efeitoH4.innerText = 'Use/effect:';
            divTextoDir.appendChild(efeitoH4);

            var ingredientesHeader = document.createElement('h4');
            ingredientesHeader.innerText = 'Ingredients:';
            divTextoDir.appendChild(ingredientesHeader);

            var ingredientsParagraph = document.createElement('p');
            divTextoDir.appendChild(ingredientsParagraph);
            ingredientsParagraph.innerHTML = data.potions[i].ingredients.reduce((curr, next) => {
                return curr += next + "<br>"
            }, '');

            var efeitoParagrafo = document.createElement('p');
            efeitoParagrafo.innerText = data.potions[i].effect;
            divTextoDir.appendChild(efeitoParagrafo);

            divTextoDir.innerHTML += `
                <p class="preco">Price:
                    <br/>
                    <span>$ ${data.potions[i].price}</span>
                <p>
                <button class="btn btn-danger">Add to cart</button>`;

            products.appendChild(raizLightbox);
        }
    } else {
        console.log('error');
    }
};
request.send();
