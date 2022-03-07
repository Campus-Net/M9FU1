import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { map } from 'rxjs';

@Component({
  selector: 'app-chat-manager',
  templateUrl: './chat-manager.component.html',
  styleUrls: ['./chat-manager.component.scss']
})
export class ChatManagerComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  version = VERSION;
  mode: MatDrawerMode = 'side'
  opened = true;
  layoutGap = '64';
  fixedInViewport = true;

  constructor(
    private bpo: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    const breakpoints = (Object as any).values(Breakpoints)
    this.bpo.observe(breakpoints)
      .pipe(map(bst => bst.matches))
      .subscribe(matched => {
        this.determineSidenavMode();
        this.determineLayoutGap();
      });
  }

  private determineSidenavMode(): void {
    if (
      this.isExtraSmallDevice() ||
      this.isSmallDevice()
    ) {
      this.fixedInViewport = false;
      this.mode = 'over';
      this.opened = false;
      return;
    }

    this.fixedInViewport = true;
    this.mode = 'side';
    if (this.sidenav) {
      this.sidenav.open();
    }
  }


  private determineLayoutGap(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.layoutGap = '64';
      return;
    }

    this.layoutGap = '64';
  }

  public isExtraSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.XSmall);
  }

  public isSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.Small)
  }

}
