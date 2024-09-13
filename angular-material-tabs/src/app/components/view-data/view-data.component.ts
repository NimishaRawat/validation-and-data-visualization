import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartOptions, ChartData, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter for Chart.js
import { CommonModule } from '@angular/common';
import { DataService } from '../../service/data.service'; 

// Register Chart.js components
Chart.register(...registerables);

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  dataEntries: { datetime: Date, temperature: number }[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Subscribe to data changes
    this.dataService.data$.subscribe(data => {
      this.dataEntries = data;
      if (this.chart) {
        this.updateChart(data); // Update chart whenever data changes
      }
    });
  }

  ngAfterViewInit() {
    // Initialize the chart after view is fully initialized
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: [], // Placeholder for datetime labels
        datasets: [{
          label: 'Temperature',
          data: [], // Placeholder for temperature data
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1
        }]
      },
      options: this.getChartOptions()
    });
  }

  getChartOptions(): ChartOptions {
    return {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day', // Adjust time unit as needed
            tooltipFormat: 'll', // Format for the tooltip
          },
          title: {
            display: true,
            text: 'Date and Time'
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Temperature (°C)'
          }
        }
      }
    };
  }

  updateChart(newData: { datetime: Date, temperature: number }[]) {
    if (this.chart) {
      // Update chart data
      this.chart.data.labels = newData.map(d => d.datetime);
      this.chart.data.datasets[0].data = newData.map(d => d.temperature);
      this.chart.update(); // Refresh the chart
    }
  }
}
