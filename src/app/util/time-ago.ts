import { Pipe } from "@angular/core";

@Pipe({
  name: 'timeAgo'
})
export class TimeAgo {
  private timer: number;
  constructor() {}
  public transformHoras(d: Date, now: Date) {
    this.removeTimer();
    /*
        console.log(now);
        console.log(now.getTime());
        console.log(d);
        console.log(d.getTime());*/
    let seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
    let minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(minutes / 60));
    return hours;
  }
  ngOnDestroy(): void {
    this.removeTimer();
  }
  private removeTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }
  private getSecondsUntilUpdate(seconds: number) {
    let min = 60;
    let hr = min * 60;
    let day = hr * 24;
    if (seconds < min) {
      // less than 1 min, update every 2 secs
      return 2;
    } else if (seconds < hr) {
      // less than an hour, update every 30 secs
      return 30;
    } else if (seconds < day) {
      // less then a day, update every 5 mins
      return 300;
    } else {
      // update every hour
      return 3600;
    }
  }
}
