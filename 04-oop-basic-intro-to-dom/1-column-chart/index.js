export default class ColumnChart {
  element;
  constructor(obj) {
    if (obj) {
      this.data = obj.data;
      this.label = obj.label;
      this.value = obj.value;
      this.link = obj.link;
    }
    this.chartHeight = 50;
    this.render();
    this.getLoaded();
  }

  render() {
    const column = document.createElement('div');
    column.className = 'column-chart column-chart_loading';

    column.setAttribute('style', `--chart-height: ${this.chartHeight}`);
    const columnLink = this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';

    column.innerHTML = `
          <div class="column-chart__title">
            Total ${this.label + columnLink}
          </div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.value}</div>
            <div data-element="body" class="column-chart__chart">
                ${this.getColumnItems(this.data)}
            </div>
          </div>
      `;

    this.element = column;
  }
  getLoaded() {
    if (this.data && this.data.length) this.element.classList.remove('column-chart_loading');
  }
  getColumnItems(data) {
    if (data && data.length) {
      const maxValue = Math.max(...data);
      const scale = this.chartHeight / maxValue;

      return  data.reduce((accumulator, currentValue) => {
        const percent = (currentValue / maxValue * 100).toFixed(0);
        return `${accumulator} <div style="--value: ${Math.floor(currentValue * scale)}" data-tooltip="${percent}%"></div>`
      }, '');
    }
  }
  update(data) {
    this.getColumnItems(data);
  }
  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
  }
}
