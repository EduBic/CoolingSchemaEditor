
export enum DType {
  Valve = 'Valve',
  Fan = 'Fan',
  SideCover = 'SideCover',
  Coil = 'Coil',
  WaterLine = 'WaterLine',
  Compressor = 'Compressor',
  Pump = 'Pump',
  Evaporator = 'Evaporator',
  Condenser = 'Condenser',
}


export abstract class DElement {
  // id: number;
  // name: string;

  constructor(public id: number, public name: string, public desc = '') {}

  abstract getType(): DType;
}
