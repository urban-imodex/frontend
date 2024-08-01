import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsApiService {
  private apiUrl = 'https://e7e60ef9f5f3.sn.mynetname.net:9443/contacts'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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

}