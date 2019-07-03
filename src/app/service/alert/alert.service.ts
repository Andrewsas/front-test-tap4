import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { TranslateService } from '../../generic/translate/translate.service';


@Injectable()
export class AlertService {

    constructor(
        private translate: TranslateService
    ) { }

    showAlertConfirm(alertMsg: any, cb) {
        swal({
            title: this.translate.translate(alertMsg.titleRequest),
            text: this.translate.translate(alertMsg.text),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: this.translate.translate(alertMsg.buttonCancel),
            cancelButtonText: this.translate.translate(alertMsg.buttonConfirm),
            confirmButtonClass: 'btn btn-secondary',
            cancelButtonClass: 'btn btn-primary',
            buttonsStyling: false
        }).then((result) => {
            if (!result.value) {
                // swal({
                //     title: this.translate.translate(alertMsg.titleSuccess),
                //     text: this.translate.translate(alertMsg.textSuccess),
                //     type: 'success',
                //     confirmButtonClass: 'btn btn-success',
                //     buttonsStyling: false
                // }).catch(swal.noop);
                return cb(true);
            } else {
                // swal({
                //     title: this.translate.translate(alertMsg.titleSuccess),
                //     text: this.translate.translate(alertMsg.textCancel),
                //     type: 'error',
                //     confirmButtonClass: 'btn btn-info',
                //     buttonsStyling: false
                // }).catch(swal.noop);
                return cb(false);
            }
        })
    }

    showAlertSuccess(alertMsg: any, title?: String, text?: String) {
        swal({
            title: this.translate.translate(title || alertMsg.titleRequest),
            text: this.translate.translate(text || alertMsg.text),
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-primary',
            type: alertMsg.type
        }).catch(swal.noop)
    }

    showAlertCall(alertMsg: any, title: String, text: String, cb) {
        swal({
            title: this.translate.translate(title || alertMsg.titleRequest),
            text: this.translate.translate(text || alertMsg.text),
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-primary',
            type: alertMsg.type
        }).then(() => {
            cb();
        }).catch(swal.noop)
    }


}
