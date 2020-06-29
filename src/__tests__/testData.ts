export const getVersionObj = {
  _declaration: { _attributes: { version: '1.0', encoding: 'ISO-8859-1' } },
  version: { _text: '1.25' },
};

export const getStateObj = {
  _declaration: { _attributes: { version: '1.0', encoding: 'ISO-8859-1' } },
  state: {
    device: {
      _attributes: {
        name: 'Sensor EG',
        ise_id: '1481',
        unreach: 'false',
        sticky_unreach: 'true',
        config_pending: 'false',
      },
      channel: [
        {
          _attributes: { name: 'Sensor EG :0', ise_id: '1482' },
          datapoint: [
            {
              _attributes: {
                name: 'BidCos-RF.JEQ0122242:0.UNREACH',
                type: 'UNREACH',
                ise_id: '1497',
                value: 'false',
                valuetype: '2',
                valueunit: '',
                timestamp: '1592083691',
              },
            },
            {
              _attributes: {
                name: 'BidCos-RF.JEQ0122242:0.STICKY_UNREACH',
                type: 'STICKY_UNREACH',
                ise_id: '1493',
                value: 'true',
                valuetype: '2',
                valueunit: '',
                timestamp: '1592083671',
              },
            },
            {
              _attributes: {
                name: 'BidCos-RF.JEQ0122242:0.CONFIG_PENDING',
                type: 'CONFIG_PENDING',
                ise_id: '1483',
                value: 'false',
                valuetype: '2',
                valueunit: '',
                timestamp: '1592648299',
              },
            },
            {
              _attributes: {
                name: 'BidCos-RF.JEQ0122242:0.LOWBAT',
                type: 'LOWBAT',
                ise_id: '1487',
                value: 'false',
                valuetype: '2',
                valueunit: '',
                timestamp: '1588754863',
              },
            },
          ],
        },
        {
          _attributes: { name: 'Sensor.EG.Kueche', ise_id: '1501' },
          datapoint: [
            {
              _attributes: {
                name: 'BidCos-RF.JEQ0122242:1.TEMPERATURE',
                type: 'TEMPERATURE',
                ise_id: '1503',
                value: '24.200000',
                valuetype: '4',
                valueunit: '°C',
                timestamp: '1593465661',
              },
            },
            {
              _attributes: {
                name: 'BidCos-RF.JEQ0122242:1.HUMIDITY',
                type: 'HUMIDITY',
                ise_id: '1502',
                value: '54',
                valuetype: '16',
                valueunit: '%',
                timestamp: '1593465661',
              },
            },
          ],
        },
      ],
    },
  },
};
