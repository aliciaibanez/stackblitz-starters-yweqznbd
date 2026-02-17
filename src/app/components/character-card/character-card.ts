import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
@Component({
    selector: 'app-character-card',
    imports: [MatCardModule],
    templateUrl: './character-card.html',
    styleUrl: './character-card.css',
    standalone: true,
})
export class CharacterCard {
    @Input() id: number = 0;
    @Input() name!: string;
    @Input() status!: string | null;
    @Input() occupation!: string | null;
    @Input() imgUrl!: string;
    @Output() characterSelected = new EventEmitter<number>();
    constructor() { }
    ngOnInit() { }
    onClick() {
        this.characterSelected.emit(this.id);
    }
}