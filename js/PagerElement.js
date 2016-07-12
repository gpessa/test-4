(() => {

  class PagerElement extends HTMLElement {

    constructor() {
      super();
    }

    createdCallback() {
      this.classList.add('pager-element');
      let selected = this.getAttribute('selected');

      this.createPager();
      this.selectPage(selected);
    }

    createPager() {
      this.pages = [];
      let pager = document.createElement("ul");
      pager.classList.add('pager-element__list');

      let lenght = this.getAttribute('length');
      for (let i = 0; i < lenght; i++) {
        let li, a;

        li = document.createElement('li');
        li.classList.add('pager-element__item');

        a = document.createElement('a');
        a.innerHTML = '&nbsp;';
        a.classList.add('pager-element__link');

        li.appendChild(a);

        a.addEventListener('click', () => {
          this.selectPage(i);
          this.sendEvent(i);
        });

        this.pages.push(li);
        pager.appendChild(li);
      }
      this.appendChild(pager);
    }

    selectPage(index) {
      index = parseInt(index);
      this.pages.forEach(page => page.classList.remove('pager-element__item--active'));
      this.pages[index].classList.add('pager-element__item--active');
    }

    sendEvent(index) {
      let event;
      event = new Event('page-changed');
      event.data = {};
      event.data.selected = index;

      this.dispatchEvent(event);
    }

    attributeChangedCallback(attr, oldVal, newVal) {
      if (attr === 'selected') {
        this.selectPage(newVal);
      }
    }
  }

  document.registerElement('pager-element', PagerElement);

})();
