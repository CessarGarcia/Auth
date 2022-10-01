import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { RecoveryPasswordComponent } from "./components/recovery-password/recovery-password.component";
import { RegistrarUsuarioComponent } from "./components/registrar-usuario/registrar-usuario.component";
import { VerificarCorreoComponent } from "./components/verificar-correo/verificar-correo.component";

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'}, //Por buenas practicas agregamos este path al principio
    {path: 'login', component: LoginComponent},
    {path: 'registrar-usuario', component: RegistrarUsuarioComponent},
    {path: 'verificar-correo', component: VerificarCorreoComponent},
    {path: 'recuperar-password', component: RecoveryPasswordComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '**', redirectTo: 'login', pathMatch: 'full'}, //Por buenas practicas este path al final

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}

