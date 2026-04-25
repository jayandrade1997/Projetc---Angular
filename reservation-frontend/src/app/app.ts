import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  name = signal('Jay');

  changeName() {
    this.name.set(this.name() === 'Jay' ? 'Jose' : 'Jay');
  }
}
