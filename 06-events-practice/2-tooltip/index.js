class Tooltip {
  element;
  static instance;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }
  initialize() {
    this.initEventListeners();

  }
  onMouseOver = event => {
    const hoverElem = event.target.closest('[data-tooltip]');
    if(hoverElem) {
      this.render(hoverElem.dataset.tooltip);
      document.addEventListener('pointermove', this.onMouseMove);
    }
  }
  onMouseMove = event => {
    this.moveTooltip(event);
  }
  onMouseOut = event => {
    this.removeTooltip();
  }
  removeTooltip() {
    if (this.element) {
      this.element.remove();
      this.element = null;

      document.removeEventListener('pointermove', this.onMouseMove);
    }
  }
  moveTooltip({posTop = event.clientY, posLeft = event.clientX}) {
    this.element.style.top = `${posTop + 10}px`;
    if (posLeft > window.innerWidth - this.element.clientWidth) {
      this.element.style.left = `${posLeft - this.element.clientWidth}px`;
    } else {
      this.element.style.left = `${posLeft + 10}px`;
    }

  }
  render(msg) {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    this.element.innerHTML = msg;
    document.body.append(this.element);
  }
  initEventListeners() {
    document.addEventListener('pointerover', this.onMouseOver);
    document.addEventListener('pointerout', this.onMouseOut);
  }
  destroy() {
    document.removeEventListener('pointerover', this.onMouseOver);
    document.removeEventListener('pointerout', this.onMouseOut);
    this.removeTooltip();
  }
}

const tooltip = new Tooltip();

export default tooltip;
