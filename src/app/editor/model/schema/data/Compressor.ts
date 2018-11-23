import { DElement, DType } from '../DElement';

export class Compressor extends DElement {

  constructor(id: number, name: string, public inverter: boolean, public power: number, public capacity: number, desc = '') {
    super(id, name, desc);
  }

  public getType(): DType {
    return DType.Compressor;
  }

}
