'use strict';
import { SystemVariable } from './model/SystemVariableModel';
import { VariableStatistic } from './model/SysVarStatisticModel';

export class SystemVariableManager {
  private sysMap: Map<string, SystemVariable> = new Map();
  private statistic = new VariableStatistic();

  public getStatistic(): VariableStatistic {
    return this.statistic;
  }

  public updateSysVarList(sysVarList: SystemVariable[]) {
    if (sysVarList.length > 0) {
      for (const sysVar of sysVarList) {
        this.updateSysVar(sysVar);
      }
      this.updateStatistic(this.sysMap.size);
    }
  }

  public updateSysVar(sysVar: SystemVariable) {
    if (this.sysMap.has(sysVar.iseId)) {
      this.sysMap.get(sysVar.iseId)?.updateValues(sysVar);
    } else {
      this.sysMap.set(sysVar.iseId, sysVar);
    }
    this.updateStatistic(this.sysMap.size);
  }

  public getVariableByName(name: string): SystemVariable | null {
    for (const [, value] of this.sysMap) {
      if (value.name === name) {
        return value;
      }
    }
    return null;
  }

  public printSysVarList() {
    for (const sysVar of this.sysMap.values()) {
      console.log(sysVar.toString());
    }
  }
  public getVariablesAsJson(): string {
    return JSON.stringify(Array.from(this.sysMap.entries()));
  }
  public getVariablesRaw(): Map<string, SystemVariable> {
    return this.sysMap;
  }

  private updateStatistic(count: number) {
    this.statistic.lastUpdateCount = count;
    this.statistic.lastUpdateTime = new Date();
    this.statistic.variableCount = this.sysMap.size;
  }
}
