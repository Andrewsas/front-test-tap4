import { Router } from '@angular/router';
import { OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { MessageType, IconType, MessageText } from '../../constant/constant';

import { CrudService } from 'src/app/service/crud/crud.service';
import { GenericService } from 'src/app/service/generic/GenericService';
import { AuthGuardService } from 'src/app/security/auth-guard/authguard.service';

export abstract class GenericListComponent<TModel extends any, TService extends CrudService<TModel>> implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('table') table: any;

    public displayedColumns = [];
    public dataSource: MatTableDataSource<TModel>;
    public list: TModel[];
    public refresh: Boolean = false;
    public all: Boolean = false;
    public up: Boolean = false;
    public del: Boolean = false;
    public cre: Boolean = false;
    public itensPage: Number[] = [10, 20, 40, 80];
    // public search: any = {
    //     erased: false
    // };

    constructor(
        public service: TService,
        public router: Router,
        public genericService: GenericService,
        public auth?: AuthGuardService,
        public guard?: String,
    ) {
        if (guard) {
            this.up = this.auth.validaPermission(this.guard, 'UPDATE');
            this.del = this.auth.validaPermission(this.guard, 'DELETE');
            this.cre = this.auth.validaPermission(this.guard, 'CREATE');
        }
    }

    ngOnInit() {
        this.initOn();
      }

    protected initOn = () => {
        this.dataSource = new MatTableDataSource(this.list);
        this.refreshData();
        if (localStorage.getItem('lang') === 'pt') {
            this.paginator._intl.itemsPerPageLabel = 'Itens por pagina:';
            this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
                return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ' de ' + length;
            };
        }
    }

    getFilteredRows(): Array<TModel> {
        if (this.dataSource) {
            return this.dataSource.filteredData;
        } else {
            return [];
        }
    }

    protected refreshData = () => {
        this.refresh = true;

        if (this.genericService.getCacheTable(this.genericService.getLocation())) {
            this.dataSource.data = <TModel[]>this.genericService.getCacheTable(this.genericService.getLocation());
        }

        this.service.getAll().subscribe(
            (list) => {
                this.dataSource.data = list;
                sessionStorage.setItem(this.genericService.getLocation(), JSON.stringify(this.dataSource.data));
                // Util.hideSideBar();
                this.refresh = false;
            }, (error) => {
                this.genericService.onError(error);
                this.refresh = false;
            }
        );
    }

    public edit = (obj: TModel) => {
        this.router.navigate([this.genericService.getLocation() + '/form', obj.id.toString()]);
    }

    public copy = (obj: TModel) => {
        this.router.navigate([this.genericService.getLocation() + '/copy', obj.id.toString()]);
    }

    public newRouter = (obj: TModel, path: String) => {
        this.router.navigate([this.genericService.getLocation() + `/${path}`, obj.id.toString()]);
    }

    public view = (obj: TModel) => {
        this.router.navigate([this.genericService.getLocation() + '/view', obj.id.toString()]);
    }

    public newRecord = () => {
        this.router.navigate([this.genericService.getLocation() + '/form']);
    }

    public delete = (obj: any) => {
        this.service.delete(obj.id).subscribe(
            success => {
                this.refreshData();
                if (!obj.deleted) {
                    this.genericService.toats(MessageText.DELETE, MessageType.SUCCESS, IconType.DELETE);
                } else {
                    this.genericService.toats(MessageText.RECOVERY, MessageType.SUCCESS, IconType.NOTIFICATION);
                }
            }
        );
    }

    public viewDeleted(deleted: boolean) {
        // this.search.erased = deleted;
        this.all = false;
        this.refreshData();
    }

    public allRegister() {
        this.all = true;
        this.refreshData();
    }

    // configurações da tabela
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: TModel, filter: string) => {
            if (JSON.stringify(data).toLowerCase().indexOf(filter) > 0) {
                return true;
            }
            return false;
        };

        setTimeout(function () {
            this.displayedColumns = this.table._contentColumnDefs._results.map(o => o.name);
        }.bind(this), 0);
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
}
