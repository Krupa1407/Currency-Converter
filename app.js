const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';

const dropdowns = document.querySelectorAll('.dropdown select');
const btnExchange = document.querySelector('.btnExchange');

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", ()=> {
    updateExchangeRate();
})

for(let select of dropdowns){
    for (code in countryList) {
        // console.log(code,  countryList[code]);
        let option = document.createElement('option');
        option.innerText = code;
        option.value = code;
        select.append(option);
        if(select.name === "from" && code === "USD"){
            option.selected=true;
        }
        else if(select.name === "to" && code === "INR"){
            option.selected = true;
        }
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let code = element.value;
    // console.log(code);
    let countryCode = countryList[code];
    // console.log(countryCode);
    let imgUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flagImg = element.parentElement.querySelector("img");
    // console.log(flagImg);
    flagImg.src = imgUrl;
}

btnExchange.addEventListener("click", (event)=>{
    event.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async()=> {
    let amount = document.querySelector("input");
    let amountValue = amount.value;
    console.log(amountValue);
    if(amountValue === "" || amountValue <= 0){
        amountValue = 1;
        amount.value = 1
    }

    console.log(fromCurr.value, toCurr.value)
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    console.log(data);
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);
    msg.innerText = `${amountValue} ${fromCurr.value} = ${rate*amountValue} ${toCurr.value}`;
}