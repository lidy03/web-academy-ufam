import './css/style.css' 
import ClassData from "./model/classData";
import StudentData from "./model/studentData";
import StudentTemplate from "./templates/studentTemplate";

const studentForm = document.getElementById('student-form') as HTMLFormElement;
const btnAuto = document.getElementById('btn-auto') as HTMLButtonElement;
const studentTableBody = document.getElementById('student-table-body') as HTMLTableSectionElement;
const btnCancel = document.getElementById("btn-cancel") as HTMLButtonElement;

const initApp = (): void => {
    const peclass = ClassData.instance;
    const template = StudentTemplate.instance;

    let editingStudentId: string | null = null;

    const addStudentAuto = async (): Promise<void> => {
        try {
            const response = await fetch('https://randomuser.me/api/');
            if (!response.ok) throw new Error('Erro ao acessar API random user');

            const data = await response.json();
            const studentAPI = data.results[0];
            const fullname = `${studentAPI.name.first} ${studentAPI.name.last}`;
            const age = studentAPI.dob.age;
            const height = parseFloat((Math.random() * (2.0 - 1.5) + 1.5).toFixed(2));
            const weight = parseFloat((Math.random() * (100 - 50) + 50).toFixed(1));
            const id = `student-${Date.now()}`;

            const newStudent = new StudentData(id, fullname, age, height, weight);
            peclass.addStudent(newStudent);
            template.render(peclass);
        } catch (error) {
            console.error('Error fetching random user:', error);
            alert("Não foi possível conectar a API random user");
        }
    };

    if (btnAuto) {
        btnAuto.addEventListener('click', (): void => {
            addStudentAuto();
        });
    }

    if (studentForm) {
        studentForm.addEventListener('submit', (event: SubmitEvent): void => {
            event.preventDefault();

            const fullnameInput = document.getElementById('student-name') as HTMLInputElement;
            const ageInput = document.getElementById('student-age') as HTMLInputElement;
            const heightInput = document.getElementById('student-height') as HTMLInputElement;
            const weightInput = document.getElementById('student-weight') as HTMLInputElement;
            const btnsubmit = studentForm.querySelector("button[type='submit']") as HTMLButtonElement;

            const fullname: string = fullnameInput.value.trim();
            const age: number = parseInt(ageInput.value);
            const height: number = parseFloat(heightInput.value);
            const weight: number = parseFloat(weightInput.value);

            if (!fullname || isNaN(age) || isNaN(height) || isNaN(weight)) {
                alert("Por favor, preencha todos os campos corretamente.");
                return;
            }

            try {
                if (editingStudentId) {
                    peclass.updateStudent(editingStudentId, fullname, age, height, weight);
                    editingStudentId = null;
                    btnsubmit.textContent = "Adicionar";
                } else {
                    const id = `studentmanual-${Date.now()}`;
                    const newStudent = new StudentData(id, fullname, age, height, weight);
                    peclass.addStudent(newStudent);
                }

                studentForm.reset();
                template.render(peclass);
            } catch (error: any) {
                alert(error.message);
            }
        });

        if (btnCancel) {
            btnCancel.addEventListener('click', (): void => {
                studentForm.reset(); 
                editingStudentId = null; 
                
                const btnsubmit = studentForm.querySelector("button[type='submit']") as HTMLButtonElement;
                if (btnsubmit) {
                    btnsubmit.textContent = "Adicionar";
                }
            });
        }
    }

    if (studentTableBody) {
        studentTableBody.addEventListener('click', (event: MouseEvent): void => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('btn-delete')) {
                const id = target.getAttribute('data-id');
                if (id) {
                    peclass.removeStudent(id);
                    
                    if(id === editingStudentId) {
                        editingStudentId = null;
                        studentForm.reset();
                        const btnsubmit = studentForm.querySelector("button[type='submit']") as HTMLButtonElement;
                        btnsubmit.textContent = "Adicionar";
                    }

                    template.render(peclass);
                }
            }

            if(target.classList.contains('btn-edit')) {
                const id = target.getAttribute('data-id');
                const student = peclass.studentList.find(s => s.id === id);
                if(id && student) {
                    editingStudentId = id;
                    const fullnameInput = document.getElementById('student-name') as HTMLInputElement;
                    const ageInput = document.getElementById('student-age') as HTMLInputElement;
                    const heightInput = document.getElementById('student-height') as HTMLInputElement;
                    const weightInput = document.getElementById('student-weight') as HTMLInputElement;
                    const btnsubmit = studentForm.querySelector("button[type='submit']") as HTMLButtonElement;
                    
                    fullnameInput.value = student.fullname;
                    ageInput.value = student.age.toString();
                    heightInput.value = student.height.toString();
                    weightInput.value = student.weight.toString();
                    btnsubmit.textContent = "Salvar";
                    fullnameInput.focus();
                }
            }
        });
    }

    template.render(peclass);
};

document.addEventListener("DOMContentLoaded", initApp);