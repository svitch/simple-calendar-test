const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

class Calendar {
  constructor(el) {
    this.el = el;
    this.monthYearEl = this.el.querySelector('.date');
    this.prevEl = this.el.querySelector('.prev');
    this.nextEl = this.el.querySelector('.next');
    this.body = this.el.querySelector('.calendar-body');
    this.date = new Date();
    this.setListeners();
    this.updateCalendar();
    this.el.classList.add('loaded');
  }

  setListeners() {
    this.prevEl.addEventListener('click', event => this.changeMonth(event, false), false);
    this.nextEl.addEventListener('click', event => this.changeMonth(event, true), false);
  }

  changeMonth(event, next) {
    event.preventDefault();
    const { date } = this;
    const newMonth = next ? date.getMonth() + 1 : date.getMonth() - 1;
    this.date = new Date(date.setMonth(newMonth));
    this.updateCalendar();
  }

  buildDay(day, month = 0, isMain) {
    const monthName = months[month].substring(0, 3);
    const monthEl = day === 1 ? `<div class="month">${monthName}</div>` : '';
    return `<div class="day${isMain ? ' active-month' : ''}">${monthEl}${day}</div>`;
  }

  updateCalendar() {
    const currentYear = this.date.getFullYear();
    const currentMonth = this.date.getMonth();
    const firstDayIndex = this.date.getDay();
    const prevMonth = new Date(currentYear, currentMonth, 0).getMonth();
    const nextMonth = new Date(currentYear, currentMonth + 2, 0).getMonth();
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
    const lastDayIndex = new Date(currentYear, currentMonth + 1, 0).getDay();
    const nextDays = lastDayIndex === 0 ? 7 - lastDayIndex : 14 - lastDayIndex;
    let days = '';

    for (let i = firstDayIndex; i > 0; i--) {
      const value = prevLastDay - i + 1;
      days += this.buildDay(value, prevMonth, false);
    }

    for (let i = 1; i <= lastDay; i++) {
      days += this.buildDay(i, currentMonth, true);
    }

    for (let i = 1; i <= nextDays; i++) {
      days += this.buildDay(i, nextMonth, false);
    }

    this.monthYearEl.innerHTML = `${months[currentMonth]} ${currentYear}`;
    this.body.innerHTML = days;
  }
}

const calendarEl = document.querySelector('.calendar');
const calendarInstance = new Calendar(calendarEl);