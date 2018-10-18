import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {ImageSlideModalComponent} from './imageSlideModal/imageSlideModal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	@ViewChild('searchKeyControl')
	searchKeyControl: any;
    @ViewChild('imageSlideModal')
    imageSlideModal: ImageSlideModalComponent

	allScreenshots: any[] = [];
	screenshotsDict: any

	visiableScreenshots: any[] = [];

	searchKey: String = ""

	constructor(private http: HttpClient) {
		this.http.get('assets/UiKeyScreenMap.json').subscribe(result => {
			this.screenshotsDict = result;
			Object.keys(result).forEach(key => {
				let value = result[key];

				for (let v of value) {
					var screenshotObj = Object.assign({key: key}, v);
					this.allScreenshots.push(screenshotObj);
				}
			});

			this.visiableScreenshots = this.allScreenshots;
		});
	}

	getScreenshotPath(screenshot) {
		return `assets/values/${screenshot.case}.${screenshot.fileName}`;
	}

	goToSlideShow(screenshot) {
		this.imageSlideModal.show(this.visiableScreenshots, screenshot);
	}

	ngOnInit() {
		this.searchKeyControl.valueChanges.subscribe(val => {
			if (val.length > 0) {
				this.visiableScreenshots = this.allScreenshots.filter(shot => (shot.key.toLowerCase().includes(val.toLowerCase())) || (shot.fileName.toLowerCase().includes(val.toLowerCase())));
			}
			else {
				this.visiableScreenshots = this.allScreenshots;
			}
		});
	}
}
