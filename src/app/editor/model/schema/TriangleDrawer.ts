
export class TriangleDrawer {

  public static getTrianglePoints(radius: number): number[] {

    const halfAngleT = 60 * Math.PI / 180 / 2; // radian
    const sideT = radius * Math.sqrt(3);
    const heightT = sideT * Math.cos(halfAngleT);
    const halfBaseT = sideT * Math.sin(halfAngleT);

    // console.log('radius', this.radius);
    // console.log('half angle', halfAngleT);
    // console.log('side', sideT);
    // console.log('h', heightT);
    // console.log('B/2', halfBaseT);
    return [
      radius - halfBaseT, heightT,
      radius, 0,
      radius + halfBaseT, heightT
    ];
  }

}
