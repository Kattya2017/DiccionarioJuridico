import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResultAbecedario } from 'src/app/interfaces/abecedario-interface';
import { Resp } from 'src/app/interfaces/palabra-interface';
import { AbecedarioService } from 'src/app/servicios/abecedario.service';
import { PalabraService } from 'src/app/servicios/palabra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-palabra',
  templateUrl: './palabra.component.html',
  styleUrls: ['./palabra.component.css'],
})
export class PalabraComponent implements OnInit {
  listPalabra?: Array<any>;
  listAbecedario?: Array<any>;
  palabraForm: FormGroup;
  palabraEditarForm: FormGroup;
  ids?: string | number;
  carga: boolean = false;
  p:number = 1;

  constructor(
    private palabraService: PalabraService,
    private abecedarioService: AbecedarioService,
    private fb: FormBuilder
  ) {
    this.palabraForm = this.fb.group({
      titulo: ['', Validators.required],
      titulo_shipibo: ['', Validators.required],
      descripcion: ['', Validators.required],
      descripcion_shipibo: ['', Validators.required],
      letra: ['', Validators.required],
    });
    this.palabraEditarForm = this.fb.group({
      titulo: ['', Validators.required],
      titulo_shipibo: ['', Validators.required],
      descripcion: ['', Validators.required],
      descripcion_shipibo: ['', Validators.required],
      letra: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarPalabra();
    this.mostrarAbecedario();
    
  }

  mostrarPalabra() {
    this.carga = true;
    if (this.carga) {
      Swal.fire({
        title: 'Cargando datos!',
        html: 'Por favor espere.',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.palabraService.getPalabraAbecedario().subscribe({
        next: (data:ResultAbecedario) => {
          console.log(data);
          this.listPalabra = data.resp;
          this.carga = false;
          if (!this.carga) {
            Swal.close();
          }
        },
        error: (error) => {
          this.carga = false;
          if (!this.carga) {
            Swal.close();
          }
          console.log(error);
        }
      });
    }
  }

  mostrarAbecedario() {
    this.abecedarioService.getAbecedario().subscribe({
      next: (data) => {
        this.listAbecedario = data.resp;
        console.log(this.listAbecedario);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  registrarPalabra() {
    const formData = new FormData();
    formData.append('titulo', this.palabraForm.get('titulo')?.value);
    formData.append('titulo_shipibo', this.palabraForm.get('titulo_shipibo')?.value);
    formData.append('descripcion', this.palabraForm.get('descripcion')?.value);
    formData.append('descripcion_shipibo', this.palabraForm.get('descripcion_shipibo')?.value );
    formData.append('id_abecedario', this.palabraForm.get('letra')?.value);
    this.palabraService.postPalabra(formData).subscribe({
      next: (data) => {
        Swal.fire('Registrado!',
        'Se registro la palabra con exito',
        'success'
        );
        this.mostrarPalabra();
        this.cancelar();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  modificarPalabra() {
    const formData = new FormData();
    formData.append('titulo', this.palabraEditarForm.get('titulo')?.value);
    formData.append('titulo_shipibo', this.palabraEditarForm.get('titulo_shipibo')?.value);
    formData.append('descripcion', this.palabraEditarForm.get('descripcion')?.value);
    formData.append('descripcion_shipibo', this.palabraEditarForm.get('descripcion_shipibo')?.value);
    formData.append('id_abecedario', this.palabraEditarForm.get('letra')?.value);
    this.palabraService.putPalabra(formData, this.ids!).subscribe({
      next: (data) => {
        console.log(data);
        Swal.fire('Editado!', 'Se edito la palabra con exito', 'success');
        this.mostrarPalabra();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  mostrarPalabraId(id: number) {
    this.palabraService.getPalabraId(id).subscribe({
      next: (data) => {
        this.palabraEditarForm.setValue({
          titulo: data.resp.titulo,
          titulo_shipibo: data.resp.titulo_shipibo,
          descripcion: data.resp.descripcion,
          descripcion_shipibo: data.resp.descripcion_shipibo,
          id_abecedario: data.resp.id_abecedario,
        });
        this.ids = data.resp.id;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ObtenerAbecedarioId(id: number) {
    this.palabraService.getPalabraId(id).subscribe({
      next: (data) => {
        this.palabraEditarForm.setValue({
          titulo: data.resp.titulo,
          titulo_shipibo: data.resp.titulo_shipibo,
          descripcion: data.resp.descripcion,
          descripcion_shipibo: data.resp.descripcion_shipibo,
          letra: data.resp.id_abecedario,
        });
        this.ids = data.resp.id;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  mostrarPalabraTipo(event: any) {
    console.log(event.target.value);
    this.mostrarPalabra();
  }

  cancelar() {
    this.palabraForm.setValue({
      titulo: '',
      titulo_shipibo: '',
      descripcion: '',
      descripcion_shipibo: '',
      letra: '',
    });
    this.palabraEditarForm.setValue({
      titulo: '',
      titulo_shipibo: '',
      descripcion: '',
      descripcion_shipibo: '',
      letra: '',
    });
  }
}
