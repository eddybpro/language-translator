const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll('select');
const exchangeBtn = document.querySelector('.exchange');
const translateBtn = document.querySelector('button');
const icons = document.querySelectorAll('.row i');




selectTag.forEach((tag, id)=>{
   for (const country_code in countries) {
    let selected;
    if(id == 0 && country_code == "en-GB"){
        selected = 'selected';
    }else if(id == 1 && country_code == "ar-SA"){
        selected = 'selected';
    }
    let option =`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML('beforeend', option)
    }
  
});

exchangeBtn.addEventListener('click', ()=>{
    let tempText = fromText.value;
    let tempLang= selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
    fromText.value = toText.value;
    toText.value = tempText;
})

translateBtn.addEventListener('click', ()=>{
    let text = fromText.value;
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    if(!text)return;
    toText.setAttribute("placeholder", "Translating...");
    let apiURL =`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiURL).then(res=>res.json()).then(result=>{
        
        toText.value = result.responseData.translatedText;
    })
    toText.setAttribute("placeholder", "Translation");
})

icons.forEach(icon=>{
    icon.addEventListener('click', ({target})=>{
        if(target.classList.contains('fa-copy')){
            if(target.id == 'from'){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            let utterance;
            if(target.id == 'from'){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    })
})













































