import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public fixedInViewport!: boolean;
  @Output() public sidenavToggle = new EventEmitter();

  email: string = 'erick.arostegui.cunza@gmail.com';
  firstName: string = 'Erick';
  lastName: string = 'Aróstegui'

  constructor() {    
  }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    if (!this.fixedInViewport) {
      this.sidenavToggle.emit();
    }
  }
}
