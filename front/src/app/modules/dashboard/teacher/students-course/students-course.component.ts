import {AfterViewInit, Component, OnInit , Input, SimpleChanges, OnChanges,  ViewChild} from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { Users } from 'src/app/core/interfaces/users/user.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttendanceService } from 'src/app/core/services/attendance/attendance.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-students-course',
  templateUrl: './students-course.component.html',
  styleUrls: ['./students-course.component.css']
})
export class StudentsCourseComponent implements OnInit, OnChanges ,AfterViewInit{
  @Input() idcourse: any = null;
  course:boolean = false
  displayedColumns: string[] = ['firstname', 'lastname', 'username', 'email', 'button' ]; 
  dataSource = new MatTableDataSource<Users>();

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private http:UserService, private attendance:AttendanceService, private toastService:ToastService  ) { }

  ngOnInit(): void {
    // Se llama a la función inicialmente al cargar el componente
    this.getEstudiantes();


  }

  ngOnChanges(changes: SimpleChanges): void {
    // Detectar cambios en la propiedad 'course' y llamar a la función si cambia
    if (changes["idcourse"] && !changes["idcourse"].firstChange) {

      this.getEstudiantes();
      this.comprobaridcourse();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
  }
  comprobaridcourse(){
if (this.idcourse == null || this.idcourse == 0 ){
  this.course = false
}else{
  this.course = true
}

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
  getEstudiantes(): void {

    const url= `/courses/${this.idcourse}/users`
    this.http.getStudents<any>(url).subscribe(
      (data: Users[]) => {
        this.dataSource.data = data; 
      },
      error => {
       console.log(error)
      }
    );
       
  }
  attendanceFunction(userId:any, courseId:any, statusId:any){
    const date = new Date();
    const url= `/attendance/`
    const body = { "userId": userId, "courseId": courseId,"statusId":statusId,"date":date.toISOString() }
    
    this.attendance.post<any>(url,body).subscribe(
      (data:any) => {
        const attendance = data; 
        console.log(attendance)
      },
      (err) => {
        const { error } = err.error;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 409) {
            this.toastService.presentToast(error);
          }
        }
      }
    );
  }
}

