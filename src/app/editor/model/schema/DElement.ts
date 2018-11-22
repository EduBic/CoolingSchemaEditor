
export enum DType {
  Valve = 'Valve',
  Fan = 'Fan',
  SideCover = 'SideCover',
  Coil = 'Coil',
}


export abstract class DElement {
  // id: number;
  // name: string;

  constructor(public id: number, public name: string) {}

  abstract getType(): DType;
}
