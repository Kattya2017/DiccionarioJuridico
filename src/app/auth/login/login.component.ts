import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataLoginA: FormGroup;

  constructor(
    private loginService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ){
    this.dataLoginA = this.fb.group({
      usuario: ['', Validators.required],
      password:['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }


  login(){
    const formData = new FormData();
    formData.append('usuario', this.dataLoginA.get('usuario')?.value);
    formData.append('password', this.dataLoginA.get('password')?.value);
    this.loginService.login(formData).subscribe({
      next:(data)=>{
        console.log(data);
        if(data.ok === false){
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Usuario o contraseña incorrecto',
            showConfirmButton: false,
            timer: 1500,
          });
        }else if(data.ok===true){
          const cargo = data.user.Rol.sigla;
          console.log(cargo);
  
          sessionStorage.setItem('carga','0');
          sessionStorage.setItem('x-token', data.token);
          sessionStorage.setItem('usuario', data.user.usuario);
          sessionStorage.setItem('cargo',data.user.Rol.sigla)
          sessionStorage.setItem('personal',`${data.user.nombre}`);
          if (cargo==='UA') {
            this.router.navigateByUrl('/admin');
          }}
        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }

}
