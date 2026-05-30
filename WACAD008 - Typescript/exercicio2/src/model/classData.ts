import StudentData from "./studentData.js";

export interface classData {
    id: string;
    className: string;
    studentList: StudentData[];
    addStudent(student: StudentData): void;
    removeStudent(studentId: string): void;
    updateStudent(studentId: string, fullname: string, age: number, height: number, weight: number): void;
    getStudentCount(): number;
    getAverageAge(): number;
    getAverageHeight(): number;
    getAverageWeight(): number;
}

export default class ClassData implements classData {
    private __id: string;
    private __className: string;
    private __studentList: StudentData[] = [];

    static instance: ClassData = new ClassData();

    private constructor() {
        this.__id = "PE-Class";
        this.__className = "Turma de Educação Física";
    }

    get id(): string {
        return this.__id;
    }

    get className(): string {
        return this.__className;
    }

    get studentList(): StudentData[] {
        return this.__studentList;
    }

    addStudent(student: StudentData): void {
        this.__studentList.push(student);
    }

    removeStudent(studentId: string): void {
        this.__studentList = this.__studentList.filter(student => student.id !== studentId);
    }

    updateStudent(studentId: string, fullname: string, age: number, height: number, weight: number): void {
        const student = this.__studentList.find(student => student.id === studentId);
        if (student) {
            student.fullname = fullname;
            student.age = age;
            student.height = height;
            student.weight = weight;
        }
    }

    getStudentCount(): number {
        return this.__studentList.length;
    }

    getAverageAge(): number {
        if (this.__studentList.length === 0) return 0;
        const totalAge = this.__studentList.reduce((sum, student) => sum + student.age, 0);
        return parseFloat((totalAge / this.__studentList.length).toFixed(1));
    }

    getAverageHeight(): number {
        if (this.__studentList.length === 0) return 0;
        const totalHeight = this.__studentList.reduce((sum, student) => sum + student.height, 0);
        return parseFloat((totalHeight / this.__studentList.length).toFixed(2));
    }

    getAverageWeight(): number {
        if (this.__studentList.length === 0) return 0;
        const totalWeight = this.__studentList.reduce((sum, student) => sum + student.weight, 0);
        return parseFloat((totalWeight / this.__studentList.length).toFixed(2));
    }

}
