import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-error-toast',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './error-toast.html',
  styleUrl: './error-toast.css',
})
export class ErrorToastComponent {
  message = input('');
  variant = input<'error' | 'success'>('error');
}
