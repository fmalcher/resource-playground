import { Component, effect, resource, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected params = signal<string | undefined>('first params');

  protected myResource = resource({
    params: () => this.params(),
    loader: ({ params }) => new Promise<string>((resolve, reject) => setTimeout(() => {
      if (params === 'error') {
        return reject(new Error('ERROR! ' + Date.now()));
      }
      return resolve(`${params} ${Date.now()}`);
    }, 1500)),
    defaultValue: 'DEFAULT'
  });

  constructor() {
    effect(() => {
      console.log('### PARAMS', this.params());
    });

    effect(() => {
      console.log('status', this.myResource.status());
    });

    effect(() => {
      console.log('isLoading', this.myResource.isLoading());
    });

    effect(() => {
      console.log('hasValue', this.myResource.hasValue());
    });

    effect(() => {
      console.log('value', this.myResource.value());
    });

    effect(() => {
      console.log('error', this.myResource.error());
    });

  }
}
