// RealmDB SCHEMAs
export const RECORD_SCHEMA = {
    name: 'Record',
    primaryKey: 'date',
    properties: {
      date: 'string',
      startKM: {type: 'int', default: 0},
      endKM: {type: 'int', default: 0},
      curGasPrice: {type: 'float', default: 0.0},
      shiftEarn: {type: 'float', default: 0.0},
      profitCalculated: {type: 'float', default: 0.0}
    }
  };

