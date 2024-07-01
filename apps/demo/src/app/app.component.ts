import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { DataLayerService } from '@jerkovicl/ngx-gtm';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [RouterModule],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-gtm-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'demo';
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly router: Router = inject(Router);
  private readonly dataLayerService: DataLayerService = inject(DataLayerService);
  private readonly platform: Object = inject(PLATFORM_ID);
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
        if (isPlatformBrowser(this.platform)) {
          const gtmTag = {
            event: 'page',
            pageName: event.urlAfterRedirects,
            data: {},
          };
          this.dataLayerService.logPageView(gtmTag);
        }
        /** END : Code to track page view using GTM */
      });
  }
}
