import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { SElement } from './SElement';
import { DType } from './DElement';
import { SubsystemBuilder } from './SubsystemBuilder';
import { GCompressor } from './graphics/GCompressor';
import { Direction } from './graphics/utils/Direction';
import { GParallelWrapper } from './graphics/GParallelWrapper';
import { GValve } from './graphics/GValve';
import { GFluidTransformer } from './graphics/GFluidTransformer';
import { HookPosition } from '../core/HookPosition';
import { GLine } from './graphics/GLine';


export class DxUnitBuilder {

  public static create(origin: Point, svgParent: SVG.G): SElement[] {
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
      const marginValveToCompr = 40;

      // condenser and evaporator
      const fluidTransWidth = 227;
      const fluidTransHeight = 34;

      const marginComprTopBottom = 40;
      const marginCenterCircuit = 36;


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

      const valveLeft = new GValve(
        SubsystemBuilder.getOrigin(
          origin,
          new Point(0, compr1parall.getHeight() / 2 - expValveHeight / 2 + fluidTransHeight + marginComprTopBottom)
        ), svgGroup, expValveWidth, expValveHeight, Direction.TopToBottom
      );

      // circuit 2

      const compr2parall = new GParallelWrapper(
        SubsystemBuilder.getOrigin(
          origin,
          new Point(
            expValveWidth + marginValveToCompr + compr1parall.getWidth() + marginCenterCircuit,
            fluidTransHeight + marginComprTopBottom
          )
        ), svgGroup, comprCarbonCopy, totNum, marginCompr
      );

      const valveRight = new GValve(
        SubsystemBuilder.getOrigin(
          origin,
          new Point(
            expValveWidth + marginValveToCompr + compr1parall.getWidth() +
              marginCenterCircuit + compr2parall.getWidth() + marginValveToCompr,
            compr2parall.getHeight() / 2 - expValveHeight / 2 + fluidTransHeight + marginComprTopBottom
          )
        ),
        svgGroup, expValveWidth, expValveHeight, Direction.TopToBottom
      );

      const width = expValveWidth + marginValveToCompr + compr1parall.getWidth()
                      + marginCenterCircuit + compr2parall.getWidth() + marginValveToCompr + expValveWidth;

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


      // Connections
      const lines = [];
      const mainOrigin = new Point(0, 0);

      const compr1ToCondLine = GLine.connectElems(svgGroup, mainOrigin, compr1parall.getAbsoluteGate(1), condenser.getAbsoluteGate(4));
      const compr2ToCondLine = GLine.connectElems(svgGroup, mainOrigin, compr2parall.getAbsoluteGate(1), condenser.getAbsoluteGate(2));

      const evapToCompr1Line = GLine.connectElems(svgGroup, mainOrigin, evaporator.getAbsoluteGate(4), compr1parall.getAbsoluteGate(0));
      const evapToCompr2Line = GLine.connectElems(svgGroup, mainOrigin, evaporator.getAbsoluteGate(2), compr2parall.getAbsoluteGate(0));

      const valveLeftToEvapLine = GLine.connectElems(svgGroup, mainOrigin, valveLeft.getAbsoluteGate(1), evaporator.getAbsoluteGate(5));
      const condToValvLeftLine = GLine.connectElems(svgGroup, mainOrigin, valveLeft.getAbsoluteGate(0), condenser.getAbsoluteGate(5));

      const valveRightToEvapLine = GLine.connectElems(svgGroup, mainOrigin, valveRight.getAbsoluteGate(1), evaporator.getAbsoluteGate(3));
      const condToValvRightLine = GLine.connectElems(svgGroup, mainOrigin, valveRight.getAbsoluteGate(0), condenser.getAbsoluteGate(3));

      lines.push(compr1ToCondLine, compr2ToCondLine,
        evapToCompr1Line, evapToCompr2Line,
        valveLeftToEvapLine, condToValvLeftLine,
        valveRightToEvapLine, condToValvRightLine
      );

      // Build elements

      res.push(
        new SElement(condenser, DType.Condenser),
        new SElement(evaporator, DType.Evaporator),
        new SElement(compr1parall, DType.Compressor),
        new SElement(valveLeft, DType.Valve),
        new SElement(compr2parall, DType.Compressor),
        new SElement(valveRight, DType.Valve),
      );

      lines.forEach(line => {
        res.push(new SElement(line, DType.WaterLine));
      });

      // console.log(fan.getHeight());
      return res;
  }

}
