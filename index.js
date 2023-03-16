import { catsData } from './data.js'

const emotionRadio = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModal = document.getElementById('meme-modal')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadio.addEventListener('change', highlightCheckedOption)
function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

getImageBtn.addEventListener('click', renderCat)
memeModalCloseBtn.addEventListener('click', () => {
    memeModal.style.display = 'none'
})


function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotionTag of cat.emotionTags){
            if (!emotionsArray.includes(emotionTag)){
                emotionsArray.push(emotionTag)
            }
        }
    }
    return emotionsArray
}

function getMatchingCatsAArray() {
    if (document.querySelector('input[type="radio"]:checked')){
        const checkedValue = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        const matchingCatsArray = catsData.filter(cat => {
            if (isGif) {
                return cat.emotionTags.includes(checkedValue) && cat.isGif
            } else {
                return cat.emotionTags.includes(checkedValue)
            }
        })
        return matchingCatsArray
    }
    
}

function getSingleCatsObject() {
    const catsArray = getMatchingCatsAArray()
    if (catsArray.length === 1) {
        return catsArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function renderCat() {
    const catObject = getSingleCatsObject()
    memeModalInner.innerHTML = `
    <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
    >`
    memeModal.style.display = 'flex'
}


function renderEmotionsRadio(cats) {
    let radioItem = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions) {
        radioItem += `
        <div class='radio'>
            <label for='${emotion}'>${emotion}</label>
            <input
                type='radio'
                id='${emotion}'
                value='${emotion}'
                name='emotions'
            >
        </div>`
    }
    emotionRadio.innerHTML = radioItem
}





renderEmotionsRadio(catsData)



// for of
// radio & checkbox inputs
// getElementsByClassName
// QuerySelector
// classList.remove
// import/export
// .includes()
// .filter()