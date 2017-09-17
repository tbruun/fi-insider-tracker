
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
    this._id = this.id;
  }

}

module.exports = TradeRecord;