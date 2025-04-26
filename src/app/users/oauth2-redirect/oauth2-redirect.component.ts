import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-oauth2-redirect',
  template: `<p>Redirecting...</p>`
})
export class OAuth2RedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.authService.handleOAuth2Redirect(token);
      } else {
    
        this.router.navigate(['/front/login'], { queryParams: { error: 'auth_failed' } });
      }
    });
  }
}
