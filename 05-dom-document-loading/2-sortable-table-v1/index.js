export default class SortableTable {
  element;

  constructor(header = [], {data = []} = {}) {
    this.header = header;
    this.data = data;

    this.renderComponetTemplate();
    this.getTemplateBody(this.data);
  }
  sort(fieldValue, orderValue = 'asc') {
    let newArr = [...this.data];
    newArr.sort( (a, b) => {
      let curValue = a[fieldValue];
      let nextValue = b[fieldValue];
      switch (orderValue) {
        case 'desc':
          if (fieldValue !== "title") {
            return Number(nextValue) - Number(curValue);
          } else {
            return -1 * curValue.toString().localeCompare(nextValue, ['ru', 'en'], {caseFirst: 'upper'});
          }
        case 'asc':
        default:
          if (fieldValue !== "title") {
            return Number(curValue) - Number(nextValue);
          } else {
            return 1 * curValue.toString().localeCompare(nextValue, ['ru', 'en'], {caseFirst: 'upper'});
          }
      }
    });
    return this.getTemplateBody(newArr);
  }

  getTamplateHeader(headers) {
    if (headers && headers.length) {
      const headerColumn = headers.map((elem) => {
        if (elem.template) {
          return elem.template();
        } else {
          return `
            <div class="sortable-table__cell" data-id="${elem.id}" data-sortable="${elem.sortable}">
              <span>${elem.title}</span>
            </div>
          `;
        }
      }).join('');
      return `
        <div data-element="header" class="sortable-table__header sortable-table__row">
            ${headerColumn}
        </div>
      `;
    }
  }
  getTemplateBody(data) {
    if (data && data.length) {
      const tableRows = data.map((elem) => {
        return `<a href="/products/${elem.id}" class="sortable-table__row">
            ${this.header.map(
          item => {
            return (item.template) ? item.template(elem[item.id]) : `<div class="sortable-table__cell">${elem[item.id]}</div>`
          }
        ).join('')}
          </a>
        `;
      }).join('');
      const tableBody = this.element.querySelector('.sortable-table__body');

      this.subElements = this.getSubElements(this.element);
      return tableBody.innerHTML = tableRows;
    }
  }

  renderComponetTemplate() {
    const container = document.createElement('div');

    container.innerHTML = `
      <div data-element="productsContainer" class="products-list__container">
          <div class="sortable-table">
          ${this.getTamplateHeader(this.header)}
        <div data-element="body" class="sortable-table__body"></div>
        </div>
      </div>
    `;
    this.element = container.firstElementChild;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((acc, item) => {
      acc[item.dataset.element] = item;
      return acc;
    }, {});
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}
