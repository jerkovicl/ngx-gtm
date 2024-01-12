import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { DataLayerService } from '@jerkovicl/ngx-gtm';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'ngx-gtm-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'demo';
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly router: Router = inject(Router);
  private readonly dataLayerService: DataLayerService = inject(DataLayerService);
  ngOnInit(): void {
    this.triggerRouterEvents();
  }

  private triggerRouterEvents() {
    this.router.events
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filter((event: any) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event: NavigationEnd) => {
        /** START : Code to track page view using GTM */
        const gtmTag = {
          event: 'page',
          pageName: event.urlAfterRedirects,
          data: {},
        };
        this.dataLayerService.logPageView(gtmTag);
        /** END : Code to track page view using GTM */
      });
  }
}
