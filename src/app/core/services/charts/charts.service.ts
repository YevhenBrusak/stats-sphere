import { Injectable } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor() { }

  drawDonutChart(canvasID: string, labels: any, data: any, label: string, backgroundColors: string[]) {
    return new Chart(canvasID, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          borderWidth: 0, // Remove border
          hoverBorderWidth: 0, // Remove hover border
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12, // Increase legend box size
              padding: 15, // Increase legend padding
              font: {
                family: "'Inter', sans-serif", // Set custom font
                size: 14, // Increase font size
              },
              color: '#495057', // Change legend text color
            },
          },
          title: {
            display: true, // Remove chart title
            text: label,
          },
        },
        cutout: '60%', // Increase cutout size for a modern look
      },
    })
  }

  drawBarChart(canvasID: string, labels: any, data: any, label: string): Chart {
    return new Chart(canvasID, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: '#3e95cd',
            label: label,
            backgroundColor: 'rgba(93, 175, 89, 0.1)',
            borderWidth: 3,
          },
        ],
      },
    });
  }

  drawLineChart(canvasId: string, labels: any, data: any, label: string): Chart {
    return new Chart(canvasId, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,

      }
    });
  }
  drawPolarAreaChart(canvasId: string, labels: string[], data: number[], title: string): void {
    new Chart(canvasId, {
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [
          {
            label: title,
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)', // Червоний
              'rgba(54, 162, 235, 0.6)',  // Синій
              'rgba(255, 206, 86, 0.6)',  // Жовтий
              'rgba(75, 192, 192, 0.6)',  // Зелений
              'rgba(153, 102, 255, 0.6)'  // Фіолетовий
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Вимикаємо відображення легенди
          },
          title: {
            display: true,
            text: title
          }
        },
        scales: {
          r: {
            suggestedMin: 0
          }
        }
      }
    });
  }
}
