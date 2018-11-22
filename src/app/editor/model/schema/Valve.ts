import { DElement, DType } from './DElement';

export class Valve extends DElement {

  public static dtype = DType.Valve;

  public getType(): DType {
    return Valve.dtype;
  }

}
