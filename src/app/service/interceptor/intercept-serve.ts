import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpXsrfTokenExtractor } from '@angular/common/http';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { tap, catchError } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { AlertMsg, MessageText } from '../../constant/constant';

@Injectable()
export class InterceptService implements HttpInterceptor {

    constructor(
        private aletrService: AlertService,
        private router: Router
    ) { }

    // intercept request and add token
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'Authorization': sessionStorage.getItem('token') ? `INV=${sessionStorage.getItem('token')}` : '',
            }
        });

        return next.handle(request)
            .pipe(catchError((error, caught) => {
                this.handleAuthError(error);
                return (error);
            }) as any,
                tap(event => {
                    if (event instanceof HttpResponse) {
                        console.log(event.headers.get('Authorization'));
                        }
                })
            );
    }

    private handleAuthError(err: HttpErrorResponse): String {
        switch (err.status) {
            case 0: {
                this.semInternet();
                break;
            }
            case 504: {
                this.servidorIndisponivel();
                break;
            }
            case 401: {
                this.semAutorizacao();
                break;
            }
        }
        throw err;
    }

    private semInternet() {
        this.aletrService.showAlertSuccess(AlertMsg.CANCEL, 'Ops !', MessageText.NOTNET);
    }

    private semAutorizacao() {
        this.aletrService.showAlertCall(AlertMsg.WARNING, MessageText.ATTENTION, MessageText.AUTHORIZATION, (result) => {
            sessionStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('authority');
            this.router.navigate(['login']);
        });
    }

    private servidorIndisponivel() {
        this.aletrService.showAlertSuccess(AlertMsg.CANCEL, 'Ops !', MessageText.NOTSERVE);
    }
}
