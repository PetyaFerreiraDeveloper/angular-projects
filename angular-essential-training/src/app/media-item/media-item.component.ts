import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMediaItem } from '../interfaces';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css'],
})
export class MediaItemComponent implements OnInit {
  @Input() mediaItem!:IMediaItem;
  @Output() delete = new EventEmitter();

  onDelete() {
    console.log('deleted');
    this.delete.emit(this.mediaItem);
  }
  constructor() {}

  ngOnInit(): void {}
}
