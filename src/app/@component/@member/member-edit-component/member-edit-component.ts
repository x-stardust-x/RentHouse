import { Component } from '@angular/core';
import { LocationSelectComponent } from "../../location-select-component/location-select-component";

@Component({
  selector: 'app-member-edit-component',
  imports: [LocationSelectComponent],
  templateUrl: './member-edit-component.html',
  styleUrl: './member-edit-component.scss',
})
export class MemberEditComponent {
  onDistrictSelected(district: any) {
    console.log('選到區域:', district);
    console.log('郵遞區號:', district.zipCode);
  }
}
