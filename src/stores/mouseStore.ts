type Events = {
  eventName: string;
  // eslint-disable-next-line no-unused-vars
  cb: (event: any) => void;
}

class MouseStore {
  private events: Events[] = [];

  private coords = { left: 0, top: 0 };

  private targetElement: EventTarget | null = null;

  public setTargetElement(el: EventTarget | null) {
    this.targetElement = el;
  }

  public handleMouseMove = (e: MouseEvent) => {
    this.setTargetElement(e.target);
    this.setCoords(e.clientX, e.clientY);
  };

  public setCoords(left: number, top: number) {
    this.coords = {
      left,
      top,
    };
  }

  public getCoords() {
    return this.coords;
  }

  public addEvent(eventName: string, cb: (e: any) => void) {
    window.addEventListener(eventName, cb);
    this.events.push({ eventName, cb });
  }

  public init() {
    this.addEvent('mousemove', this.handleMouseMove);
  }

  public destroy() {
    this.events.forEach((event) => {
      window.removeEventListener(event.eventName, event.cb);
    });
  }

  public getTargetElement() {
    return this.targetElement;
  }
}

export default new MouseStore();
