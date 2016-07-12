class LoaderElement extends HTMLElement {

	constructor() {
		super();
	}

	createdCallback(){
		this.classList.add('loader-element');
		this.toggleVisibility();
	}

	toggleVisibility(){
		let isLoading = this.getAttribute('loading') == 'true';

		if(isLoading){
			this.showLoader();
		} else {
			this.hideLoader();
		}
	}

	showLoader(){
		this.innerHTML = '<div class="loader-element__background"></div>\
										  <div class="loader-element__element"></div>\
										  <p class="loader-element__text">\
											  <span class="loader-element__part1">Patience</span>\
											  <span class="loader-element__part2">Young padawan...</span>\
										  <p>';
	}

	hideLoader(){
		this.classList.add('loader-element--inactive');
	}

	attachedCallback(){
		setTimeout(() => {
			this.hideLoader();
		}, 2000);
	}

	attributeChangedCallback(attributeName, oldValue, newValue) {
		if(attributeName == 'loading'){
			this.toggleVisibility();
		}
	};

}
var loaderElement = document.registerElement("loader-element", LoaderElement);
