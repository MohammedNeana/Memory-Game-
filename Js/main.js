let startGame = document.querySelector('.control-buttons span'),
    name = document.querySelector('.name'),
    controlButtons = document.querySelector('.control-buttons'),
    blockContainer = document.querySelector('.memory-game-blocks'),
    imgSrc = [],
    duration = 1000,
    blocks = Array.from(blockContainer.children),
    orderRange = [...Array(blocks.length).keys()]

// ------------------------------------ Dispaly Img Src Breakpoint ---------------------------
const arr = [
    'react',
    'javascript',
    'github',
    'code',
    'html5',
    'css3',
    'nodejs',
    'redux',
    'visual-studio-code',
    'vuejs',
    'react',
    'javascript',
    'github',
    'code',
    'html5',
    'css3',
    'nodejs',
    'redux',
    'visual-studio-code',
    'vuejs'
]
// ---------------------------- Getting Img Src And Repeat Array Values ---------------------
function getImgSrc(arr) {
    const src = arr.map(arr => imgSrc.push([`../images/${arr}.png`, arr]))
}
getImgSrc(arr)
// console.log(arr.join(' ').repeat(2));
// ------------------------------- Display Imgs in DOM --------------------------------------
function dispayImgs() {
    let container = '';
    imgSrc.map(data =>
        container += `<div class="game-block" data-technology=${data[1]}>
                <div class="face front"></div>
                <div class="face back">
                    <img src=${data[0]} alt="">
                </div>
            </div>`
    )
    blockContainer.innerHTML = container
}
dispayImgs()
// ------------------------------- Display UserName and Main Screen ------------------------
startGame.addEventListener('click', _ => {
    let userName = prompt('Whats Your Name')
    userName == '' ? name.innerHTML = 'Unknown' : name.innerHTML = userName
    controlButtons.remove()
})
// ------------------------------ Add The Order Css Property ------------------------------
blocks.forEach((block) => {
    const i = Math.floor(Math.random(orderRange) * blocks.length);
    block.style.order = orderRange[i]
})