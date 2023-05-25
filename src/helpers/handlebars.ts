import * as hbs from 'hbs';
hbs.registerHelper('contains', function (array: any[], value: any, options: any) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].client_nom === value) {
        return options.fn(this);
      }
    }
    return options.inverse(this);
  });
  