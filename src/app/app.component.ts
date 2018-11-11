import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';
import { SVGConfigService } from './svgconfig.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'AngularAndSvg';

  selection: HTMLElement = null;

  @ViewChild('group')
  group: ElementRef;
  matrix = [1, 0, 0, 1, 0, 0];

  constructor(private svgService: SVGConfigService) { }

  ngOnInit(): void {
    this.group.nativeElement.setAttribute('transform',
      'matrix(' + this.matrix.join(' ') + ')');

    this.svgService.init('main-svg');
  }

  selectElem(event: MouseEvent) {
    if (this.selection === null) {
      this.selection = event.srcElement.parentElement;
      this.selection.parentElement.classList.add('selected');

    } else if (this.selection === event.srcElement.parentElement) {
      this.selection.parentElement.classList.remove('selected');
      this.selection = null;

    } else {
      this.selection.parentElement.classList.remove('selected');
      this.selection = event.srcElement.parentElement;
      this.selection.parentElement.classList.add('selected');
    }
  }

  private getPosFromAttribute(elem: HTMLElement): number[] {
    const position = this.selection.getAttribute('transform')
      .replace('translate(', '')
      .replace(')', '')
      .split(', ');

    const newPosition = [];
    position.forEach(item => {
      newPosition.push(parseInt(item, 10));
    });

    return newPosition;
  }

  private pan(dx, dy) {
    const vel = 2.5;

    this.matrix[4] += dx * vel;
    this.matrix[5] += dy * vel;

    this.group.nativeElement.setAttribute(
      'transform',
      'matrix(' + this.matrix.join(' ') + ')'
    );
  }

  private zoom(scale) {
    for (let i = 0; i < 4; i++) {
      this.matrix[i] *= scale;
    }

    const svg = document.getElementById('main-svg');
    const centerX = parseFloat(svg.getAttribute('width')) / 2;
    const centerY = parseFloat(svg.getAttribute('height')) / 2;

    this.matrix[4] += (1 - scale) * centerX;
    this.matrix[5] += (1 - scale) * centerY;

    this.group.nativeElement.setAttributeNS(null, 'transform', 'matrix(' + this.matrix.join(' ') + ')');
  }

  @HostListener('document:keydown.Q', ['$event'])
  zoomIn(event: KeyboardEvent) {
    this.zoom(1.10);
  }

  @HostListener('document:keydown.A', ['$event'])
  zoomOut(event: KeyboardEvent) {
    this.zoom(.9);
  }

  @HostListener('document:keydown.ArrowLeft', ['$event'])
  goLeft(event: KeyboardEvent) {
    if (this.selection) {
      const position = this.getPosFromAttribute(this.selection);
      const newX = position[0] - 1;
      const newY = position[1];

      this.selection.setAttribute('transform', 'translate(' + newX + ', ' + newY + ')');
    } else {
      this.pan(1, 0);
    }
  }

  @HostListener('document:keydown.ArrowRight', ['$event'])
  goRight(event: KeyboardEvent) {
    if (this.selection) {
      const position = this.getPosFromAttribute(this.selection);
      const newX = position[0] + 1;
      const newY = position[1];

      this.selection.setAttribute('transform', 'translate(' + newX + ', ' + newY + ')');
    } else {
      this.pan(-1, 0);
    }
  }

  @HostListener('document:keydown.ArrowUp', ['$event'])
  goAhead(event: KeyboardEvent) {
    if (this.selection) {
      const position = this.getPosFromAttribute(this.selection);
      const newX = position[0];
      const newY = position[1] - 1;

      this.selection.setAttribute('transform', 'translate(' + newX + ', ' + newY + ')');
    } else {
      this.pan(0, +1);
    }
  }

  @HostListener('document:keydown.ArrowDown', ['$event'])
  goBack(event: KeyboardEvent) {
    if (this.selection) {
      const position = this.getPosFromAttribute(this.selection);
      const newX = position[0];
      const newY = position[1] + 1;

      this.selection.setAttribute('transform', 'translate(' + newX + ', ' + newY + ')');
    } else {
      this.pan(0, -1);
    }
  }

}
