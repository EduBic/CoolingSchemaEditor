import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { GFan } from './graphics/GFan';
import { GCoilPair } from './graphics/GCoilPair';
import { GSideCover } from './graphics/GSideCover';
import { SElement } from './SElement';
import { DType } from './DElement';
import { SubsystemBuilder } from './SubsystemBuilder';
import { GCompressor } from './graphics/GCompressor';
import { Direction } from './graphics/utils/Direction';
import { GParallelWrapper } from './graphics/GParallelWrapper';
import { GValve } from './graphics/GValve';
import { GFluidTransformer } from './graphics/GFluidTransformer';
import { HookPosition } from '../core/HookPosition';


export class DxUnitBuilder {

  public static create(origin: Point, svgParent: SVG.G, totWidth: number, totHeight: number): SElement[] {
      // super(origin, svgParent, totWidth, totHeight, []);
      const res: SElement[] = [];

      const svgGroup = svgParent.group(); // .move(origin.x, origin.y);

      // compr info
      const comprRadius = 15;
      const totNum = 3;
      const marginCompr = 5;

      // valve info
      const expValveWidth = 22;
      const expValveHeight = 40;

      // Relation valve-compr
      const marginValveToCompr = 30;

      // condenser and evaporator
      const fluidTransWidth = 200;
      const fluidTransHeight = 34;

      const marginComprTopBottom = 40;


      // Create circuit 1

      // compressor
      const comprCarbonCopy = new GCompressor(
        new Point(0, 0),
        svgGroup, comprRadius, Direction.BottomToTop
      );

      const compr1parall = new GParallelWrapper(
        SubsystemBuilder.getOrigin(
          origin,
          new Point(expValveWidth + marginValveToCompr, fluidTransHeight + marginComprTopBottom)
        ), svgGroup, comprCarbonCopy, totNum, marginCompr
      );

      // Expansion valve

      const valve1 = new GValve(
        SubsystemBuilder.getOrigin(
          origin,
          new Point(0, compr1parall.getHeight() / 2 - expValveHeight / 2 + fluidTransHeight + marginComprTopBottom)
        ), svgGroup, expValveWidth, expValveHeight, Direction.TopToBottom
      );

      const marginCircuit = 20;

      // circuit 2

      const compr2parall = new GParallelWrapper(
        SubsystemBuilder.getOrigin(
          origin,
          new Point(expValveWidth + marginValveToCompr + compr1parall.getWidth() + marginCircuit, fluidTransHeight + marginComprTopBottom)
        ), svgGroup, comprCarbonCopy, totNum, marginCompr
      );

      const valve2 = new GValve(
        SubsystemBuilder.getOrigin(
          origin,
          new Point(
            expValveWidth + marginValveToCompr + compr1parall.getWidth() + marginCircuit + compr2parall.getWidth() + marginValveToCompr,
            compr2parall.getHeight() / 2 - expValveHeight / 2 + fluidTransHeight + marginComprTopBottom
          )
        ),
        svgGroup, expValveWidth, expValveHeight, Direction.TopToBottom
      );

      const width = expValveWidth + marginValveToCompr + compr1parall.getWidth()
                      + marginCircuit + compr2parall.getWidth() + marginValveToCompr + expValveWidth;

      // condenser

      const condenser = new GFluidTransformer(
        SubsystemBuilder.getOrigin(origin, new Point(width / 2 - fluidTransWidth / 2, 0)),
        svgGroup, fluidTransWidth, fluidTransHeight, HookPosition.Top
      );

      // evaporator

      const evaporator = new GFluidTransformer(
        SubsystemBuilder.getOrigin(
          origin,
          new Point(width / 2 - fluidTransWidth / 2, condenser.getHeight() + marginComprTopBottom * 2 + compr1parall.getHeight())
        ), svgGroup, fluidTransWidth, fluidTransHeight, HookPosition.Bottom
      );



      // Build elements

      res.push(
        new SElement(compr1parall, DType.Compressor),
        new SElement(valve1, DType.Valve),
        new SElement(compr2parall, DType.Compressor),
        new SElement(valve2, DType.Valve),
        new SElement(condenser, DType.Condenser),
        new SElement(evaporator, DType.Evaporator),
      );

      // console.log(fan.getHeight());
      return res;
  }

}
