import { DElement, DType } from '../DElement';

export class Evaporator extends DElement {

  constructor(id: number, name: string, public numPlates: number, public capacity: number, desc = '') {
    super(id, name, desc);
  }

  public getType(): DType {
    return DType.Evaporator;
  }
}
