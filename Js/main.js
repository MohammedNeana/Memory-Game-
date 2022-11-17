let startGame = document.querySelector('.control-buttons span'),
    name = document.querySelector('.name'),
    controlButtons = document.querySelector('.control-buttons')

startGame.addEventListener('click', _ => {
    let userName = prompt('Whats Your Name')
    userName == '' ? name.innerHTML = 'Unknown' : name.innerHTML = userName
    controlButtons.remove()
})
const duration = 1000,
    blockContainer = document.querySelector('.memory-game-blocks'),
    blocks = Array.from(blockContainer.children),
    orderRange = [...Array(blocks.length).keys()]

blocks.forEach((block) => {
    const i = Math.floor(Math.random(orderRange) * blocks.length);
    block.style.order = orderRange[i]
})