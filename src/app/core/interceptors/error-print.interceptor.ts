import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorPrintInterceptor implements HttpInterceptor {
  constructor(private readonly notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (error: unknown) => {
          const url = new URL(request.url);

          let errorMessage = `Request to "${url.pathname}" failed.`;

          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 401:
                errorMessage += ' Authorization header is not provided.';
                break;

              case 403:
                errorMessage += ' Access denied.';
                break;
              default:
                errorMessage += ` Check the console for the details.`;
            }

            this.notificationService.showError(errorMessage, 0);
          }
        },
      })
    );
  }
}
