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

export const getStateListObj = {
  _declaration: { _attributes: { version: '1.0', encoding: 'ISO-8859-1' } },
  stateList: {
    device: [
      {
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
      {
        _attributes: {
          name: 'Fenster EG',
          ise_id: '6911',
          unreach: 'false',
          sticky_unreach: 'false',
          config_pending: 'false',
        },
        channel: [
          {
            _attributes: { name: 'Fenster:0', ise_id: '6912', index: '0', visible: '', operate: '' },
            datapoint: [
              {
                _attributes: {
                  name: 'BidCos-RF.LEQ1175412:0.UNREACH',
                  type: 'UNREACH',
                  ise_id: '6932',
                  value: 'false',
                  valuetype: '2',
                  valueunit: '',
                  timestamp: '1592648296',
                  operations: '5',
                },
              },
              {
                _attributes: {
                  name: 'BidCos-RF.LEQ1175412:0.STICKY_UNREACH',
                  type: 'STICKY_UNREACH',
                  ise_id: '6928',
                  value: 'false',
                  valuetype: '2',
                  valueunit: '',
                  timestamp: '1592648296',
                  operations: '7',
                },
              },
              {
                _attributes: {
                  name: 'BidCos-RF.LEQ1175412:0.CONFIG_PENDING',
                  type: 'CONFIG_PENDING',
                  ise_id: '6914',
                  value: 'false',
                  valuetype: '2',
                  valueunit: '',
                  timestamp: '1592648296',
                  operations: '5',
                },
              },
              {
                _attributes: {
                  name: 'BidCos-RF.LEQ1175412:0.LOWBAT',
                  type: 'LOWBAT',
                  ise_id: '6922',
                  value: 'false',
                  valuetype: '2',
                  valueunit: '',
                  timestamp: '1592648296',
                  operations: '5',
                },
              },
            ],
          },
          {
            _attributes: {
              name: 'Fenster 1',
              ise_id: '6940',
              index: '1',
              visible: 'true',
              operate: 'true',
            },
            datapoint: [
              {
                _attributes: {
                  name: 'BidCos-RF.LEQ1175412:1.STATE',
                  type: 'STATE',
                  ise_id: '6965',
                  value: 'true',
                  valuetype: '2',
                  valueunit: '',
                  timestamp: '1593490676',
                  operations: '5',
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const getSysVarListObj = {
  _declaration: { _attributes: { version: '1.0', encoding: 'ISO-8859-1' } },
  systemVariables: {
    systemVariable: [
      {
        _attributes: {
          name: 'Anwesenheit',
          variable: '1',
          value: 'true',
          value_list: '',
          ise_id: '13893',
          min: '',
          max: '',
          unit: '',
          type: '2',
          subtype: '2',
          logged: 'false',
          visible: 'true',
          timestamp: '1593018141',
          value_name_0: 'abwesend',
          value_name_1: 'anwesend',
        },
      },
      {
        _attributes: {
          name: 'CCU_im_Reboot',
          variable: '0',
          value: 'false',
          value_list: '',
          ise_id: '950',
          min: '',
          max: '',
          unit: '',
          type: '2',
          subtype: '2',
          logged: 'false',
          visible: 'true',
          timestamp: '1587367853',
          value_name_0: 'ist falsch',
          value_name_1: 'ist wahr',
        },
      },
      {
        _attributes: {
          name: 'Heizung.oel.liter',
          variable: '3954.600000',
          value: '3954.600000',
          value_list: '',
          ise_id: '6250',
          min: '0',
          max: '6000',
          unit: 'l',
          type: '4',
          subtype: '0',
          logged: 'false',
          visible: 'true',
          timestamp: '1587367758',
          value_name_0: '',
          value_name_1: '',
        },
      },
    ],
  },
};

export const getSysVarObj = {
  _declaration: { _attributes: { version: '1.0', encoding: 'ISO-8859-1' } },
  systemVariables: {
    systemVariable: {
      _attributes: {
        name: 'Heizung.oel.liter',
        variable: '3954.600000',
        value: '3954.600000',
        value_list: '',
        value_text: '',
        ise_id: '6250',
        min: '0',
        max: '6000',
        unit: 'l',
        type: '4',
        subtype: '0',
        timestamp: '1587367758',
        value_name_0: '',
        value_name_1: '',
      },
    },
  },
};

export const getDeviceListObj = {
  _declaration: { _attributes: { version: '1.0', encoding: 'ISO-8859-1' } },
  deviceList: {
    device: [
      {
        _attributes: {
          name: 'Heizung',
          address: 'KEQ1234567',
          ise_id: '16879',
          interface: 'BidCos-RF',
          device_type: 'HM-CC-RT-DN',
          ready_config: 'true',
        },
        channel: [
          {
            _attributes: {
              name: 'Heizung.Temperatur',
              type: '22',
              address: 'KEQ1234567:1',
              ise_id: '16909',
              direction: 'RECEIVER',
              parent_device: '16879',
              index: '1',
              group_partner: '',
              aes_available: 'false',
              transmission_mode: 'DEFAULT',
              visible: 'true',
              ready_config: 'true',
              operate: 'true',
            },
          },
          {
            _attributes: {
              name: 'Heizung.Thermostat',
              type: '17',
              address: 'KEQ1234567:2',
              ise_id: '16910',
              direction: 'RECEIVER',
              parent_device: '16879',
              index: '2',
              group_partner: '',
              aes_available: 'false',
              transmission_mode: 'DEFAULT',
              visible: 'true',
              ready_config: 'true',
              operate: 'true',
            },
          },
          {
            _attributes: {
              name: 'Heizung.Fenster',
              type: '26',
              address: 'KEQ1234567:3',
              ise_id: '16911',
              direction: 'RECEIVER',
              parent_device: '16879',
              index: '3',
              group_partner: '',
              aes_available: 'true',
              transmission_mode: 'DEFAULT',
              visible: 'true',
              ready_config: 'true',
              operate: 'true',
            },
          },
          {
            _attributes: {
              name: 'Heizung.Heizung',
              type: '17',
              address: 'KEQ1234567:4',
              ise_id: '16912',
              direction: 'SENDER',
              parent_device: '16879',
              index: '4',
              group_partner: '',
              aes_available: 'false',
              transmission_mode: 'DEFAULT',
              visible: 'true',
              ready_config: 'true',
              operate: 'true',
            },
          },
          {
            _attributes: {
              name: 'Heizung:5',
              type: '17',
              address: 'KEQ1234567:5',
              ise_id: '16956',
              direction: 'RECEIVER',
              parent_device: '16879',
              index: '5',
              group_partner: '',
              aes_available: 'true',
              transmission_mode: 'DEFAULT',
              visible: 'true',
              ready_config: 'true',
              operate: 'true',
            },
          },
          {
            _attributes: {
              name: 'Heizung:6',
              type: '17',
              address: 'KEQ1234567:6',
              ise_id: '16957',
              direction: 'RECEIVER',
              parent_device: '16879',
              index: '6',
              group_partner: '',
              aes_available: 'true',
              transmission_mode: 'DEFAULT',
              visible: 'true',
              ready_config: 'true',
              operate: 'true',
            },
          },
        ],
      },
      {
        _attributes: {
          name: 'Jalousie',
          address: 'JEQ1234567',
          ise_id: '11753',
          interface: 'BidCos-RF',
          device_type: 'HM-LC-Bl1PBU-FM',
          ready_config: 'true',
        },
        channel: {
          _attributes: {
            name: 'Jal',
            type: '36',
            address: 'JEQ1234567:1',
            ise_id: '11782',
            direction: 'RECEIVER',
            parent_device: '11753',
            index: '1',
            group_partner: '',
            aes_available: 'true',
            transmission_mode: 'DEFAULT',
            visible: 'true',
            ready_config: 'true',
            operate: 'true',
          },
        },
      },
    ],
  },
};
