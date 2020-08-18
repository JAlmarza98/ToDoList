import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(public tareasService: TareasService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() { }

  listaSeleccionada(lista: Lista) {

    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }

  }

  borrarLista(lista: Lista) {

    this.tareasService.borrarLista(lista);

  }

  async editarLista(lista: Lista) {

    const alert = await this.alertCtrl.create({
      header: 'Renombrar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la tarea'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
            this.lista.closeSlidingItems();

          }
        },
        {
          text: 'Renombrar',
          handler: (data) => {

            if (data.titulo.length === 0) {
              return
            }

            lista.titulo = data.titulo;

            this.tareasService.guardarStorage();

            this.lista.closeSlidingItems();

          }
        }
      ]
    });

    alert.present();


  }
}
