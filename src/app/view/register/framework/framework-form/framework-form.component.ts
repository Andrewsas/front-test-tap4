import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MessageType, IconType } from 'src/app/constant/constant';
import { GenericFormComponent } from 'src/app/generic/generic-form/generic-form.component';

import { Framework } from 'src/app/model/framework.model';
import { AlertService } from 'src/app/service/alert/alert.service';
import { GenericService } from 'src/app/service/generic/GenericService';
import { FrameworkService } from 'src/app/service/framework/framework.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { LanguageService } from 'src/app/service/language/language.service';
import { Language } from 'src/app/model/language.model';

@Component({
  selector: 'app-framework-form',
  templateUrl: './framework-form.component.html',
  styleUrls: ['./framework-form.component.css']
})
export class FrameworkFormComponent  extends GenericFormComponent<Framework, FrameworkService> implements OnInit {

  @ViewChild('foto') foto: ElementRef;

  public contra: string[] = [];
  public pro: string[] = [];

  public languages: Language[] = [];

  constructor(
    public service: FrameworkService,
    public alertServe: AlertService,
    public genericService: GenericService,
    public activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private languageService: LanguageService
  ) {
    super(activatedRoute, service, Framework, alertServe, genericService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.languageService.getAll().subscribe(
      (data: Language[]) => {
        this.languages = data;
      }
    );
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

  beforeSave() {
    this.obj.pro = this.pro.toString();
    this.obj.against = this.contra.toString();
  }

  afterLoadOne() {
    this.pro = this.obj.pro.split(',') ;
    this.contra = this.obj.against.split(',');
  }
}
