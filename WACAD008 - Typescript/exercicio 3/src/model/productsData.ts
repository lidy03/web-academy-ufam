export interface commonData{
    id: string;
    model: string;
    manufacturer: string;
    price: number;
    type: 'TV' | 'Phone' | 'Bike';
}

export class TVData implements commonData {
    readonly type = 'TV';
    constructor(
        private _id: string,
        private _model: string,        
        private _resolution: string,
        private _size: number,
        private _manufacturer: string,
        private _price: number
    ){}

    get id() {
        return this._id;
    }

    get model() {
        return this._model;
    }
    
    get resolution() {
        return this._resolution;
    }

    get size() {
        return this._size;
    }

    get manufacturer() {
        return this._manufacturer;
    }
    
    get price() {
        return this._price;
    }
}

export class PhoneData implements commonData {
    readonly type = 'Phone';
    constructor(
        private _id: string,
        private _model: string,
        private _memory: string,
        private _manufacturer: string,
        private _price: number
    ) {}

    get id() {
        return this._id;
    }

    get model() {
        return this._model;
    }
    
    get memory() {
        return this._memory;
    }

    get manufacturer() {
        return this._manufacturer;
    }
    
    get price() {
        return this._price;
    }
}

export class BikeData implements commonData {
    readonly type = 'Bike';
    constructor(
        private _id: string,
        private _model: string,
        private __rimsize: number,
        private _manufacturer: string,
        private _price: number
    ){}

    get id() {
        return this._id;
    }

    get model() {
        return this._model;
    }
    
    get rimsize() {
        return this.__rimsize;
    }

    get manufacturer() {
        return this._manufacturer;
    }
    
    get price() {
        return this._price;
    }
}