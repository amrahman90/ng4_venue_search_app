import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable ()

export class VenueService {
  private query: any;
  private API_URL: any = environment.API_URL;
  private client_id: any = environment.client_id;
  private client_secret: any = environment.client_secret;
  private oauth_token = environment.oauth_token;
  private version: any = environment.version;
  private IMG_URL: any = environment.IMG_URL;
//  private authUrl = 'client_id=' + this.client_id + '&client_secret=' + this.client_secret + '&v=' + this.version+'&locale=en&radius=500&limit=10&intent=bestnearby&mode=locationInput&categoryId=4d4b7104d754a06370d81259&near=';
  private authUrl = 'oauth_token=' + this.oauth_token  + '&v=' + this.version+'&locale=en&intent=bestnearby&mode=locationInput&near=';
  private URL: any = this.API_URL + this.authUrl;
  private img_url = this.IMG_URL
 

constructor(private http: Http) {}

getVenue(query,near) {
  return this.http.get(this.URL + near+'&query='+query)
  .map(Response => Response.json());
}

getImage(venue_id) {
    return this.http.get(this.IMG_URL + venue_id + '/photos?' + this.authUrl)
  .map(Response => Response.json());
}
}
