import { SortDirection } from './constants';
import Datagrid from './Datagrid';
export declare const DEFAULT_LIMIT = 25;
export declare class DatagridState<Item = any> {
    parent: Datagrid;
    private state;
    constructor(parent: Datagrid);
    get isLoading(): boolean;
    startLoading(): void;
    stopLoading(): void;
    get data(): Array<Item>;
    set data(data: Array<Item>);
    get hasError(): boolean;
    get errorMessage(): string | undefined;
    get sortBy(): string | undefined;
    get sortDir(): SortDirection;
    setSuccess(data: Array<Item>, pagination: {
        limit: number;
        page: number;
        count?: number;
    }): void;
    setError(error: string, errors?: {
        [field: string]: string;
    }, resetData?: boolean): void;
    setSort(field: string, direction: SortDirection): void;
}