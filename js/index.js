let container = document.querySelector(`.jeans`);


let jeans = [
    {
        title: `Темные джинсы`,
        size: `XS`,
        price: 2000,
        sale: true,
        img: `assets/jeans.jpg`,
    },
    {
        title: `Летние джинсы`,
        size: `XS`,
        price: 1700,
        sale: false,
        img: `assets/jeans2.jpg`,
    },
    {
        title: `Шорты`,
        size: `XS`,
        price: 900,
        sale: true,
        img: `assets/shorts.jpg`,
    },
    {
        title: `Темные джинсы`,
        size: `M`,
        price: 2100,
        sale: false,
        img: `assets/jeans.jpg`,
    },
    {
        title: `Летние джинсы`,
        size: `M`,
        price: 1900,
        sale: false,
        img: `assets/jeans2.jpg`,
    },
    {
        title: `Шорты`,
        size: `M`,
        price: 900,
        sale: false,
        img: `assets/shorts.jpg`,
    },
    {
        title: `Темные джинсы`,
        size: `XL`,
        price: 2000,
        sale: false,
        img: `assets/jeans.jpg`,
    },
    {
        title: `Летние джинсы`,
        size: `XL`,
        price: 1900,
        sale: true,
        img: `assets/jeans2.jpg`,
    },
    {
        title: `Шорты`,
        size: `XL`,
        price: 850,
        sale: true,
        img: `assets/shorts.jpg`,
    }
];
render();

function render() {
    container.innerHTML = ``;
    for (let i = 0; i < jeans.length; i++) {
        // нарисуй элемент под индексом i
        renderItem(i);
    }
}

// Нарисовать одну книгу
function renderItem(i) {
  
    // у всех книг есть класс book
    // если книга прочитана, то дополнительно добавь ей класс done
    // достань элемент под индексом i из массивов
    let jeanss = jeans[i];
    let sale = jeanss.sale;

    if (sale) {
        container.innerHTML += `
            <div class="col">
                <div class="card">
                <span class="badge bg-danger">Скидка</span>
                    <img src="${jeanss.img}" class="card-img-top" alt="тёмные джинсы">
                    <div class="card-body">
                        <h5 class="card-title">${jeanss.title}</h5>
                        <p class="card-text">Размер: ${jeanss.size}</p>
                        <div class="row align-items-center">
                            <div class="col">
                                <button class="btn btn-primary buy">Купить</button>
                            </div>
                            <div class="col">
                                <span class="price">
                                ${jeanss.price}
                                </span>
                                <span>
                                ₽
                                </span>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        `;    
    } else {
        container.innerHTML += `
            <div class="col">
                <div class="card">
                    <img src="${jeanss.img}" class="card-img-top" alt="тёмные джинсы">
                    <div class="card-body">
                        <h5 class="card-title">${jeanss.title}</h5>
                        <p class="card-text">Размер: ${jeanss.size}</p>
                        <div class="row align-items-center">
                            <div class="col">
                                <button class="btn btn-primary buy">Купить</button>
                            </div>
                            <div class="col">
                            <span class="price">
                            ${jeanss.price}
                            </span>
                            <span>
                            ₽
                            </span>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        `;    
    }
}
let input = document.querySelector(`.mainsearch`);
// Поиск по названию
function searchByTitle() {
    let ask=input.value.toLowerCase();
    ask.replaceAll('ё', 'е');
    container.innerHTML = ``;
    for(let i=0; i<jeans.length; i++){
      let jeanss = jeans[i].title.toLowerCase();
      let size = jeans[i].size.toLowerCase();
      if(jeanss.includes(ask) || size.includes(ask)){
        renderItem(i);
      }
    }
}

input.addEventListener(`input`, searchByTitle);

let cart = document.querySelector(`.cart-button`);
let list = document.querySelector(`.sidebar-list`);
let sum = document.querySelector(`.sidebar-total`);
let sidebar = document.querySelector(`.sidebar`);
let total = 0;
let c = 0;
let add = [false];
let cards = container.querySelectorAll(`.card`);
let order = document.querySelector(`.order-button`);
list.innerHTML = `Добавьте товары в корзину, чтобы заказать`;

cart.addEventListener(`click`, function(){
    sidebar.classList.toggle(`hidden`);
});

document.addEventListener(`click`, function(e){
    
    if(e.target.classList.contains(`buy`)){
        list.innerHTML = ``;
        e.target.closest(`.card`).classList.toggle(`card-active`);
        c++;
        let jprice = Number(e.target.closest(`.row`).querySelector(`.price`).innerHTML);
        if(e.target.closest(`.card`).classList.contains(`card-active`)){
            total += jprice; 
        } else {
            total -= jprice;
        }
        for(let i = 0; i < jeans.length; i++){
            let jeanss = cards[i];
            if(jeanss.classList.contains(`card-active`)){
                list.innerHTML += `<li>${jeans[i].title} – ${jprice} ₽</li>`;
            }
        }
        if(total==0){
            sum.innerHTML = ``;
            list.innerHTML = `Добавьте товары в корзину, чтобы заказать`;
            order.classList.add(`d-none`);
        } else {
            sum.innerHTML = `Итого: ${total} ₽`;
            order.classList.remove(`d-none`);
        }
    }
});