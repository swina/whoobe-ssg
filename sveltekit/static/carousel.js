console.log ( 'loading carousel ...' )
console.log ( document.querySelector ('carousel') )
//		document.onload = () =>{
			const carousel = document.querySelector ( 'carousel' )
			if ( carousel ){
			//if ( carousel.length ){
				console.log ( carousel )
				const slides = carousel.querySelectorAll ( '.slide-content' )
				console.log ( slides )
				const btnPrev = carousel.querySelector ( '.carousel_prev' )
				const btnNext = carousel.querySelector ( '.carousel_next' )
                console.log ( btnPrev )
				var i = 0
				btnNext.addEventListener ( 'click' , (e) => {
                    console.log ( 'clicked ' , i )
                    slides.forEach ( (slide,index) => {
                        slide.classList.contains('hidden') ? null : slide.classList.add('hidden')
                        if ( index === (i+1) ){
                            slide.classList.remove('hidden')
                        }
                    })
					i++
				})
				btnPrev.addEventListener ( 'click' , (e) => {
					i--
					i > 0 ?
						selectSlide ( i , slides ) : null
				})
			}
//		}
	
		function selectSlide ( s , slides ){
			slides.forEach ( (slide,n) => {
				slide.classList.contains ( 'hidden' ) ?
					s === n ? slide.classList.remove ( 'hidden' ) : slide.classList.add('hidden' ) : slide.classList.add('hidden')
			})
		}