import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'sg-empleados';

   constructor(private sessionService: SessionService) {}

   ngOnInit(): void {
    if (typeof window !== 'undefined') { 
      const token = localStorage.getItem('token');
    if (token) {
      this.sessionService.startSessionWatcher(token);
    }
    }
    
  }
}
