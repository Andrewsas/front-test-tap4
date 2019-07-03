import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Language } from 'src/app/model/language.model';
import { MessageType, IconType } from 'src/app/constant/constant';
import { GenericFormComponent } from 'src/app/generic/generic-form/generic-form.component';

import { AlertService } from 'src/app/service/alert/alert.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { GenericService } from 'src/app/service/generic/GenericService';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.css']
})
export class LanguageFormComponent extends GenericFormComponent<Language, LanguageService> implements OnInit {

  @ViewChild('foto') foto: ElementRef;

  constructor(
    public service: LanguageService,
    public alertServe: AlertService,
    public genericService: GenericService,
    public activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
    super(activatedRoute, service, Language, alertServe, genericService);
  }

  checkPhoto() {
    if (this.obj.image) {
      return true;
    } else {
      return false;
    }
  }

  public selecionaFoto(): void {
    this.foto.nativeElement.click();
  }

  public fotoSelected(): void {
    this.convertBase64(this.foto.nativeElement);
  }

  public convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    if (file.size > 10485760) {
      this.toastService.toats('Tamanho de Imagem incompativel', MessageType.WARNING, IconType.NOTIFICATION);
      return;
    }
    const myReader: FileReader = new FileReader();

    myReader.onloadend = e => {
      this.obj.image = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  public titleCase() {
    if (this.obj.name) {
      const splitStr: String[] = this.obj.name.toLowerCase().split(' ');
      let txt: String = '';
      for (let i = 0; i < splitStr.length; i++) {
        txt += splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1) + ' ';
      }
      this.obj.name = txt.trim();
    }
  }
}
