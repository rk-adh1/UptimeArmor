import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IncidentComponent } from '../inc/incident/incident.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  components: any[] = []; // Array to hold dynamically added components

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  // addComponent(componentType: any) {
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
  //   const componentRef = this.viewContainerRef.createComponent(componentFactory);
  //   this.components.push(componentRef);
  // }

  // removeComponent(index: number) {
  //   this.components[index].destroy();
  //   this.components.splice(index, 1);
  // }

  // drop(event: any) {
  //   // Implement drop functionality here if needed
  // }
}
