import { DElement, DType } from '../DElement';

export enum ValveActuator {
  OnOff = 'OnOff',
  Modular = 'Modular'
}

export class Valve extends DElement {

  private static dtype = DType.Valve;

  constructor(id: number, name: string, public kv: number, public actuator: ValveActuator, desc?: string) {
    super(id, name, desc);
  }

  public getType(): DType {
    return Valve.dtype;
  }

}
