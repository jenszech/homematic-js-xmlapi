'use strict';
import { SystemVariable } from './model/SystemVariableModel';

export class SystemVariableManager {
  private sysMap: Map<string, SystemVariable> = new Map();

  public mapCount() {
    return this.sysMap.size;
  }

  public updateSysVarList(sysVarList: SystemVariable[]) {
    if (sysVarList.length > 0) {
      for (const sysVar of sysVarList) {
        this.updateSysVar(sysVar);
      }
    }
  }

  public updateSysVar(sysVar: SystemVariable) {
    if (this.sysMap.has(sysVar.iseId)) {
      this.sysMap.get(sysVar.iseId)?.updateValues(sysVar);
    } else {
      this.sysMap.set(sysVar.iseId, sysVar);
    }
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
}
