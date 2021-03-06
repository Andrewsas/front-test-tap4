import { Component, OnInit, Renderer, ViewChild, ElementRef, Input } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

import { TranslateService } from '../../../generic/translate/translate.service';
import { Languages } from '../../../generic/translate/translations';

const misc: any = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
};

declare var $: any;
@Component({
    selector: 'app-navbar-cmp',
    templateUrl: 'navbar.component.html',
    styles: [`
    .fontBranca {
        color: #666 !important;
        font-weight: bold !important;
    }
`]
})

export class NavbarComponent implements OnInit {
    private listTitles: any;
    location: Location;
    mobile_menu_visible: any = 0;
    private nativeElement: Node;
    private toggleButton: any;
    private sidebarVisible: boolean;
    private _router: Subscription;

    @ViewChild('app-navbar-cmp') button: any;

    @Input()
    public auth: Boolean = false;

    public linkHelp: String = '';

    languages = Languages;
    set selectedLanguage(value) {
        localStorage.setItem('lang', value);
        this._translate.use(this.selectedLanguage);
    }

    get selectedLanguage() {
        if (!localStorage.getItem('lang') || localStorage.getItem('lang') === '') {
            localStorage.setItem('lang', this.languages[0].value);
            this._translate.use(this.selectedLanguage);
        }

        return localStorage.getItem('lang');
    }

    constructor(
        location: Location,
        private renderer: Renderer,
        private element: ElementRef,
        private router: Router,
        private _translate: TranslateService
    ) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

    }
    minimizeSidebar() {
        const body = document.getElementsByTagName('body')[0];

        if (misc.sidebar_mini_active === true) {
            body.classList.remove('sidebar-mini');
            misc.sidebar_mini_active = false;

        } else {
            setTimeout(function () {
                body.classList.add('sidebar-mini');

                misc.sidebar_mini_active = true;
            }, 300);
        }

        // we simulate the window Resize so the charts will get updated in realtime.
        const simulateWindowResize = setInterval(function () {
            window.dispatchEvent(new Event('resize'));
        }, 180);

        // we stop the simulation of Window Resize after the animations are completed
        setTimeout(function () {
            clearInterval(simulateWindowResize);
        }, 1000);
    }
    hideSidebar() {
        const body = document.getElementsByTagName('body')[0];
        const sidebar = document.getElementsByClassName('sidebar')[0];

        if (misc.hide_sidebar_active === true) {
            setTimeout(function () {
                body.classList.remove('hide-sidebar');
                misc.hide_sidebar_active = false;
            }, 300);
            setTimeout(function () {
                sidebar.classList.remove('animation');
            }, 600);
            sidebar.classList.add('animation');

        } else {
            setTimeout(function () {
                body.classList.add('hide-sidebar');
                // $('.sidebar').addClass('animation');
                misc.hide_sidebar_active = true;
            }, 300);
        }

        // we simulate the window Resize so the charts will get updated in realtime.
        const simulateWindowResize = setInterval(function () {
            window.dispatchEvent(new Event('resize'));
        }, 180);

        // we stop the simulation of Window Resize after the animations are completed
        setTimeout(function () {
            clearInterval(simulateWindowResize);
        }, 1000);
    }

    ngOnInit() {
        this._translate.use(this.selectedLanguage);

        this.listTitles = ROUTES;

        const navbar: HTMLElement = this.element.nativeElement;
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        if (body.classList.contains('sidebar-mini')) {
            misc.sidebar_mini_active = true;
        }
        if (body.classList.contains('hide-sidebar')) {
            misc.hide_sidebar_active = true;
        }
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            const $layer = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
            }
        });
    }
    onResize(event) {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    }

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    }

    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        const $toggle = document.getElementsByClassName('navbar-toggler')[0];
        if (this.mobile_menu_visible === 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            // if ($layer) {
            //     $layer.remove();
            // }

            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            const $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () {
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    }

    getTitle() {
        const uri: string = this.location.prepareExternalUrl(this.location.path());
        if (uri.indexOf(sessionStorage.getItem('nav')) < 0) {
            for (let i = 0; i < this.listTitles.length; i++) {
                if (this.listTitles[i].type === 'link') {
                    if (uri.indexOf(this.listTitles[i].path) > -1) {
                        sessionStorage.setItem('nav', this.listTitles[i].path);
                        sessionStorage.setItem('title', this.listTitles[i].title);
                        this.linkHelp = this.listTitles[i].help ? this.listTitles[i].help :
                        'https://sites.google.com/view/inventus-trainingweb/p%C3%A1gina-inicial';
                        return this.listTitles[i].title;
                    }
                } else {
                    if (this.listTitles[i].children) {
                        for (let y = 0; y < this.listTitles[i].children.length; y++) {
                            if (uri.indexOf(this.listTitles[i].children[y].path) > -1) {
                                sessionStorage.setItem('nav', uri);
                                sessionStorage.setItem('title', this.listTitles[i].children[y].title);
                                this.linkHelp = this.listTitles[i].children[y].help ? this.listTitles[i].children[y].help :
                                'https://sites.google.com/view/inventus-trainingweb/p%C3%A1gina-inicial';
                                return this.listTitles[i].children[y].title;
                            }
                        }
                    }
                }
            }
        } else {
            return sessionStorage.getItem('nav') ? sessionStorage.getItem('title') : '';
        }
        return 'welcome';
    }

    getPath() {
        return this.location.prepareExternalUrl(this.location.path());
    }

}
