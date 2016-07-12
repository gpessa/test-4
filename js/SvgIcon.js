(() => {

  class SvgIcon extends HTMLElement {

    constructor() {
      super();
    }

    createdCallback(){
      this.classList.add('svg-icon');
      this.getIcon();
    }

    getIcon(){
      let url, xhr;

  		url = this.getAttribute('url');
  		xhr = new XMLHttpRequest();
  		xhr.open('GET', url);
  		xhr.send(null);
  		xhr.onreadystatechange =  () => {
  		  if (xhr.readyState === 4 && xhr.status === 200) {
  				let xmlString = xhr.responseText
  				, parser = new DOMParser()
  				, doc = parser.parseFromString(xmlString, "text/xml")
  				, svg = doc.querySelector('svg');
  				this.appendChild(svg);
  		  }
  		}
    }
  }

	document.registerElement('svg-icon', SvgIcon);

})();
