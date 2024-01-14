export interface Movie {
    title: string;
    overview: string;
    genres: Genre[];
    release_date: Date;
    runtime: number;
    vote_average: number;
}
export interface Genre {
    id: number;
    name: string;
}
export interface Database {
    findAll(page: number, pageSize: number): Page<Movie>;
}
export interface Page<T> {
    page: number;
    pageSize: number;
    totalPages: number;
    content: T[];
}
export declare class CsvDatabase implements Database {
    private movies;
    constructor();
    findAll(page: number, pageSize: number): Page<Movie>;
}
//# sourceMappingURL=movies.d.ts.map