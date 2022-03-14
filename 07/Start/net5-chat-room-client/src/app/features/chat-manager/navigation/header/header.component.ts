import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public fixedInViewport!: boolean;
  @Output() public sidenavToggle = new EventEmitter();

  email: string = '';
  firstName: string = '';
  lastName: string = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.email = this.authService.appUserAuth.email;
    this.firstName = this.authService.appUserAuth.firstName;
    this.lastName = this.authService.appUserAuth.lastName;
  }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    if (!this.fixedInViewport) {
      this.sidenavToggle.emit();
    }
  }

  public profile(e: any) {    
    this.router.navigate(['chat/profile']);    
  }

  public signOut(e: any) {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['security/login']);
    });    
  }
}
