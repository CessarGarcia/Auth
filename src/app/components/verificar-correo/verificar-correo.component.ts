import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})
export class VerificarCorreoComponent implements OnInit {
  emailSend= "https://thumbs.dreamstime.com/b/icono-enviado-correo-del-electr%C3%B3nico-con-la-sombra-larga-108517859.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
