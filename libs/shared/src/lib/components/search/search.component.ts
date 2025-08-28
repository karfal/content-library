import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';

/**
 * SearchComponent is used to add searchTerm and list as query params.
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.scss'],
  host: { class: 'app-search' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  standalone: true
})
export class SearchComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @Input()
  list: string[] = [];

  control!: FormControl;
  selectedLists: string[] = [];
  showDropdown = false;

  constructor() {
    const term = this.route.snapshot.queryParamMap.has('searchTerm') ? String(this.route.snapshot.queryParamMap.get('searchTerm')) : '';
    this.control = new FormControl(term);

    this.control.valueChanges.pipe(
      debounceTime(500),
      takeUntilDestroyed()
    ).subscribe({
      next: term => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { searchTerm: term || undefined },
          queryParamsHandling: 'merge'
        });
      }
    });

    this.selectedLists = this.route.snapshot.queryParamMap.getAll('list') || [];
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleList(list: string) {
    if (this.selectedLists.includes(list)) {
      this.selectedLists = this.selectedLists.filter(g => g !== list);
    } else {
      this.selectedLists.push(list);
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { list: this.selectedLists.length ? this.selectedLists : undefined },
      queryParamsHandling: 'merge'
    });
  }

  clear() {
    this.selectedLists = [];
    this.showDropdown = false;
    this.control.setValue('');

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { searchTerm: undefined, list: undefined }
    });
  }
}
