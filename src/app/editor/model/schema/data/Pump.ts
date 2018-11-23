import { DElement, DType } from '../DElement';

export class Pump extends DElement {

  constructor(id: number, name: string, public inverter: boolean, public waterFlowRate: number, public power: number, desc = '') {
    super(id, name, desc);
  }

  public getType(): DType {
    return DType.Pump;
  }

}
