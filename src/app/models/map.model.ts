export class MapPositionModel {
    constructor(
        public lat: number = 0,
        public lng: number = 0
    ) {

    }
}


export class MapLabel {
    constructor(
        public color: string = '',
        public text: string = '') {

    }
}
