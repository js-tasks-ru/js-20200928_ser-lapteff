import fetchJson from './utils/fetch-json.js';

const mainUrl = 'https://course-js.javascript.ru';

export default class ColumnChart {
  element;
  constructor({
    label = '',
    link = '',
    formatHeading = data => data,
    url = '',
    range = {
      from: new Date(),
      to: new Date(),
    }
  } = {}) {
    this.url = new URL(url, mainUrl);

    this.range = range;
    this.label = label;
    this.link = link;
    this.formatHeading = formatHeading;

    this.chartHeight = 50;

    this.render();
    this.getData(this.range.from, this.range.to);
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
            <div data-element="header" class="column-chart__header"></div>
            <div data-element="body" class="column-chart__chart"></div>
          </div>
      `;

    this.element = column;
    this.subElements = this.getSubElements(this.element);
  }
  async getData(rangeFrom, rangeTo) {

    this.url.searchParams.set('from', rangeFrom.toISOString()); // url = https://google.com + ?from=decodeURIComponent(...)
    this.url.searchParams.set('to', rangeTo.toISOString());

    const response = await fetchJson(this.url);
    // console.log(response)
    this.subElements.header.innerHTML = this.getHeaderValue(response, this.formatHeading);
    this.subElements.body.innerHTML = this.getColumnItems(response);
    this.element.classList.remove('column-chart_loading');
  }
  getHeaderValue(data, format) {
    const values = Object.values(data);
    const value = values.reduce((a, b) => a + b);
    return format ? format(value) : value;
  }
  getColumnItems(data) {

    const values = Object.values(data);
    if (data && values.length) {
      const maxValue = Math.max(...values);
      const scale = this.chartHeight / maxValue;
      return [...values].reduce((accumulator, currentValue) => {
        const percent = (currentValue / maxValue * 100).toFixed(0);
        return `${accumulator} <div style="--value: ${Math.floor(currentValue * scale)}" data-tooltip="${percent}%"></div>`;
      }, '');
    }
  }
  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }
  update(rangeFrom, rangeTo) {
    return this.getData(rangeFrom, rangeTo);
  }
  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
  }
}
