import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { IMenu, SideMenuComponent } from '@libs/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SideMenuComponent, RouterOutlet],
  standalone: true
})
export class AppComponent {

  menu: IMenu[] = [];
  menuToggled = false;
  windowInnerWidth = 0;

  constructor() {
    this.menu = [
      {
        link: 'home',
        name: 'home',
        icon: 'home'
      },
      {
        link: 'list',
        name: 'movie list',
        icon: 'list'
      }
    ];

    this.windowInnerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowInnerWidth = (event.target as Window).innerWidth;
  }

  toggledMenu() {
    this.menuToggled = !this.menuToggled;
  }

  activate() {
    if (this.windowInnerWidth < 767) {
      this.menuToggled = false;
    }
  }
}
