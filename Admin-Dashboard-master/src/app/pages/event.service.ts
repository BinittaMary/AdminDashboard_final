import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  item: any;

  constructor(private http: HttpClient) { }

  getevent(id: any) {
    return this.http.get("http://localhost:5000/events/event/" + id);
  }

  newEvent(image: any, item: any) {
    console.log('inside service upload')
    const formData = new FormData();
    formData.append('file', image);
    formData.append('name', item.name);
    formData.append('shortdetails', item.shortdetails);
    formData.append('moredetails', item.moredetails);
    formData.append('boxdetails', item.boxdetails);
    formData.append('coordinatorsdetail', item.coordinatorsdetail);
    formData.append('registrationlink', item.registrationlink);
    formData.append('brouchurelink', item.brouchurelink);
    formData.append('programschedule', item.programschedule);
    formData.append('speakerslist', item.speakerslist);
    formData.append('button', item.button);
    formData.append('date', item.date);
    formData.append('image', item.image);



    return this.http.post("http://localhost:5000/events/event-insert", formData)
      .subscribe(data => { console.log(data) })
  }

  getevents() {
    return this.http.get("http://localhost:5000/events/events");
  }

  deleteevent(event: any) {
    return this.http.post("http://localhost:5000/events/event/remove/", event);
  }

  editEvent(item: any) {
    console.log('client update')
    return this.http.post("http://localhost:5000/events/event/update", item)
      .subscribe(data => { console.log(`response recieved ${data}`) })
  }

  updateEventIndex(event: any) {
    return this.http.put("http://localhost:5000/events/event/updateIndex/", event);
  };

  editEventWithImage(image: any, item: any) {

    console.log('inside service upload')
    const formData = new FormData();
    formData.append('file', image);
    formData.append('name', item.name);
    formData.append('shortdetails', item.shortdetails);
    formData.append('moredetails', item.moredetails);
    formData.append('boxdetails', item.boxdetails);
    formData.append('coordinatorsdetail', item.coordinatorsdetail);
    formData.append('registrationlink', item.registrationlink);
    formData.append('brouchurelink', item.brouchurelink);
    formData.append('programschedule', item.programschedule);
    formData.append('speakerslist', item.speakerslist);
    formData.append('button', item.button);
    formData.append('date', item.date);
    formData.append('image', item.image);


    return this.http.post("http://localhost:5000/events/event/updateWithFile", formData)
      .subscribe(data => { console.log(data) })

  }

}
