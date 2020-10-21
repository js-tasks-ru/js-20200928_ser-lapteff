export default class DoubleSlider {
  element;

  constructor() {
    this.render();
  }
  render() {
    const wrap = document.createElement('div');
    wrap.innerHTML = `<div class="range-slider">
      <span>$10</span>
      <div class="range-slider__inner">
        <span class="range-slider__progress"></span>
        <span class="range-slider__thumb-left"></span>
        <span class="range-slider__thumb-right"></span>
      </div>
      <span>$100</span>
    </div>`;

    this.element = wrap.firstElementChild;
    this.initEventListeners();
  }
  initEventListeners() {
    this.element.addEventListener('mousedown', this.onMousedown);

  }
  onMousedown = event => {
    const tumbLeft = event.target.closest('.range-slider__thumb-left');
    const tumbRight = event.target.closest('.range-slider__thumb-right');
    const rangeInner = this.element.querySelector('.range-slider__inner');
    console.log(tumbLeft)
    if (tumbLeft) {
      let shiftX = event.clientX - tumbLeft.getBoundingClientRect().left;
      console.log(event.clientX)
      // tumbLeft.style.position = 'absolute';
      tumbLeft.style.zIndex = 1;
      rangeInner.append(tumbLeft);
      // tumbLeft.style.left = `${event.pageX - shiftX}px`;
      function onMouseMoveLeft({pageX = event.clientX})  {
        // this.moveTooltip(thumb, event);
        tumbLeft.style.left = `${pageX}%`;

      }
      tumbLeft.addEventListener('mousemove', onMouseMoveLeft);

      tumbLeft.onmouseup = function() {
        tumbLeft.removeEventListener('mousemove', onMouseMoveLeft);
        tumbLeft.onmouseup = null;

        console.log('tumbLeft')
      };
      tumbLeft.ondragstart = function() {
        return false;
      };
    }
    tumbLeft.addEventListener('mousemove', this.onDragStart);
  }
  onDragStart = event => {
    return false;
  }
  // moveTooltip(thumb, { posLeft = event.clientX}) {
  //   thumb.style.left = `${posLeft + 10}px`;
  //   console.log(thumb)
  // }
  // ball.onmousedown = function(event) {
  //
  //   let shiftX = event.clientX - ball.getBoundingClientRect().left;
  //   let shiftY = event.clientY - ball.getBoundingClientRect().top;
  //
  //   ball.style.position = 'absolute';
  //   ball.style.zIndex = 1000;
  //   document.body.append(ball);
  //
  //   moveAt(event.pageX, event.pageY);
  //
  //   // переносит мяч на координаты (pageX, pageY),
  //   // дополнительно учитывая изначальный сдвиг относительно указателя мыши
  //   function moveAt(pageX, pageY) {
  //     ball.style.left = pageX - shiftX + 'px';
  //     ball.style.top = pageY - shiftY + 'px';
  //   }
  //
  //   function onMouseMove(event) {
  //     moveAt(event.pageX, event.pageY);
  //   }
  //
  //   // передвигаем мяч при событии mousemove
  //   document.addEventListener('mousemove', onMouseMove);
  //
  //   // отпустить мяч, удалить ненужные обработчики
  //   ball.onmouseup = function() {
  //     document.removeEventListener('mousemove', onMouseMove);
  //     ball.onmouseup = null;
  //   };
  //
  // };
  //
  // ball.ondragstart = function() {
  //   return false;
  // };

}
