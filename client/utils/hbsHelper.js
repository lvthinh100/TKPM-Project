const moment = require("moment");

module.exports = {
  formatDate: (date) => {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
  },
  formatFUllDate: (date) => {
    return moment(date).format("hh:mm:ss A, DD-MM-YYYY");
  },
  formatCurrency: (amount) => {
    amount = amount.replace('$', '');
    amount = amount.replace(',','');
    amount = amount.replace('.', '')
    if(typeof(amount)=='string')
    {
      try{
        //console.log(amount);
        var valueAmount = parseFloat(amount)*10;
        //console.log(valueAmount);
      }
      catch(err){

      }
    }
    return valueAmount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  },
};

