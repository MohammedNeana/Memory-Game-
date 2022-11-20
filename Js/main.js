// ------------------------- Constants -----------------------------------------------------
const startGame = document.querySelector('.control-buttons span'),
    name = document.querySelector('.name'),
    controlButtons = document.querySelector('.control-buttons'),
    blockContainer = document.querySelector('.memory-game-blocks'),
    imgSrc = []

// ----------------------------------- Dispaly Img Src Breakpoint ---------------------------
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
// ------------------------- Constants -----------------------------------------------------
const duration = 500,
    blocks = Array.from(blockContainer.children),
    orderRange = [...Array(blocks.length).keys()]
// ------------------------------- Display UserName and Main Screen ------------------------
startGame.addEventListener('click', _ => {
    let userName = prompt('Whats Your Name')
    userName == '' ? name.innerHTML = 'Unknown' : name.innerHTML = userName
    controlButtons.remove()
})
// ------------------------------- Add The Order Css Property ------------------------------
blocks.forEach((block) => {
    const i = Math.floor(Math.random(orderRange) * blocks.length);
    block.style.order = orderRange[i]
    block.addEventListener('click', () => {
        flipBlock(block)
    })
})
// ------------------------------ Flip Block Function --------------------------------------
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped')
    const allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'))
    if (allFlippedBlocks.length === 2) {
        stopClicking()
        checkMatechedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
    }
}
// ------------------------------- Stop Clicking Function ----------------------------------- 
function stopClicking() {
    blockContainer.classList.add('no-clicking')
    setTimeout(() => {
        blockContainer.classList.remove('no-clicking')
    }, duration);
}
// ------------------------------- Check Matched Blocks -------------------------------------
function checkMatechedBlocks(firstBlock, secondBlock) {
    const triesElement = document.querySelector('.tries span')
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped')
        secondBlock.classList.remove('is-flipped')
        firstBlock.classList.add('has-match')
        secondBlock.classList.add('has-match')
        document.querySelector('#success').play()
    } else {
        triesElement.innerHTML = + triesElement.innerHTML + 1
        document.querySelector('#failed').play()
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped')
            secondBlock.classList.remove('is-flipped')
        },duration)
    }
}