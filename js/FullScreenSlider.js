(() => {

  class FullScreenSlider extends HTMLElement {

    createdCallback(element){
			this.slides = this.querySelectorAll(":scope > *");
			this.classList.add('full-screen-slider');
      this.selected = 0;

			this.addClasses();
      this.createControls();
			this.createPager();
      this.selectSlide(this.selected);
			this.showLoader();
    }

		addClasses(){
      this.slides.forEach(slide => slide.classList.add('full-screen-slider__slide'))
		}

    createControls(){
      this.controls = {};
      this.createControl('pre');
      this.createControl('next');
    }

    createControl(direction){
      var control = document.createElement("button");
      control.classList.add("controll", "controll--" + direction);
      this.appendChild(control);

      control.addEventListener("click", function(direction) {
        let index = (direction == 'next') ? this.selected + 1 : this.selected - 1;
        this.selectSlide(index);
      }.bind(this, direction));

			this.controls[direction] = control;
    }

		createPager(){
      this.pager = document.createElement("pager-element");
      this.pager.classList.add('full-screen-slider__pager');
      this.pager.setAttribute('length', this.slides.length);
      this.pager.setAttribute('selected', this.selected);
      this.pager.addEventListener('page-changed', (e) => {
        this.selectSlide(e.data.selected);
      }, false);

			this.appendChild(this.pager);
		}

    selectSlide(index){
      this.classList.remove('full-screen-slider__slider' + this.selected);
      this.selected = index;
      this.classList.add('full-screen-slider__slider' + this.selected);

      this.setArrow();
      this.setPager();
      this.hideSlides();
      this.showSlide(index);
    }

    hideSlides(){
      this.slides.forEach((slide, index) => slide.classList.remove('full-screen-slider__slide--active') )
    }

    showSlide(index){
      this.slides[index].classList.add('full-screen-slider__slide--active');
    }

		setPager(){
      this.pager.setAttribute('selected', this.selected);
		}

		setArrow(){
			let preMethod = (this.selected === 0) ? 'add' : 'remove';
			let nextMethod = (this.selected === (this.slides.length - 1)) ? 'add' : 'remove';

			this.controls.pre.classList[preMethod]('controll--inactive');
			this.controls.next.classList[nextMethod]('controll--inactive');
		}

		showLoader(){
      this.loader = document.createElement("loader-element");
      this.appendChild(this.loader);
			this.loader.setAttribute('loading',  false);
		}
  }

	document.registerElement('full-screen-slider', FullScreenSlider);

})();
