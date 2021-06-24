
export class AgencyModel {
    constructor(
        public id?: string,
        public agencia?: string,
        public distrito?: string,
        public provincia?: string,
        public departamento?: string,
        public direccion?: string,
        public lat?: number,
        public lon?: number,
        public img?: string
    ) {
    }
}