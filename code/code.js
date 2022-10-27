"use script";

window.addEventListener('DOMContentLoaded', () => {
    //функция для поиска 1 элемента
    const get = (x) => {
        return document.querySelector(x)
    }
    //объявляем переменные===========================
    let spanPrice,
        spanSouse,
        spanToping,
        clone;

    const pizzaSize = {
        small: 100,
        midle: 200,
        big: 300
    },
        souse = {
            nameKetchap: 'Ketchap',
            ketchapPrice: 25,
            nameBbq: 'BBQ',
            bbqPrice: 30,
            namePikotta: 'Rikotta',
            pikottaPrice: 35
        },
        toping = {
            nameCheeze: 'Cheeze',
            cheezePrice: 30,
            nameFeta: 'Feta',
            fetaPrice: 30,
            nameMozarella: 'Mozarella',
            motsarellaPrice: 30,
            nameMeat: 'Meat',
            meatPrice: 50,
            nameTomato: 'Tomato',
            tomatoPrice: 20,
            nameMushrooms: 'Mushrooms',
            mushroomsPrice: 40
        }
    //========================================================
    //находим  labels
    const labels = document.querySelectorAll('label.radio');

    //за допомогою forEach слухаемо click
    labels.forEach((item) => {
        item.addEventListener('click', () => {

            //если во время заказа меняют размер пиццы - очищаем данные
            if (spanSouse !== undefined || spanToping !== undefined) {
                cleanPizza()
            }

            //якщо spanPrice ще не має - создаем и заполняем его
            if (!document.getElementById('spanPrice')) {
                createPrice(item)
            }
            //якщо spanPrice вже існує на сторінці
            else {
                printPrice(item)
            }
        })
    })
    //=======================================================

    const [...draggables] = document.querySelectorAll('.draggable')

    draggables.forEach((item) => {
        item.addEventListener('dragstart', (evt) => {
            evt.dataTransfer.effectAllowed = "move";
            evt.dataTransfer.setData("Text", item.id);
        }, false)

        item.addEventListener('dragend', (evt) => {
            //console.log(1);
        }, false)
    });

    const mainPizza = get('div.table');
    //===================================================================

    //закомментированные этапы, которые не учавствуют в процессе

    //mainPizza.addEventListener('dragenter', (evt) => {
    //}, false)
    //mainPizza.addEventListener('dragleave', (evt) => {
    //}, false)

    //===================================================================
    //списано с примера, пока не понимаю суть...
    mainPizza.addEventListener('dragover', (evt) => {
        if (evt.preventDefault) evt.preventDefault();
        return false;
    }, false)

    mainPizza.addEventListener('drop', (evt) => {
        if (!document.getElementById('spanPrice')) {
            alert('Выбирите размер пиццы')
        }
        else {

            if (evt.preventDefault) evt.preventDefault();
            if (evt.stopPropagation) evt.stopPropagation();
            let id = evt.dataTransfer.getData("Text");
            //============================================================
            //мой код....
            let elem = document.getElementById(id);
            clone = elem.cloneNode(true);
            mainPizza.append(clone);


            //создаём и заполняем spanSouseId
            if (!get('span#spanSouseId')) {
                createSouseSpan(id)
            }
            //заполняем spanSouseId если он уже есть
            else {
                spanSouseInnerText(id)
            }


            //создаём и заполняем spanToping
            if (!get('span#spanToping')) {
                createSpanToping(id)
            }

            else {
                //заполняем spanToping в первый раз
                if (spanToping.innerText === "") {
                    printSpanTopingFirstTime(id)
                }

                //заполняем spanToping если значение уже есть
                else {
                    printSpanTopingNotFirstTime(id)
                }
            }

            //обновляем цену
            printPriceAgain(id)
        }
    })
    //функция для формы
    formFunction()
    //функция для кнопки зныжка
    discountFunction()


    //расписываем функции
    //====================================================
    //функция очистки пиццы
    function cleanPizza() {
        //очищаем ингридиенты
        spanSouse.innerText = "";
        spanToping.innerText = ""
        //очищаем изображение
        let divPizza = get('div.table')
        let imgPizza = divPizza.children[0]
        let elements = divPizza.querySelectorAll('img');

        elements.forEach((item) => {
            item.remove()
        })
        //возвращаем изображение
        divPizza.append(imgPizza);
    }

    //=================================================
    //функция, которая создаёт и заполняет spanPrice
    function createPrice(item) {
        let price = get('.price');
        spanPrice = document.createElement('span');
        spanPrice.id = 'spanPrice';
        if (item.firstChild.id === 'small') {
            spanPrice.innerText = pizzaSize.small;
            price.append(spanPrice)
        }
        else if (item.firstChild.id === `mid`) {
            spanPrice.innerText = pizzaSize.midle;
            price.append(spanPrice)
        }
        else if (item.firstChild.id === 'big') {
            spanPrice.innerText = pizzaSize.big;
            price.append(spanPrice)
        }
    }

    //====================================================
    //функция, которая только заполняет spanPrice
    function printPrice(item) {
        if (item.firstChild.id === 'small') {
            spanPrice.innerText = pizzaSize.small + "грн";
        }

        else if (item.firstChild.id === `mid`) {
            spanPrice.innerText = pizzaSize.midle + "грн";
        }
        else if (item.firstChild.id === 'big') {
            spanPrice.innerText = pizzaSize.big + 'грн';
        }
    }

    //===================================================
    //функция, которая создаёт и заполняет spanSouse
    function createSouseSpan(id) {
        spanSouse = document.createElement('span')
        spanSouse.id = 'spanSouseId'
        get('div.sauces').append(spanSouse);

        switch (id) {
            case 'sauceClassic': spanSouse.innerText = souse.nameKetchap;
                break;
            case 'sauceBBQ': spanSouse.innerText = souse.nameBbq;
                break;
            case 'sauceRikotta': spanSouse.innerText = souse.namePikotta;
                break;
        }
    }

    //=====================================================
    //функция, которая только заполняет spanSouse
    function spanSouseInnerText(id) {
        //действие при отсутствии значения
        if (spanSouse.innerText === "") {
            switch (id) {
                case 'sauceClassic': spanSouse.innerText = souse.nameKetchap;
                    break;
                case 'sauceBBQ': spanSouse.innerText = souse.nameBbq;
                    break;
                case 'sauceRikotta': spanSouse.innerText = souse.namePikotta;
                    break;
            }
        }
        //действие, если значение уже есть
        else {
            switch (id) {
                case "sauceClassic": spanSouse.innerText += ` + ${souse.nameKetchap}`;
                    break;
                case "sauceBBQ": spanSouse.innerText += ` + ${souse.nameBbq}`;
                    break;
                case "sauceRikotta": spanSouse.innerText += ` + ${souse.namePikotta}`;
                    break;
            }
        }
    }

    //==================================================
    //функция, которая создаёт и заполняет spanToping
    function createSpanToping(id) {
        spanToping = document.createElement('span');
        spanToping.id = 'spanToping';
        get('div.topings').append(spanToping);

        switch (id) {
            case 'moc1': spanToping.innerText = toping.nameCheeze;
                break;
            case 'moc2': spanToping.innerText = toping.nameFeta;
                break;
            case 'moc3': spanToping.innerText = toping.nameMozarella;
                break;
            case 'telya': spanToping.innerText = toping.nameMeat;
                break;
            case 'vetch1': spanToping.innerText = toping.nameTomato;
                break;
            case 'vetch2': spanToping.innerText = toping.nameMushrooms;
                break;
        }
    }

    //=================================================
    //функция, которая только заполняет spanSouse
    //при отсуствии значения
    function printSpanTopingFirstTime(id) {
        switch (id) {
            case 'moc1': spanToping.innerText = toping.nameCheeze;
                break;
            case 'moc2': spanToping.innerText = toping.nameFeta;
                break;
            case 'moc3': spanToping.innerText = toping.nameMozarella;
                break;
            case 'telya': spanToping.innerText = toping.nameMeat;
                break;
            case 'vetch1': spanToping.innerText = toping.nameTomato;
                break;
            case 'vetch2': spanToping.innerText = toping.nameMushrooms;
                break;
        }
    }

    //===================================================
    //функция, которая только заполняет spanSouse
    //при наличии значения
    function printSpanTopingNotFirstTime(id) {
        switch (id) {
            case "moc1": spanToping.innerText += ` + ${toping.nameCheeze}`;
                break;
            case "moc2": spanToping.innerText += ` + ${toping.nameFeta}`;
                break;
            case "moc3": spanToping.innerText += ` + ${toping.nameMozarella}`;
                break;
            case "telya": spanToping.innerText += ` + ${toping.nameMeat}`;
                break;
            case "vetch1": spanToping.innerText += ` + ${toping.nameTomato}`;
                break;
            case "vetch2": spanToping.innerText += ` + ${toping.nameMushrooms}`;
                break;
        }
    }

    //=====================================================
    //функция, которая обновляет цену
    function printPriceAgain(id) {
        let a = parseInt(spanPrice.innerText);

        switch (id) {
            case 'sauceClassic': spanPrice.innerText = a + souse.ketchapPrice + 'грн';
                break
            case 'sauceBBQ': spanPrice.innerText = a + souse.bbqPrice + 'грн';
                break;
            case 'sauceRikotta': spanPrice.innerText = a + souse.pikottaPrice + 'грн';
                break;

            case 'moc1': spanPrice.innerText = a + toping.cheezePrice + 'грн';
                break;
            case 'moc2': spanPrice.innerText = a + toping.fetaPrice + 'грн';
                break;
            case 'moc3': spanPrice.innerText = a + toping.motsarellaPrice + 'грн';
                break;
            case 'telya': spanPrice.innerText = a + toping.meatPrice + 'грн';
                break;
            case 'vetch1': spanPrice.innerText = a + toping.tomatoPrice + 'грн';
                break;
            case 'vetch2': spanPrice.innerText = a + toping.mushroomsPrice + 'грн';
                break;
        }
    }

    //============================================
    //функция для формы
    function formFunction() {

        //ищем элементы==============
        let resetButton = get('input[type="reset"]'),
            confirmButton = get('input[type="button"]');

        let [...inputsAll] = document.querySelectorAll('div.grid > input');
        let inputs = inputsAll.filter((it) => {
            if (it.type !== 'button' && it.type !== 'reset') {
                return it
            }
        })

        //создаём конструктор=================
        class User {
            constructor(name, tel, email) {
                this.userName = name;
                this.userPhone = tel;
                this.userEmail = email;
            }
        }
        //функция валидации===============
        function validate(itemTarget) {
            switch (itemTarget.type) {
                case 'text': return /^[A-z]{2,}$/i.test(itemTarget.value)
                    break;
                case 'tel': return /^\+38\d{10}$/.test(itemTarget.value)
                    break;
                case 'email': return /^([A-z0-9_\-\.]+)@([A-z0-9_\-\.]+)\.([a-z]+)$/.test(itemTarget.value)
                    break;
                default: alert("пожалуйста зарегестрируйтесь")
                    break;
            }
        }
        //event change==================
        inputs.forEach((it) => {
            it.addEventListener('change', (e) => {
                validate(e.target);
                //удаляем старый спан
                if (get('span.input-span')) {
                    get('span.input-span').remove()
                }
                //создаем спан при ошибке
                if (validate(e.target) !== true) {
                    let spanInput = document.createElement('span');
                    spanInput.className = 'input-span';
                    it.after(spanInput);
                    it.value = '';
                    //заполняем спан
                    switch (it.type) {
                        case 'text': spanInput.innerText = 'Введите имя правильно'
                            break;
                        case 'tel': spanInput.innerText = 'Введите номер правильно, +38.............'
                            break;
                        case 'email': spanInput.innerText = 'Введите email правильно'
                            break;
                        default:
                            break;
                    }
                }
            })
        })

        //кнопка confirm==========================
        confirmButton.addEventListener(`click`, () => {

            //создаём массив для результатов проверки validate (true or false)
            let res = inputs.map(item => validate(item));
            //если res содержит false, то выводим ошибку
            if (res.includes(false)) {
                alert(`erorr`)
            }
            //если true, отправляем даныые в localStorage и очищаем inputs
            else {
                let arreyForLocalStorage = [];
                arreyForLocalStorage.push(
                    new User(
                        ...inputs.map
                            (item => item.value)));
                localStorage.user = JSON.stringify(arreyForLocalStorage);

                inputs.forEach(item => item.value = ``)
            }
        });

        //кнопка reset=====================
        resetButton.addEventListener('click', () => {
            inputs.forEach(item => item.value = ``)
            if (get('span.input-span')) {
                get('span.input-span').remove()
            }
        })
    }

    //=============================================
    //функция для кнопки зныжка
    function discountFunction() {
        let div = get('div#banner')
        //кнопка убегает при наведении
        div.addEventListener('mouseover', () => {
            div.style.position = 'absolute'
            div.style.bottom = Math.floor(Math.random() * 80) + "%";
            div.style.right = Math.floor(Math.random() * 80) + "%";
        })
        //кнопка возвращается на место через 2 сек с помощью setTimeout
        div.addEventListener('mouseout', () => {
            setTimeout(() => {
                div.style.position = 'fixed'
                div.style.bottom = 2 + '%'
                div.style.right = 1 + '%'
            }, 2000)

        })
    }
})


