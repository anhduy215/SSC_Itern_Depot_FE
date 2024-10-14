import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    // Khởi tạo instance của axios
    this.axiosInstance = axios.create({
      baseURL: 'https://localhost:7044', // Địa chỉ của API backend
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain'
      }
    });
  }

  // Phương thức gọi API lấy danh sách containers
  getContainers() {
    return this.axiosInstance.get('/Container')
      .then(response => {
        console.log('Containers:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching containers:', error);
        throw error;
      });
  }

  // Phương thức gọi API lấy danh sách EIRs
  getEirs() {
    return this.axiosInstance.get('/Eir')
      .then(response => {
        console.log('EIRs:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching EIRs:', error);
        throw error;
      });
  }
}

