export default class NotificationMessage {
  element;
  static isActive = false;

  constructor(msg = '', {duration = 0, type = ''} = {}) {
    this.msg = msg;
    this.duration = duration;
    this.type = type;

    if (NotificationMessage.isActive) {
      NotificationMessage.element.remove();
    }
    this.getTamplate();
  }

  show(targetElem = document.body) {
    targetElem.append(this.getTamplate());
    NotificationMessage.isActive = true;
    setTimeout(() => this.remove(), this.duration);
  }
  getTamplate() {
    const notif = document.createElement('div');
    notif.innerHTML = `
         <div class="notification ${this.type}" style="--value:${parseInt((this.duration / 1000) % 60)}s">
          <div class="timer"></div>
          <div class="inner-wrapper">
            <div class="notification-header">${this.type}</div>
            <div class="notification-body">
              ${this.msg}
            </div>
          </div>
        </div>
      `;
    NotificationMessage.element = notif.firstElementChild;
    return this.element = notif.firstElementChild;
  }
  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // additionally needed to remove all listeners...
  }
}
