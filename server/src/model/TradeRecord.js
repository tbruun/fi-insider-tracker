const moment = require('moment');
const get = require('lodash.get');

class TradeRecord {
  constructor(fromCsv) {
    this.date = new Date(fromCsv['Publicerings datum']);
    this.name = fromCsv['Person i ledande ställning'];
    this.issuer = fromCsv['Utgivare'];
    this.leiCode = fromCsv['LEI-kod'];
    this.reporter = fromCsv['Anmälningsskyldig']
    this.role = fromCsv['Befattning'];
    this.relative = fromCsv['Närstående'];
    this.stockOption = fromCsv['Är kopplad till aktieprogram'];
    this.transaction = {
      type: fromCsv['Karaktär'],
      instrument: fromCsv['Instrument'],
      ISIN: fromCsv['ISIN'],
      date: new Date(fromCsv['Transaktions datum']),
      volume: fromCsv['Volym'],
      unit: fromCsv['Volymsenhet'],
      price: fromCsv['Pris'],
      currency: fromCsv['Valuta'],
      exchange: fromCsv['Handelsplats'],
      status: fromCsv['Status'],
      firstTransaction: fromCsv['Är förstagångsrapportering'] === 'Ja'
    };
    this.correction =  {
      correction: fromCsv['Korrigering'],
      description: fromCsv['Beskrivning av korrigering']
    };
    this.id = `${this.date.valueOf()}-${this.transaction.volume}-${this.transaction.price}`
  }

}

const getDate = (date) => {
  try {
    return moment(date).format('LL')
  } catch (e) {
    return 'N/A';
  }
};

TradeRecord.stringify = (tradeRecord) => {
  return `
    <b>${get(tradeRecord, 'transaction.type', 'N/A').toUpperCase()}</b>: ${get(tradeRecord, 'transaction.volume')} Aktier.<br/>
    <b>Pris:</b> ${get(tradeRecord, 'transaction.price')} ${get(tradeRecord, 'transaction.currency')}. <br/>
    <b>Publiceringsdatum:</b> ${getDate(tradeRecord.date)} <br/>
    <b>Transaktionsdatum:</b> ${getDate(tradeRecord.transaction.date)} <br/>
    <b>Status:</b> ${get(tradeRecord, 'transaction.status')}
  `
};

module.exports = TradeRecord;