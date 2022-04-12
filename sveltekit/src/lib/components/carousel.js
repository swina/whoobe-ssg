export function carousel (){
    const carousel = document.querySelector ( 'carousel' )
    const slides = carousel.querySelectorAll ( '.slide-content' )
    console.log ( slides )
    const btnPrev = carousel.querySelector ( '.carousel_prev' )
    const btnNext = carousel.querySelector ( '.carousel_next' )
    var i = 0
    btnNext.addEventListener ( 'click' , (e) => {
        i++
        i < slides.length -1 ?
            selectSlide ( i , slides ) : null
    })
    btnPrev.addEventListener ( 'click' , (e) => {
        i--
        i > 0 ?
            selectSlide ( i , slides ) : null
    })
}

function selectSlide ( s , slides ){
    slides.forEach ( (slide,n) => {
        slide.classList.contains ( 'hidden' ) ?
            s === n ? slide.classList.remove ( 'hidden' ) : slide.classList.add('hidden' ) : slide.classList.add('hidden')
    })
}