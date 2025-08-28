import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { IMenu } from '../../models/menu.model';

/**
 * SideMenuComponent receives an array of IMenu to show list of links.
 */
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.scss'],
  host: { class: 'app-side-menu' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  standalone: true
})
export class SideMenuComponent {

  @Input()
  menu: IMenu[] = [];

  @Output()
  toggledMenu = new EventEmitter<boolean>();

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
    this.toggledMenu.emit(this.isOpen);
  }
}
