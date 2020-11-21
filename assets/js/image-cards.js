class ImageCards {
  constructor () {
    this.cardsContainer = document.getElementById('image-cards-container')
    this.cardsColumns = {
      first: document.getElementById('image-cards-column-1'),
      second: document.getElementById('image-cards-column-2')
    }
    this.cardsColumnAlternator = 'first'
  }
  addImageCard(FileInformation) {
    var card = document.createElement('div')
    card.classList.add('card')
    this.cardsColumns[this.cardsColumnAlternator].appendChild(card)
    this.cardsColumns[this.cardsColumnAlternator].appendChild(document.createElement('br'))
    switch (this.cardsColumnAlternator) {
      case 'first':
        this.cardsColumnAlternator = 'second'
        break
      case 'second':
        this.cardsColumnAlternator = 'first'
        break
    }
  
    var cardImage = document.createElement('div')
    cardImage.classList.add('card-image')
    card.appendChild(cardImage)
  
    var cardImageFigure = document.createElement('figure')
    cardImageFigure.classList.add('image')
    cardImage.appendChild(cardImageFigure)
  
    var cardImageFigureImg = document.createElement('img')
    cardImageFigureImg.src = api.get_root_img(FileInformation.FileID)
    cardImageFigureImg.alt = FileInformation.FileDescription
    cardImageFigure.appendChild(cardImageFigureImg)
  
    var cardContent = document.createElement('div')
    cardContent.classList.add('card-content')
    cardContent.innerText = FileInformation.FileDescription
    card.appendChild(cardContent)
  
    var cardFooter = document.createElement('footer')
    cardFooter.classList.add('card-footer')
    card.appendChild(cardFooter)
  
    var cardFooterEmbed = document.createElement('a')
    cardFooterEmbed.classList.add('card-footer-item')
    cardFooterEmbed.href = api.get_root_embed(FileInformation.FileID)
    cardFooterEmbed.target = '_blank'
    cardFooterEmbed.innerHTML = `
      <span class="icon">
        <i class="fas fa-expand"></i>
      </span>
    `
    cardFooter.appendChild(cardFooterEmbed)
  
    var cardFooterShare = document.createElement('a')
    cardFooterShare.classList.add('card-footer-item')
    cardFooterShare.innerHTML = `
        <span class="icon">
          <i class="fas fa-share-alt"></i>
        </span>
      `
    if (navigator.share) {
      cardFooterShare.onclick = function () {
        navigator.share({url: api.get_root_embed(FileInformation.FileID)})
      }
    } else {
      cardFooterShare.classList.add('has-text-dark')
    }
    cardFooter.appendChild(cardFooterShare)
  }
}