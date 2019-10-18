const utilities = require('./utilities');

describe('server utilities', () => {
  it('gets time elapsed from now', () => {
    expect(utilities.getDaysHoursFromNow(new Date()).toLowerCase()).toBe('just now');
  });
  
  it('gets time elapsed from invalid date', () => {
    expect(utilities.getDaysHoursFromNow('2019-10-12T00:37:07.150+00:00').toLowerCase()).toBe('illegal argument. must be a date object.');
  });
  
  it('gets the month of january', () => {
    expect(utilities.getMonthName(0).toLowerCase()).toBe('january');
  });
  
  it('gets the month of july', () => {
    expect(utilities.getMonthName(6).toLowerCase()).toBe('july');
  });
  
  it('passes negative integer to getMonthName fn', () => {
    expect(utilities.getMonthName(-1).toLowerCase()).toBe('illegal argument. must pass an integer between 0 - 11');
  });
  
  it('passes 12 to getMonthName fn', () => {
    expect(utilities.getMonthName(12).toLowerCase()).toBe('illegal argument. must pass an integer between 0 - 11');
  });
});
