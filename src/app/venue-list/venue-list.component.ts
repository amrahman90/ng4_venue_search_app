import {Component, OnInit, ElementRef, Renderer} from '@angular/core';
import {VenueService} from '../shared/venue.service';


@Component({
    selector: 'app-venue-list',
    templateUrl: './venue-list.component.html',
    styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit {
    venues: any[];
    venuesFound: boolean = false;
    searching: boolean = false;
    imgSrc: string;
    imgResponse: any;
    imgArr = [];
    errorMessage: string = '';
	public searchQuery;


    constructor(private venueService: VenueService,public renderer:Renderer, public element:ElementRef) {}

    handleSuccess(data) {
        console.log(data);
        for (let i = 0; i < data.response.group.results.length; i++) {
            //            this.searchImages(data.response.venues[i].id);
            if(data.response.group.results[i].venue !== undefined){
                this.venuesFound = true;
        this.venues.push(data.response.group.results[i]);
            }
            if (data.response.group.results[i].photo !== undefined) {
                this.imgResponse = data.response.group.results[i].photo.prefix + '300x300' + data.response.group.results[i].photo.suffix;
                this.imgArr.push(this.imgResponse);
            } else {
                this.imgResponse = './app/venue-list/no-image.jpg';
                this.imgArr.push(this.imgResponse);
            }

        }

        console.log('venue called');
        
        console.log(data);

    }

    handleSuccessImages(imagedata) {
        console.log('image called');
        console.log(imagedata.response.photos.items);
        if (imagedata.response.photos.items.length !== 0) {
            this.imgResponse = imagedata.response.photos.items[0].prefix + '300x300' + imagedata.response.photos.items[0].suffix;
            this.imgArr.push(this.imgResponse);
            console.log(imagedata);
        } else {
            this.imgResponse = './app/venue-list/no-image.jpg';
            this.imgArr.push(this.imgResponse);
        }
    }

    handleError(error) {
        console.log(error);
    }

    searchVenues(query: string) {

        this.imgArr = [];
        this.venues = [];
        if (query !== undefined) {
            this.errorMessage = '';
            this.searching = true;
            this.renderer.setElementClass(this.element.nativeElement.querySelector('input').parentElement,'has-error',false);
            return this.venueService.getVenue(query, query)
                .subscribe(
                imagedata => this.handleSuccess(imagedata),
                error => this.handleError(error),
                () => this.searching = false
                );
        } else {
        this.renderer.setElementClass(this.element.nativeElement.querySelector('input').parentElement,'has-error',true);
            this.errorMessage = "Enter venue to search..."
        }
    }

    searchImages(query: string) {
        return this.venueService.getImage(query)
            .subscribe(
            data => this.handleSuccessImages(data),
            error => this.handleError(error),
            () => this.searching = false
            )
    }

    ngOnInit() {
        this.renderer.listen(this.element.nativeElement.querySelector('input'),'focus',()=>{
            this.errorMessage='';
        })
    }

}
