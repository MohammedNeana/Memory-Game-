let startGame = document.querySelector('.control-buttons span'),
    name = document.querySelector('.name'),
    controlButtons = document.querySelector('.control-buttons'),
    blockContainer = document.querySelector('.memory-game-blocks')

// ----------------------------- Dispaly Imgs -------------------------
const imgSrc = [
    ['../images/javascript.png', 'javascript'],
    ['../images/javascript.png', 'javascript'],
    ['./images/react.png', 'react'],
    ['./images/react.png', 'react'],
    ['../images/github.png', 'github'],
    ['../images/github.png', 'github'],
    ['../images/code.png', 'code'],
    ['../images/code.png', 'code'],
    ['../images/html5.png', 'html'],
    ['../images/html5.png', 'html'],
    ['../images/css3.png', 'css'],
    ['../images/css3.png', 'css'],
    ['../images/nodejs.png', 'nodejs'],
    ['../images/nodejs.png', 'nodejs'],
    ['../images/redux.png', 'redux'],
    ['../images/redux.png', 'redux'],
    ['../images/visual-studio-code.png', 'vs-code'],
    ['../images/visual-studio-code.png', 'vs-code'],
    ['../images/vuejs.png', 'vuejs'],
    ['../images/vuejs.png', 'vuejs'],
]

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
startGame.addEventListener('click', _ => {
    let userName = prompt('Whats Your Name')
    userName == '' ? name.innerHTML = 'Unknown' : name.innerHTML = userName
    controlButtons.remove()
})
const duration = 1000,
    blocks = Array.from(blockContainer.children),
    orderRange = [...Array(blocks.length).keys()]

blocks.forEach((block) => {
    const i = Math.floor(Math.random(orderRange) * blocks.length);
    block.style.order = orderRange[i]
})