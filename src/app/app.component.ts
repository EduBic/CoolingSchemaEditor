import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularAndSvg';

  selection: HTMLElement;

  selectElem(event: MouseEvent) {
    console.log(event);
    this.selection = event.srcElement.parentElement;
  }

  private getPosFromAttribute(elem: HTMLElement): number[] {
    const position = this.selection.getAttribute('transform')
      .replace('translate(', '')
      .replace(')', '')
      .split(', ');

    const newPosition = [];
    position.forEach(item => { newPosition.push(parseInt(item, 10)); });

    return newPosition;
  }

  @HostListener('document:keydown.ArrowLeft', ['$event'])
  goLeft(event: KeyboardEvent) {
    if (this.selection) {
      const position = this.getPosFromAttribute(this.selection);
      const newX = position[0] - 1;
      const newY = position[1];

      this.selection.setAttribute('transform', 'translate(' + newX + ', ' + newY + ')');
    }
  }

  getComputedTranslateXY(obj) {
    const transArr = [];
    if (!window.getComputedStyle) {
      return;
    }
    const style = getComputedStyle(obj),
          transform = style.transform || style.webkitTransform;

    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) {
      return parseFloat(mat[1].split(', ')[13]);
    }

    mat = transform.match(/^matrix\((.+)\)$/);
    mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : transArr.push(0);
    mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : transArr.push(0);

    return transArr;
  }

  @HostListener('document:keydown.ArrowRight', ['$event'])
  goRight(event: KeyboardEvent) {
    if (this.selection) {
      const position = this.getPosFromAttribute(this.selection);
      const newX = position[0] + 1;
      const newY = position[1];

      this.selection.setAttribute('transform', 'translate(' + newX + ', ' + newY + ')');
    }
  }

  @HostListener('document:keydown.ArrowUp', ['$event'])
  goAhead(event: KeyboardEvent) {
    if (this.selection) {
      const position = this.getPosFromAttribute(this.selection);
      const newX = position[0];
      const newY = position[1] - 1;

      this.selection.setAttribute('transform', 'translate(' + newX + ', ' + newY + ')');
    }
  }

  @HostListener('document:keydown.ArrowDown', ['$event'])
  goBack(event: KeyboardEvent) {
    if (this.selection) {
      const position = this.getPosFromAttribute(this.selection);
      const newX = position[0];
      const newY = position[1] + 1;

      this.selection.setAttribute('transform', 'translate(' + newX + ', ' + newY + ')');
    }
  }

}
