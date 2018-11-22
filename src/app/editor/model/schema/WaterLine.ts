import { DElement, DType } from './DElement';

export class WaterLine extends DElement {

  private static dtype = DType.WaterLine;

  public getType(): DType {
    return WaterLine.dtype;
  }

}
