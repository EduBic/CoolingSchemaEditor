import { DElement, DType } from '../DElement';

export enum FanEngine {
  AC = 'AC',
  EC = 'EC'
}

export class Fan extends DElement {

  constructor(id: number, name: string, public engine: FanEngine, public airflowRate: number, public power: number, desc = '') {
    super(id, name, desc);
  }

  public getType(): DType {
    return DType.Fan;
  }

}
