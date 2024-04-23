import {Injectable, Provider} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable, catchError, switchMap, throwError } from "rxjs";
import { PcService } from "./pc.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private pcService: PcService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access = localStorage.getItem("access");
    if (access) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${access}`)
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const refreshToken = localStorage.getItem('refresh');
          if (refreshToken) {
            return this.pcService.refreshToken(refreshToken).pipe(
              switchMap((token: any) => {
                localStorage.setItem("access", token.access);
                const clonedRequest = req.clone({ setHeaders: { Authorization: `Bearer ${token.access}` } });
                return next.handle(clonedRequest);
              })
            );
          }
        }
        return throwError(error);
      })
    );
  }
}