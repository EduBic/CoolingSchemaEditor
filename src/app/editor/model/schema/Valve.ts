import { DElement, DType } from './DElement';

export class Valve extends DElement {

  private static dtype = DType.Valve;

  public getType(): DType {
    return Valve.dtype;
  }

}
