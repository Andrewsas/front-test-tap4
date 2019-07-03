import { ActivatedRoute } from '@angular/router';

declare const $: any;

export class Util {

    public static isDateBeforeToday(date) {
        return date && new Date(date.toDateString()) < new Date(new Date().toDateString());
    }

    public static hideSideBar(): any {
        // Hide SideBar
        setTimeout(() => {
            if (!$('body').hasClass('sidebar-mini')) {
                $('#minimizeSidebar').click();
            }
        }, 250);
    }

    public static showSideBar(): any {
        // Hide SideBar
        setTimeout(() => {
            if ($('body').hasClass('sidebar-mini')) {
                $('#minimizeSidebar').click();
            }
        }, 250);
    }

    public static toDate(args?: string): Date {
        let date = new Date();

        if (args) {
            date = new Date(args);
        } else {
            return date;
        }

        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        const dateWithout = new Date(date.getTime() + userTimezoneOffset);

        return dateWithout;
    }

}
