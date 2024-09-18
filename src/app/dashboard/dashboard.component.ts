import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  //biểu đồ --------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    // Register chart components
    Chart.register(...registerables);
    //goi ham tao bieu do daily
    this.createDailyChart();
    //goi ham tao bieu do line
    this.createLineChart();
    //gọi hàm biểu đồ vòng tồn kho
    this.createAndUpdateInventoryChart();

    // Xử lý thay đổi của select dropdown
    const weekSelect = document.getElementById('weekSelect') as HTMLSelectElement;
    if (weekSelect) {
      weekSelect.addEventListener('change', (event) => {
        this.updateChart(event.target as HTMLSelectElement);
      });
    }
  }
  // tạo bảng daily-----------------------------------------------------------------------------------------------
  createDailyChart(): void {
    const dailyChart = new Chart('barChart1', {
      type: 'bar',
      data: {
        labels: ['2', '3', '4', '5', '6', '7', 'S'], // Days of the week
        datasets: [
          {
            label: 'Containers In',
            data: [25, 19, 15, 40, 28, 36, 67], // Example data
            backgroundColor: '#3A57E8', // Color for bars
            borderWidth: 1,
            barThickness: 15 // Điều chỉnh kích cỡ cột
          },
          {
            label: 'Containers Out',
            data: [30, 28, 23, 36, 17, 26, 55], // Example data
            backgroundColor: '#85F4FA', // Color for bars
            borderWidth: 1,
            barThickness: 15 // Điều chỉnh kích cỡ cột
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y;
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: false,
            grid: {
              drawOnChartArea: false, // Loại bỏ các đường dọc nhưng giữ lại nhãn (ngày trong tuần)
            }
          },
          y: {
            stacked: false,
            grid: {
              display: true,
              drawOnChartArea: true, // Giữ lại các đường ngang trong biểu đồ
            },
            ticks: {
              stepSize: 20, // Bước nhảy giữa các giá trị trên trục y
              callback: function (value) {
                return value; // Hiển thị giá trị trực tiếp
              }
            },
            suggestedMin: 0, // Giá trị tối thiểu hiển thị trên trục y
            suggestedMax: 100 // Giá trị tối đa hiển thị trên trục y để có 5 giá trị sao để chia cho stepsize đủ 5 lần nhảy
          }
        }
      }
    });
  }
  // update select chọn ngày tháng năm trong bảng daily
  // note: datain out sau này sẽ thế data từ api vào
  updateChart(selectElement: HTMLSelectElement): void {
    const value = selectElement.value;
    let labels: string[];
    let dataIn: number[];
    let dataOut: number[];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Lấy tháng hiện tại (0-11)
    const currentYear = currentDate.getFullYear(); // Lấy năm hiện tại
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    switch (value) {
      case 'week':
        // Cập nhật dữ liệu cho tuần
        labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        dataIn = [25, 19, 15, 40, 28, 36, 67];
        dataOut = [30, 28, 23, 36, 17, 26, 55];
        break;
      case 'month':
        // Cập nhật dữ liệu cho tháng (30 ngày)
        labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()); // Hiển thị số ngày tương ứng trong tháng
        dataIn = Array.from({ length: daysInMonth }, () => Math.floor(Math.random() * 50 + 20)); // Dữ liệu containers in mẫu thay thế bằng api
        dataOut = Array.from({ length: daysInMonth }, () => Math.floor(Math.random() * 50 + 20)); // Dữ liệu containers out mẫu thay thế bằng api
        break;
      case 'year':
        // Cập nhật dữ liệu cho năm (12 tháng)
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // 12 tháng
        dataIn = Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000 + 500)); // Dữ liệu containers in (tự sinh)
        dataOut = Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000 + 500)); // Dữ liệu containers out (tự sinh)
        break;
      default:
        return;
    }

    // Cập nhật dữ liệu biểu đồ daily
    const chart = Chart.getChart('barChart1');
    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = dataIn;
      chart.data.datasets[1].data = dataOut;
      chart.update();
    }
  }

  //thống kê theo sản lượng của hãng line oper--------------------------------------------------------------------------------
  createLineChart(): void {
    const lineChart = new Chart('barChart2', {
      type: 'bar',
      data: {
        labels: ['2', '3', '4', '5', '6', '7', 'S'], // Days of the week
        datasets: [
          {
            label: 'Containers In',
            data: [25, 19, 15, 40, 28, 36, 67], // Example data
            backgroundColor: '#3A57E8', // Color for bars
            borderWidth: 1,
            barThickness: 15 // Điều chỉnh kích cỡ cột
          },
          {
            label: 'Containers Out',
            data: [30, 28, 23, 36, 17, 26, 55], // Example data
            backgroundColor: '#85F4FA', // Color for bars
            borderWidth: 1,
            barThickness: 15 // Điều chỉnh kích cỡ cột
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y;
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: false,
            grid: {
              drawOnChartArea: false, // Loại bỏ các đường dọc nhưng giữ lại nhãn (ngày trong tuần)
            }
          },
          y: {
            stacked: false,
            grid: {
              display: true,
              drawOnChartArea: true, // Giữ lại các đường ngang trong biểu đồ
            },
            ticks: {
              stepSize: 20, // Bước nhảy giữa các giá trị trên trục y
              callback: function (value) {
                return value; // Hiển thị giá trị trực tiếp
              }
            },
            suggestedMin: 0, // Giá trị tối thiểu hiển thị trên trục y
            suggestedMax: 100 // Giá trị tối đa hiển thị trên trục y để có 5 giá trị sao để chia cho stepsize đủ 5 lần nhảy
          }
        }
      }
    });
  }
  //updateLineChart bằng api
  //chưa có

  //thống kê tồn kho----------------------------------------------------------------------------------------------------------
  createAndUpdateInventoryChart(): void {
    // Tạo biểu đồ
    const inventoryChart = new Chart('pieChart', {
      type: 'doughnut',
      data: {
        labels: ['Tồn dưới 10 ngày', 'Tồn lâu (> 10 ngày)'],
        datasets: [{
          label: 'Tổng tồn kho',
          data: [0, 0], // Dữ liệu sẽ được cập nhật sau
          backgroundColor: ['#3A57E8', '#85F4FA'], // Màu sắc cho vòng trong và vòng ngoài
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += context.parsed;
                }
                return label;
              }
            }
          }
        },
        cutout: '90%', // Điều chỉnh để tạo vòng tròn donut
        elements: {
          arc: {
            borderWidth: 2 // Độ rộng của viền các phần
          }
        }
      }
    });
  
    // Giả sử bạn lấy dữ liệu từ API và cập nhật sau khi biểu đồ được tạo
    // Ví dụ dữ liệu giả
    const totalStock = 1000;
    const stockUnder10Days = 300;
    const stockOver10Days = 700;
  
    // Cập nhật nội dung thông tin chart
    document.getElementById('totalStock')!.innerText = `Tổng tồn kho: ${totalStock}`;
    document.getElementById('stockUnder10Days')!.innerHTML = `<img src="assets/dot1.png" alt="dot1 Icon" class="doticon" /> Tồn mới: ${stockUnder10Days}`;
    document.getElementById('stockOver10Days')!.innerHTML = `<img src="assets/dot2.png" alt="dot2 Icon" class="doticon" /> Tồn lâu (> 10 ngày): ${stockOver10Days}`;
  
    // Cập nhật dữ liệu biểu đồ
    inventoryChart.data.datasets[0].data = [stockUnder10Days, stockOver10Days];
    inventoryChart.update();
  }
  
  //------------------------------------------------------------------------------------------------------------------
}

