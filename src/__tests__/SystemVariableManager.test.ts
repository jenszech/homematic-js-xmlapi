import { getSysVarListObj } from './__mocks__/mockData';
import { SystemVariable } from '../model/SystemVariableModel';
import { SystemVariableManager } from '../SystemVariableManager';

const log = jest.spyOn(console, 'log');
beforeEach(() => {
  log.mockReset();
});

test('SystemVariableManager.mapCount - Success', () => {
  const sysMgr = new SystemVariableManager();
  expect(sysMgr.getStatistic().variableCount).toBe(0);
  const sysVar1 = new SystemVariable(getSysVarListObj.systemVariables.systemVariable[0]);
  sysMgr.updateSysVar(sysVar1);
  expect(sysMgr.getStatistic().variableCount).toBe(1);
  const sysVar2 = new SystemVariable(getSysVarListObj.systemVariables.systemVariable[1]);
  sysMgr.updateSysVar(sysVar2);
  expect(sysMgr.getStatistic().variableCount).toBe(2);
});

test('SystemVariableManager.updateDevice - Add', () => {
  const sysMgr = new SystemVariableManager();
  expect(sysMgr.getStatistic().variableCount).toBe(0);
  const sysVar1 = new SystemVariable(getSysVarListObj.systemVariables.systemVariable[0]);
  sysMgr.updateSysVar(sysVar1);
  expect(sysMgr.getStatistic().variableCount).toBe(1);
  sysMgr.updateSysVar(sysVar1);
  expect(sysMgr.getStatistic().variableCount).toBe(1);
});

test('SystemVariableManager.updateDeviceFromList - Add', () => {
  const sysMgr = new SystemVariableManager();
  const list = new Array<SystemVariable>();
  expect(sysMgr.getStatistic().variableCount).toBe(0);
  list.push(new SystemVariable(getSysVarListObj.systemVariables.systemVariable[0]));
  list.push(new SystemVariable(getSysVarListObj.systemVariables.systemVariable[1]));

  sysMgr.updateSysVarList(list);
  expect(sysMgr.getStatistic().variableCount).toBe(2);

  sysMgr.updateSysVarList(list);
  expect(sysMgr.getStatistic().variableCount).toBe(2);

  list.push(new SystemVariable(getSysVarListObj.systemVariables.systemVariable[2]));
  sysMgr.updateSysVarList(list);
  expect(sysMgr.getStatistic().variableCount).toBe(3);
});

test('SystemVariableManager.getVariableByName', () => {
  const sysMgr = new SystemVariableManager();
  const list = new Array<SystemVariable>();
  expect(sysMgr.getStatistic().variableCount).toBe(0);
  list.push(new SystemVariable(getSysVarListObj.systemVariables.systemVariable[0]));
  list.push(new SystemVariable(getSysVarListObj.systemVariables.systemVariable[1]));
  sysMgr.updateSysVarList(list);

  expect(sysMgr.getStatistic().variableCount).toBe(2);
  expect(sysMgr.getVariableByName(list[1].name)?.iseId).toBe('950');

  expect(sysMgr.getVariableByName('NotFound')).toBeNull();
});

test('SystemVariableManager.printSysVarList - Success', () => {
  const sysMgr = new SystemVariableManager();
  const list = new Array<SystemVariable>();
  expect(sysMgr.getStatistic().variableCount).toBe(0);
  list.push(new SystemVariable(getSysVarListObj.systemVariables.systemVariable[0]));
  list.push(new SystemVariable(getSysVarListObj.systemVariables.systemVariable[1]));
  sysMgr.updateSysVarList(list);

  expect(log.mock.calls.length).toBe(0);

  sysMgr.printSysVarList();

  expect(sysMgr.getStatistic().variableCount).toBe(2);
  expect(log.mock.calls.length).toBe(2);
});
