import { XlsTable, XlsTableColumn } from './xls-table';
import { XlsExport } from './xls-export';

import { GenericListComponent } from '../generic-list/generic-list.component'

declare const nvl: any;

export type ExportSrc<T> = GenericListComponent<T, any> | Array<T>;

export class InstanceFactory<T> {
    private newObj: { new(): T };

    constructor(
        newObj: { new(): T }) {
        this.newObj = newObj;
    }

    get(): T {
        return new this.newObj();
    }
}

export class ExportFactory {

    static tableFromEntity<T>(sourceData: ExportSrc<T>, newObj: { new(): T }): XlsTable<T> {
        const factory = new InstanceFactory<T>(newObj);

        let data = new Array<T>();
        if (sourceData instanceof GenericListComponent) {
            data = sourceData.getFilteredRows();
        } else {
            data = sourceData;
        }


        const cols = new Array<XlsTableColumn<any>>();
        // if (factory.get() instanceof Class) {

        //     cols.push(
        //         ...[
        //             new XlsTableColumn<Class>('Treinamento', o => o.training_name),
        //             new XlsTableColumn<Class>('Dt.Inicio', o => o.starts_at),
        //             new XlsTableColumn<Class>('Dt.Inicio', o => o.ends_at),
        //             new XlsTableColumn<Class>('Vagas', o => o.limit),
        //             new XlsTableColumn<Class>('Horario', o => o.duration),
        //             new XlsTableColumn<Class>('Local', o => o.local),
        //             new XlsTableColumn<Class>('Professor', o => o.professor_name),
        //             new XlsTableColumn<Class>('Responsavel', o => o.responsible_name)
        //         ]);
        // } else if (factory.get() instanceof Training) {
        //     cols.push(
        //         ...[
        //             new XlsTableColumn<Training>('Treinamento', o => o.name),
        //             new XlsTableColumn<Training>('Tipo Treinamento', o => o.type),
        //             new XlsTableColumn<Training>('Valor', o => o.total_cost),
        //             new XlsTableColumn<Training>('Planejado', o => o.planned ? 'Sim' : 'Não'),
        //             new XlsTableColumn<Training>('Descricao', o => o.description),
        //             new XlsTableColumn<Training>('Carga Horaria', o => o.hours),
        //             new XlsTableColumn<Training>('Justificativa', o => o.justification)
        //         ]);
        // } else if (factory.get() instanceof PlayList) {
        //     cols.push(
        //         ...[
        //             new XlsTableColumn<Training>('Treinamento', o => o.name),
        //             new XlsTableColumn<Training>('Descricao', o => o.description)
        //         ]);
        // }

        return new XlsTable(data, cols);
    }

    static exportAndSave(xlsx: XlsExport, callbacke) {

        try {
            XlsExport.saveAsFile(xlsx).subscribe(
                success => {
                    return callbacke(true)
                },
                error => {
                    return callbacke(false)
                });

        } catch (err) {
            return callbacke(false)
        }
    }
}
