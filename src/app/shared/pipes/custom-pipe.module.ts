import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConvertUrlPipe } from './convert-url.pipe';
import { EllipsisPipe } from './ellipsis.pipe';
import { ArrayFilterPipe } from './filter.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { TranferIconPipe } from './tranfer-icon.pipe';
const PIPES = [
    ArrayFilterPipe,
    SafeHtmlPipe,
    ConvertUrlPipe,
    EllipsisPipe,
    TranferIconPipe
];

@NgModule({
    declarations: [	PIPES,
   ],
    imports: [CommonModule],
    exports: [PIPES],
})
export class CustomPipeModule {}
