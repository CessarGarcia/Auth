import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import{AuthErrorService} from 'src/app/services/auth-error.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  registro_img = "https://cdn-icons-png.flaticon.com/512/3534/3534138.png";
  errorIcon = "https://cutt.ly/TVNjRs3";

  registrarUsuario: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private routes: Router,
    private authErrorService: AuthErrorService) {
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
  }

  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;
    /* Verificar Passwords */
    if (password !== repetirPassword) {
      this.toastr.error('Las contraseñas no son las mismas', "Error");
      return;
    }
    this.loading = true;

    /* Creación de usuarios por Email y contraseña */
    this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.verificarCorreo();
    }).catch((error) => {
      this.loading = false;
      console.log(error);
      this.toastr.error(this.authErrorService.firebaseError(error.code), 'Error');
    });
  }

  verificarCorreo(){
    this.afAuth.currentUser.then((user) => user?.sendEmailVerification()).then(() => {
      this.toastr.info('Le hemos enviado un correo electronico para verificar su cuenta', 'Verificar Correo');
      this.routes.navigate(['/login']);
    });
  }
}
