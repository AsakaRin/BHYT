import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class API {
  public token: String;

  baseUrl = "/api/"

  constructor(private http: HttpClient) {

  }

  signup(email, password) {
    return this.http.post(this.baseUrl + "user/sign-up", {
      username: email,
      password: password
    });
  }

  signin(email, password) {
    return this.http.post(this.baseUrl + "user/sign-in", {
      username: email,
      password: password
    });
  }

  getAllInforms() {
    return this.http.get(this.baseUrl + "informs/", {});
  }

  getInformById(id) {
    return this.http.get(this.baseUrl + "informs/" + id);
  }

  createInform(data) {
    return this.http.post(this.baseUrl + "informs", data);
  }

  updateInform(id, data) {
    return this.http.patch(this.baseUrl + "informs/" + id, data);
  }

  deleteInform(id) {
    return this.http.delete(this.baseUrl + "informs/" + id);
  }

  calculatorSingle(ids) {
    return this.http.post(this.baseUrl + "informs/calculatorSingle", ids);
  }

  calculatorFamily(ids) {
    return this.http.post(this.baseUrl + "informs/calculatorFamily", ids);
  }

  paymentDetail(id) {
    return this.http.post(this.baseUrl + "informs/paymentDetail", id);
  }

  paymentFamilyDetail(id) {
    return this.http.post(this.baseUrl + "informs/paymentFamilyDetail", id);
  }
}
