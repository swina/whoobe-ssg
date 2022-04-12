	
console.log ( 'loading carousel ...' )
			const carousel = document.querySelector ( 'carousel' )
			if ( carousel ){
			//if ( carousel.length ){
				console.log ( carousel )
				const slides = carousel.querySelectorAll ( '.slide-content' )
				console.log ( slides )
				const btnPrev = carousel.querySelector ( '.carousel_prev' )
				const btnNext = carousel.querySelector ( '.carousel_next' )
				const tabs = carousel.querySelectorAll('.carousel_tab')
                console.log ( tabs )
				var i = 0

				if ( btnNext ){
					btnNext.addEventListener ( 'click' , (e) => {

						if ( i < slides.length - 1 ){
							i++
							console.log ( 'clicked ' , i )
							slides.forEach ( (slide,index) => {
								slide.classList.contains('hidden') ? null : slide.classList.add('hidden')
								if ( index === (i) ){
									slide.classList.remove('hidden')
								}
							})
						}
					})
				}

				if ( btnPrev ){
					btnPrev.addEventListener ( 'click' , (e) => {
						if ( i > 0 ){
							i--
							slides.forEach ( (slide,index) => {
								slide.classList.contains('hidden') ? null : slide.classList.add('hidden')
								if ( index === (i) ){
									slide.classList.remove('hidden')
								}
							})
						}
					})
				}

				if ( tabs ){
					tabs.forEach ( (tab,index) => {
						//setTabCss ( tabs , i , tab )
						tab.addEventListener ( 'click' , (e) => {
							let current = tab.getAttribute('data-tab')
							setTabCss ( tabs , current , tab )
							selectSlide(current,slides)
						})
					})
				}
			}
		
		function setTabCss (  tabs, current , tab ){
			let css = tab.getAttribute('data-css').split(' ').filter(a=>a)
			let cssActive = tab.getAttribute('data-css-active').split(' ').filter(a=>a)
			tabs.forEach ( (tab,index) => {
				if ( index === parseInt(current) ){
					css.forEach ( cl => {
						tab.classList.remove(cl)
					})
					cssActive.forEach ( cl => {
						tab.classList.add ( cl )
					})
				} else {
					cssActive.forEach ( cl => {
						tab.classList.remove ( cl )
					})
					css.forEach ( cl => {
						tab.classList.add ( cl )
					})
				}
			})
		}

		function selectSlide ( s , slides ){
			slides.forEach ( (slide,index) => {
				if ( index === parseInt(s) ){
					console.log ( 'visualize => ' , s , slides )
					slide.classList.remove('hidden')
				} else {
					slide.classList.contains('hidden') ? null : slide.classList.add('hidden')
				}
			})

			// slides.forEach ( (slide,n) => {
			// 	slide.classList.contains ( 'hidden' ) ?
			// 		s === n ? slide.classList.remove ( 'hidden' ) : slide.classList.add('hidden' ) : slide.classList.add('hidden')
			// })
		}