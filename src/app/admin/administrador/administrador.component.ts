import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {
listAdministrador?: Array<any>;
administradorForm:FormGroup;
administradorEditarForm:FormGroup;
ids?: string | number;
estado : string = '1';
carga: boolean = false;
p: number = 1;

constructor(
  private administradorService: AdministradorService,
  private fb: FormBuilder
){
  this.administradorForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    usuario: ['', Validators.required],
    password: ['', Validators.required]
  });
  this.administradorEditarForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    usuario: ['', Validators.required],
    password: ['', Validators.required]
  });
}

ngOnInit(): void {
this.mostrarAdministrador();
}


mostrarAdministrador(){
  this.carga = true;
  if (this.carga) {
    Swal.fire({
      title:'Cargando datos!',
      html:'Por favor espere',
      timerProgressBar: true,
      didOpen:()=>{
        Swal.showLoading();
      },
    });
  }
  this.administradorService.getAdministrador(this.estado).subscribe({
    next:(data)=>{
      this.listAdministrador = data.resp;
      console.log(this.listAdministrador);
      this.carga = false;
      if (!this.carga) {
        Swal.close();
      }
    },
    error:(error)=>{
      this.carga = false;
      if (!this.carga) {
        Swal.close();
      }
      console.log(error);
    }
  });
}


registrarAdministrador(){
  const formData = new FormData();
  formData.append('nombre', this.administradorForm.get('nombre')?.value);
  formData.append('apellido', this.administradorForm.get('apellido')?.value);
  formData.append('usuario', this.administradorForm.get('usuario')?.value);
  formData.append('password', this.administradorForm.get('password')?.value);
  this.administradorService.postAdministrador(formData).subscribe({
    next:(data)=>{
      console.log(data);
      Swal.fire(
        'Registrado!',
        'Se registro el administrador con exito',
        'success'
      );
      this.mostrarAdministrador();
      this.cancelar();
    },
    error:(error)=>{
      console.log(error);
    }
  });
}


modificarAdministrador(){
  const formData = new FormData();
  formData.append('nombre', this.administradorEditarForm.get('nombre')?.value);
  formData.append('apellido', this.administradorEditarForm.get('apellido')?.value);
  formData.append('usuario', this.administradorEditarForm.get('usuario')?.value);
  formData.append('password', this.administradorEditarForm.get('password')?.value);
  this.administradorService.putAdministrador(formData, this.ids!).subscribe({
    next:(data)=>{
      this.mostrarAdministrador();
      console.log(data);
      Swal.fire(
        'Editado!',
        'Se edito el administrador con exito',
        'success'
      );
      this.mostrarAdministrador();
    },
    error:(error)=>{
      console.log(error);
    }
  });
}


eliminarAdministrador(id:number, estado:number){
  Swal.fire({
    title:'Estas seguro?',
    text: estado==1? 'El administrador sera habilitado':'El administrador sera deshabilitado',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, estoy seguro!',
    cancelButtonText: 'Cancelar',
  }).then((result)=>{
    if(result.isConfirmed){
      this.administradorService.deleteAdministrador(id, estado).subscribe({
        next:(data)=>{
          this.mostrarAdministrador();
          Swal.fire(
            estado == 1?'Habilitado':'Deshabilitado',
            'Correcto',
            'success'
          );
          console.log(data);
        },
        error:(error)=>{
          console.log(error);
        }
      });
    }
  });
}


obtenerAdministradorId(id:number){
  this.administradorService.getAdministradorId(id).subscribe({
    next:(data)=>{
      this.administradorEditarForm.setValue({
        nombre: data.resp.nombre,
        apellido: data.resp.apellido,
        usuario: data.resp.usuario,
        password: data.resp.password
      });
      this.ids = data.resp.id;
    },
    error:(error)=>{
      console.log(error);
    }
  });
}


mostrarAdministradorTipo(event:any){
  console.log(event.target.value);
  this.estado = event.target.value;
  this.mostrarAdministrador();
}


cancelar(){
  this.administradorForm.setValue({
    nombre:'',
    apellido:'',
    usuario:'',
    password:''
  });
  this.administradorEditarForm.setValue({
    nombre:'',
    apellido:'',
    usuario:'',
    password:''
  });
}

}
