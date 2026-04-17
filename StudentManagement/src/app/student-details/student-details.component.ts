import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {
  showForm:boolean=false;
  studentForm!:FormGroup;
  students:any[]=[];

  constructor(private http:HttpClient, private fb:FormBuilder){
    
  }
  ngOnInit(){
    this.getStudents();
    this.studentForm=this.fb.group({
      // id:new FormControl(0),
      // name:[''],
      // email:[''],
      // phone:[''],
      // city:[''],
      // state:[''],
      // gender:['']
      id:new FormControl(0),
      name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      email:[null,[Validators.required,Validators.email,Validators.maxLength(30)]],
      phone:[null,[Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
      city:[null,[Validators.required,Validators.maxLength(30)]],
      state:[null,[Validators.required,Validators.maxLength(30)]],
      gender:[null,[Validators.required,Validators.maxLength(30)]]
    })
  }
  getStudents(){
    this.http.get<any[]>('https://localhost:7108/api/Student/getStudent')
    .subscribe({
    next:(data)=>{
      console.log(data);
      this.students=data;
    },
    error:(err)=>{
      console.log(err);
    }
  });
}

addStudent(){
  console.log(this.studentForm.value);
  this.http.post('https://localhost:7108/api/Student/add',this.studentForm.value)
  .subscribe({
    next:(data)=>{
      console.log(data);
      this.students.push(data);
      this.getStudents();
      this.studentForm.reset();
      this.showForm=false;
    },
    error:(err)=>{
      console.log(err);
    }
  });
}

editStudent(student:any){
  this.studentForm.patchValue(student);
  this.showForm=true;
}
updateStudent(){
  console.log(this.studentForm.value);
  this.http.put(`https://localhost:7108/api/Student/update/${this.studentForm.value.id}`,this.studentForm.value)
  .subscribe({
    next:(data)=>{
      console.log(data);
      this.getStudents();
      this.studentForm.reset();
      this.showForm=false;
    }
  })
}

deleteStudent(id:number){
  console.log("sID",id);
  if(confirm("Are you sure want to delete?"))
  this.http.put(`https://localhost:7108/api/Student/delete/${id}`,{})
  .subscribe({
    next:(res)=>{
      console.log(res);

      this.getStudents();
    }
  })
}

onSubmit(){
  if(this.studentForm.value.id){
    this.updateStudent();
  }
  else{
    this.addStudent();
  }
}
}