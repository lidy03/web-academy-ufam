export interface StudentData {
    id: string;
    fullname: string;
    age: number;
    height: number;
    weight: number;
}

export default class studentData implements StudentData {
    constructor(
        private _id: string,
        private _fullname: string,
        private _age: number,
        private _height: number,
        private _weight: number
    ) {}

     get id(): string {
        return this._id;
    }

    get fullname(): string {
        return this._fullname;
    }
    get age(): number {
        return this._age;
    }
    get height(): number {
        return this._height;
    }
    get weight(): number {
        return this._weight;
    }

    set fullname(studentname: string) {
        if(studentname.trim()==="") throw new Error ("O nome do aluno não pode ser vazio");  
        this._fullname = studentname;
    }

    set age(studentage: number) {
        if(studentage < 0) throw new Error ("A idade do aluno não deve ser menor que zero");
        this._age = studentage;
    }

    set height(studentheight: number) {
        if(studentheight <= 0) throw new Error ("A altura do aluno não deve ser menor que zero");
        this._height = studentheight;
    }
    
    set weight(studentweight: number) {
        if(studentweight <= 0) throw new Error ("O peso do aluno não deve ser menor que zero");
        this._weight = studentweight;
    }
}