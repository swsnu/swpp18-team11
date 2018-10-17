import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})
export class TtsService {
  constructor(private http: HttpClient) { }

  playTTS(ticket: Ticket): void {
    this.http.get('/kiorder/api/v1/order_tts', { params: { number: ticket.number.toString() } })
    .subscribe((data: any) => {
      const url = data.url
      const audio = new Audio(url)
      audio.play()
    })
  }

}
