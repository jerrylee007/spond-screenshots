import {Component, OnInit, ViewChild, Input,
  Output, EventEmitter, HostListener} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap/modal';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'image-slide-modal',
  templateUrl: './imageSlideModal.component.html',
  styleUrls: ['./imageSlideModal.component.scss'],
})
export class ImageSlideModalComponent implements OnInit {
  @ViewChild('modal') modal: ModalDirective;

  showingImage: any
  imageCandidates: any[]
  currentIndex: number

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (event.code == 'ArrowLeft' || event.code == 'ArrowUp') {
      this.onPreviousClicked();
    }
    else if (event.code == 'ArrowRight' || event.code == 'ArrowDown') {
      this.onNextClicked();
    }
    
  }

  constructor() {
  }

  ngOnInit() {
  }

  show(imageCandidates: any[], imageToShow: any) {
    this.showingImage = imageToShow;
    this.imageCandidates = imageCandidates;

    this.currentIndex = this.imageCandidates.findIndex(image => image.fileName == imageToShow.fileName);

    this.modal.show()
  }

  getKeyScreenshotPath(screenshot) {
    return `assets/keys/${screenshot.case}.${screenshot.fileName}`;
  }

  getValueScreenshotPath(screenshot) {
    return `assets/values/${screenshot.case}.${screenshot.fileName}`;
  }

  onPreviousClicked(){
    if (this.currentIndex > 1) {
      this.currentIndex--;
      this.showingImage = this.imageCandidates[this.currentIndex];
    }
  }

  onNextClicked() {
    if (this.currentIndex < this.imageCandidates.length - 2) {
      this.currentIndex++;
      this.showingImage = this.imageCandidates[this.currentIndex];
    }
  }

  hide() {
    this.modal.hide()
  }

  onCancelClicked() {
    this.hide()
  }

  onConfirmClicked() {

  }
}
