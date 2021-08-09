import { Pipe, PipeTransform } from '@angular/core';
import { IconDictionary } from 'src/app/core/constants/icon.constant';

@Pipe({ name: 'vnuIcon' })
export class TranferIconPipe implements PipeTransform {
    transform(iconName: string): string {
        return IconDictionary.get(iconName);
    }
}
