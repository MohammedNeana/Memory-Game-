let startGame = document.querySelector('.control-buttons span'),
    name = document.querySelector('.name'),
    controlButtons = document.querySelector('.control-buttons')

startGame.addEventListener('click', _ => {
    let userName = prompt('Whats Your Name')
    userName == '' ? name.innerHTML = 'Unknown' : name.innerHTML = userName
    controlButtons.remove()
})
