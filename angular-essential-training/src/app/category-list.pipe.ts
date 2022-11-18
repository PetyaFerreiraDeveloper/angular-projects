import { Pipe, PipeTransform } from '@angular/core';
import { IMediaItem } from './interfaces';

@Pipe({
    name: 'categoryList'
})
export class CategoryListPipe implements PipeTransform {
    transform(mediaItems:IMediaItem[]) {
        const categories:string[] = [];
        mediaItems.forEach(mediaItem => {
            if(categories.indexOf(mediaItem.category) <= -1) {
                categories.push(mediaItem.category)
            }
        });
        return categories.join(', ')
    }
}