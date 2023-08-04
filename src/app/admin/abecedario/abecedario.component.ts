import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbecedarioService } from 'src/app/servicios/abecedario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-abecedario',
  templateUrl: './abecedario.component.html',
  styleUrls: ['./abecedario.component.css']
})
export class AbecedarioComponent implements OnInit{
listAbecedario?:Array<any>;
abecedarioForm:FormGroup;
abecedarioEditarForm:FormGroup;
ids?: string | number;
estado: string = '1';
carga: boolean = false;
p: number = 1;

constructor(
  private abecedarioService: AbecedarioService,
  private fb: FormBuilder
  ){
  this.abecedarioForm = this.fb.group({
    abecedario: ['', Validators.required],
    abecedario_shipibo: ['', Validators.required],
    titulo: ['',Validators.required],
    titulo_shipibo: ['',Validators.required]
  });
  this.abecedarioEditarForm = this.fb.group({
    abecedario:['', Validators.required],
    abecedario_shipibo:['', Validators.required],
    titulo:['',Validators.required],
    titulo_shipibo:['',Validators.required]
  });
}

ngOnInit(): void {
  this.mostrarAbecedario();
}


mostrarAbecedario(){
this.carga = true;
if(this.carga){
  Swal.fire({
    title:'Cargando datos!',
    html:'Por favor espere',
    timerProgressBar: true,
    didOpen: () =>{
      Swal.showLoading();
    },
  });
}
this.abecedarioService.getAbecedario(this.estado).subscribe({
  next:(data)=>{
    this.listAbecedario = data.resp;
    this.carga = false;
    if(!this.carga){
      Swal.close();
    }
  },
  error:(error)=>{
    this.carga = false;
    if(!this.carga){
      Swal.close();
    }
    console.log(error);
  }
});
}

registrarAbecedario(){
const formData = new FormData();
formData.append('abecedario', this.abecedarioForm.get('abecedario')?.value);
formData.append('abecedario_shipibo', this.abecedarioForm.get('abecedario_shipibo')?.value);
formData.append('titulo', this.abecedarioForm.get('titulo')?.value);
formData.append('titulo_shipibo', this.abecedarioForm.get('titulo_shipibo')?.value);
this.abecedarioService.postAbecedario(formData).subscribe({
  next:(data)=>{
    Swal.fire(
      'Registrado!',
      'Se registro el abecedario con exito',
      'success'
    );
    this.mostrarAbecedario();
    this.cancelar();
  },
  error:(error)=>{
    console.log(error);
    
  }
}
);
}

modificarAbecedario(){
const formData = new FormData();
formData.append('abecedario', this.abecedarioEditarForm.get('abecedario')?.value);
formData.append('abecedario_shipibo', this.abecedarioEditarForm.get('abecedario')?.value);
formData.append('titulo', this.abecedarioEditarForm.get('titulo')?.value);
formData.append('titulo_shipibo', this.abecedarioEditarForm.get('titulo_shipibo')?.value);
this.abecedarioService.putAbecedario(formData, this.ids!).subscribe({
  next:(data)=>{
    Swal.fire(
      'Editado!',
      'Se edito el abecedario con exito',
      'success'
      );
      this.mostrarAbecedario();
  },
  error:(error)=>{
    console.log(error);
    
  }
}
);
}

eliminarAbecedario(id:number, estado:number){
Swal.fire({
  title:'Estas seguro?',
  text:
    estado==1? 'El abecedario sera habilitado':'El abecedario sera deshabilitado',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, estoy seguro!',
  cancelButtonText: 'Cancelar',
}).then((result)=>{
  if(result.isConfirmed){
    this.abecedarioService.deleteAbecedario(id,estado).subscribe({
      next:(data)=>{
        this.mostrarAbecedario();
        Swal.fire(
          estado == 1?'Habilitado':'Deshabilitado',
          'Correcto',
          'success'
        );
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }
});
}

ObtenerAbecedarioId(id:number){
  this.abecedarioService.getAbecedarioId(id).subscribe({
    next:(data)=>{
      this.abecedarioEditarForm.setValue({
        abecedario: data.resp.abecedario,
        abecedario_shipibo: data.resp.abecedario_shipibo,
        titulo:data.resp.titulo,
        titulo_shipibo:data.resp.titulo_shipibo
      });
      this.ids = data.resp.id;
    },
    error:(error)=>{
      console.log(error);
    }
  });
}

mostrarAbecedarioTipo(event:any){
  console.log(event.target.value);
  this.estado = event.target.value;
  this.mostrarAbecedario();
}

cancelar(){
  this.abecedarioForm.setValue({
    abecedario:'',
    abecedario_shipibo:'',
    titulo:'',
    titulo_shipibo:'',
  });
  this.abecedarioEditarForm.setValue({
    abecedario:'',
    abecedario_shipibo:'',
    titulo:'',
    titulo_shipibo:'',
  })
}

}
