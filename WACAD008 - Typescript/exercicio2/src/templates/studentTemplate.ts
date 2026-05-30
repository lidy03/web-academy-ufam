import classData from "../model/classData.js";

interface DOMStudent {
    studentTableBody: HTMLTableSectionElement;
    clear(): void;
    render(classData: classData): void;
}

export default class StudentTemplate implements DOMStudent{
    static instance: StudentTemplate = new StudentTemplate();

    studentTableBody: HTMLTableSectionElement;
    ul: HTMLUListElement;

    private constructor() {
        this.ul = document.getElementById("stats-list") as HTMLUListElement;
        this.studentTableBody = document.getElementById("student-table-body") as HTMLTableSectionElement;
    }

    clear (): void {
        this.studentTableBody.innerHTML = '';
        this.ul.innerHTML = '';
    }

    render(classData: classData): void {
        this.clear();

        classData.studentList.forEach(student => {
            const tr = document.createElement("tr");
            
            tr.innerHTML = `
                <td>${student.fullname}</td>
                <td>${student.age}</td>
                <td>${student.height.toFixed(2)} m</td>
                <td>${student.weight.toFixed(2)} kg</td>
                <td>
                    <button class="btn-edit" data-id="${student.id}">Editar</button>
                    <button class="btn-delete" data-id="${student.id}">Excluir</button>
                </td>
            `;

            this.studentTableBody.appendChild(tr);
        });

        const allStudents = classData.getStudentCount();
        const averageAge = classData.getAverageAge();
        const averageHeight = classData.getAverageHeight();
        const averageWeight = classData.getAverageWeight();

        this.ul.innerHTML = `
            <li>Total de alunos: ${allStudents}</li>
            <li>Idade média: ${averageAge} anos</li>
            <li>Altura média: ${averageHeight} m</li>
            <li>Peso médio: ${averageWeight} kg</li>
        `;
    }
}