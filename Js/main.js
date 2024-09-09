const gameData = {
    technologies: [
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
    ],
    imgBasePath: '../images/', 
    duration: 1000,
    encryptionKey: 'hh@@##MM<3', 
  };
  
  const domElements = {
    startGameButton: document.querySelector('.control-buttons span'),
    playerName: document.querySelector('.name'),
    controlButtons: document.querySelector('.control-buttons'),
    blockContainer: document.querySelector('.memory-game-blocks'),
    triesElement: document.querySelector('.tries span'),
  };
  
  const gameLogic = {
    blocks: [],
    orderRange: [],
    originalToString: Function.toString, 

    async init() {
      await this.generateImageSources(); 
  
      this.displayImages();
      this.attachEventListeners();
      this.shuffleBlocks();
    },
  
    async generateImageSources() {
      const duplicatedTechnologies = gameData.technologies.concat(gameData.technologies);
  
      gameData.imageSources = await Promise.all(duplicatedTechnologies.map(async tech => {
        const base64ImageData = await this.loadImageAsBase64(`${gameData.imgBasePath}${tech}.png`);
        return [
          `data:image/png;base64,${base64ImageData}`, 
          this.encrypt(tech)
        ];
      }));
    },
  
    loadImageAsBase64(imageUrl) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL.split(',')[1]);
        };
        img.onerror = reject;
        img.src = imageUrl;
      });
    },
  
    displayImages() {
      const fragment = document.createDocumentFragment();
  
      for (const [src, encryptedTech] of gameData.imageSources) {
        const block = document.createElement('div');
        block.classList.add('game-block');
        block.dataset.encodedTech = encryptedTech;
  
        block.innerHTML = `
          <div class="face front"></div>
          <div class="face back">
            <img src="${src}" alt="${this.decrypt(encryptedTech)}"> 
          </div>
        `; 
  
        fragment.appendChild(block);
      }
  
      domElements.blockContainer.appendChild(fragment);
      this.blocks = Array.from(domElements.blockContainer.children);
      this.orderRange = [...Array(this.blocks.length).keys()];
  
      setTimeout(() => {
        for (const block of this.blocks) {
          block.addEventListener('click', () => this.flipBlock(block));
        }
      }, 100); 
    },
  
    attachEventListeners() {
      domElements.startGameButton.addEventListener('click', this.startGame.bind(this));
  
      document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
      });
    },
  
    startGame() {
      const userName = prompt('What\'s Your Name?') || 'Unknown';
      domElements.playerName.textContent = userName;
      domElements.controlButtons.remove();
    },
  
    shuffleBlocks() {
      for (const block of this.blocks) {
        const randomIndex = Math.floor(Math.random() * this.orderRange.length);
        block.style.order = this.orderRange[randomIndex];
      }
    },
  
    flipBlock(selectedBlock) {
      selectedBlock.classList.add('is-flipped');
  
      const allFlippedBlocks = this.blocks.filter(block => block.classList.contains('is-flipped'));
  
      if (allFlippedBlocks.length === 2) {
        this.stopClicking();
        this.checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
      }
    },
  
    stopClicking() {
      domElements.blockContainer.classList.add('no-clicking');
  
      setTimeout(() => {
        domElements.blockContainer.classList.remove('no-clicking');
      }, gameData.duration);
    },
  
    checkMatchedBlocks(firstBlock, secondBlock) {
      const firstTech = this.decrypt(firstBlock.dataset.encodedTech);
      const secondTech = this.decrypt(secondBlock.dataset.encodedTech);
  
      if (firstTech === secondTech) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
  
        document.getElementById('success').play();
  
        if (this.blocks.every(block => block.classList.contains('has-match'))) {

          setTimeout(() => {
            if (confirm('Congratulations! You won!\nDo you want to play again?')) {
              this.restartGame(); 
            }
          }, gameData.duration);
        }
  
        firstBlock.removeEventListener('click', () => this.flipBlock(firstBlock));
        secondBlock.removeEventListener('click', () => this.flipBlock(secondBlock));
  
      } else {
        domElements.triesElement.textContent = parseInt(domElements.triesElement.textContent, 10) + 1;
  
        document.getElementById('failed').play();
  
        setTimeout(() => {
          firstBlock.classList.remove('is-flipped');
          secondBlock.classList.remove('is-flipped');
        }, gameData.duration);
      }
    },
  
    restartGame() {
      domElements.triesElement.textContent = 0; 
  
      for (const block of this.blocks) {
        block.classList.remove('is-flipped', 'has-match');
        block.addEventListener('click', () => this.flipBlock(block));
      }
  
      this.shuffleBlocks();
    },
  
    encrypt(text) {
      let result = '';
      for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ gameData.encryptionKey.charCodeAt(i % gameData.encryptionKey.length));
      }
      return result;
    },
  
    decrypt(encryptedText) {
      return this.encrypt(encryptedText); 
    },
  };
  
  gameLogic.init();
