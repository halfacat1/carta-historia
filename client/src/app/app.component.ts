import { Component, OnInit } from '@angular/core';
import * as vega from 'vega';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private view: vega.View;

  ngOnInit(): void {
    console.log('wat');
    vega.loader()
      .load('https://vega.github.io/vega/examples/bar-chart.vg.json')
      .then(function(data) { this.view = this.render(JSON.parse(data)); });
  }

  render(spec): vega.View {
    let result = new vega.View(vega.parse(spec))
      .renderer('canvas')  // set renderer (canvas or svg)
      .initialize('#view') // initialize view within parent DOM container
      .hover()             // enable hover encode set processing
      .run();
    return result;
  }
}
