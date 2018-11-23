import { DElement, DType } from '../DElement';

export enum FinType {
  Smooth = 'Smooth',
  Louvered = 'Louvered',
  Corrugated = 'Corrugated'
}

export class Coil extends DElement {

  constructor(id: number, name: string, public width: number, public height: number, public rows: number,
    public tubePitch: number, public rowPitch: number, public finType: FinType, desc = '') {
      super(id, name, desc);
    }

  getType(): DType {
    return DType.Coil;
  }

}
