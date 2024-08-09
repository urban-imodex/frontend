import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ToastService } from '../../utils/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsApiService {
  private apiUrl = 'https://e7e60ef9f5f3.sn.mynetname.net:9443/contacts'; // Replace with your API URL

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createData(contact: Contact): Observable<Contact> {
    const contactWithExtras = contact as any;
    const { contactid, mine, userID, ...cleanContact } = contactWithExtras;

    console.log('Payload to ADD contact:', cleanContact);
    console.log('Payload to ADD contact:', JSON.stringify(cleanContact, null, 2)); // Add this line to inspect the payload
    return this.http.post<Contact>(this.apiUrl, cleanContact);
  }

  updateData(contact: Contact): Observable<Contact> {

    // Type assertion to handle extra properties
    const contactWithExtras = contact as any;
    const { ___id, mine, ...cleanContact } = contactWithExtras;

    // Log the cleaned payload
    console.log('Payload to update contact:', cleanContact);
    return this.http.patch<Contact>(`${this.apiUrl}?contactid=eq.${contact.contactid}`, cleanContact);
  }

  deleteData(contact: Contact): Observable<Contact> {
    return this.http.delete<Contact>(`${this.apiUrl}?contactid=eq.${contact.contactid}`);

  }

  getContact(contactid: string): Observable<Contact> {
    console.log("getting contact...");
    return this.http.get<Contact>(`${this.apiUrl}?contactid=eq.${contactid}`);

    // https://e7e60ef9f5f3.sn.mynetname.net:9443/contacts?contactid=eq.0277249b-8c69-4bb1-84de-aaa4cca3290f
  }



}