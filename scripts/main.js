//? Variables

const countries = {
    "fi-FI": "Suomi",
    "pt-PT": "Portugalin",
    "en-GB": "Englanti"
}

const textIn = document.querySelector(".text-in");
const textOut = document.querySelector(".text-out");
const selectLang = document.querySelectorAll("select");
const toggle = document.querySelector(".toggle");
const translateBtn = document.querySelector("button");


//? Functions


// Choose language and defines default languages
selectLang.forEach((lang, id) => {
    for (const country in countries) {

       let selected;

       if(id == 0 && country == "pt-PT") {
        selected = "selected";
       } else if (id == 1 && country == "fi-FI") {
        selected = "selected";
       }

       let option = `<option value="${country}" ${selected}>${countries[country]}</option>`;

       lang.insertAdjacentHTML("beforeend", option);
    }
});



//? Events

// Switches languages and corresponding text
toggle.addEventListener("click", () => {

    let text = textIn.value;
    let lang = selectLang[0].value;

    textIn.value = textOut.value;
    selectLang[0].value = selectLang[1].value;
    textOut.value = text;
    selectLang[1].value = lang;
});

// Translates text
translateBtn.addEventListener("click", () => {

    let text = textIn.value;
    let translateFrom = selectLang[0].value;
    let translateTo = selectLang[1].value;
    
    // fetching API
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
       /*  console.log(data); */
        textOut.value = data.responseData.translatedText;
    });
});
