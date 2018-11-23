import { HookPosition } from '../../../core/HookPosition';

export enum Direction {
  TopToBottom = 'TopToBottom',
  BottomToTop = 'BottomToTop',
  LeftToRight = 'LeftToRight',
  RightToLeft = 'RightToLeft'
}

export class UtilDirection {

  public static getDirection(start: HookPosition, end: HookPosition): Direction {
    if (start === HookPosition.Top && end === HookPosition.Bottom) {
      return Direction.TopToBottom;
    } else if (start === HookPosition.Bottom && end === HookPosition.Top) {
      return Direction.BottomToTop;
    } else if (start === HookPosition.Right && end === HookPosition.Left) {
      return Direction.RightToLeft;
    } else if (start === HookPosition.Left && end === HookPosition.Right) {
      return Direction.LeftToRight;
    }
  }

  public static getPosition(direction: Direction): HookPosition[] {
    switch (direction) {
      case Direction.TopToBottom:
        return [HookPosition.Top, HookPosition.Bottom];

      case Direction.BottomToTop:
        return [HookPosition.Bottom, HookPosition.Top];

      case Direction.LeftToRight:
        return [HookPosition.Left, HookPosition.Right];

      case Direction.RightToLeft:
        return [HookPosition.Right, HookPosition.Right];
    }
  }

  public static getOppositePosition(position: HookPosition): HookPosition {
    switch (position) {
      case HookPosition.Top: {
        return HookPosition.Bottom;
      }
      case HookPosition.Right: {
        return HookPosition.Left;
      }
      case HookPosition.Bottom: {
        return HookPosition.Top;
      }
      case HookPosition.Left: {
        return HookPosition.Right;
      }
    }
  }

}
