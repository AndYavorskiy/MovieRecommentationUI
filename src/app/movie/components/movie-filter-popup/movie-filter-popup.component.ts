import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemChecked } from '../../models';

@Component({
  selector: 'app-movie-filter-popup',
  templateUrl: './movie-filter-popup.component.html',
  styleUrls: ['./movie-filter-popup.component.scss']
})
export class MovieFilterPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<MovieFilterPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemChecked[]) { }


  clearFilters() {
    this.data.forEach(x => x.isChecked = false);
  }
}
