import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemChecked } from '../../models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-movie-filter-popup',
  templateUrl: './movie-filter-popup.component.html',
  styleUrls: ['./movie-filter-popup.component.scss']
})
export class MovieFilterPopupComponent {

  genres: ItemChecked[] = [];

  constructor(
    public dialogRef: MatDialogRef<MovieFilterPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemChecked[]) {
    this.genres = data.map(x => {
      return { id: x.id, name: x.name, isChecked: x.isChecked } as ItemChecked;
    });

    this.dialogRef.backdropClick()
      .subscribe(() => this.save());
  }

  save() {
    this.dialogRef.close(this.genres)
  }

  clearFilters() {
    this.data.forEach(x => x.isChecked = false);
  }
}
