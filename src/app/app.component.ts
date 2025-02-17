import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'comp584';
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.init();
  }
}
