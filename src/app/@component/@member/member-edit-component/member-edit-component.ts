import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../@service/user-service';
import { LocationService } from '../../../@service/location-service';
import { UserProfile } from '../../../@interface/user-profile';
import { LocationSelectComponent } from "../../location-select-component/location-select-component";
import { District } from '../../../@interface/location';

@Component({
  selector: 'app-member-edit-component',
  imports: [CommonModule, ReactiveFormsModule, LocationSelectComponent],
  templateUrl: './member-edit-component.html',
  styleUrl: './member-edit-component.scss',
})
export class MemberEditComponent {
  private readonly fb = inject(FormBuilder);
  public readonly usersev = inject(UserService);
  public readonly locsev = inject(LocationService);
  userProfileForm!: FormGroup;
  userId = 1;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.locsev.loadCities();
    this.userProfileForm = this.fb.group({
      id: [0],

      realName: ['', Validators.required],
      englishName: [''],

      avatar: [''],

      phone: [''],

      address: [''],

      bio: [''],

      rating: [0],
      reviewCount: [0],

      districtId: [0, Validators.required],
      cityName: [''],
      districtName: [''],
      zipCode: [''],

      sleepTime: [0],
      wakeTime: [0],

      cleanLevel: [0],
      noiseTolerance: [0],

      pet: [false],
      smoke: [false],

      interests: ['']
    });

    this.usersev.loadProfile(this.userId);
    var Nowprofile = this.usersev.profile();

    this.userProfileForm.patchValue({
      id: Nowprofile?.id,
      realName: Nowprofile?.realName,
      englishName: Nowprofile?.englishName,

      avatar: Nowprofile?.avatar,

      phone: Nowprofile?.phone,

      address: Nowprofile?.address,

      bio: Nowprofile?.bio,

      rating: Nowprofile?.rating,
      reviewCount: Nowprofile?.reviewCount,

      districtId: Nowprofile?.districtId,
      sleepTime: Nowprofile?.sleepTime,
      wakeTime: Nowprofile?.wakeTime,

      cleanLevel: Nowprofile?.cleanLevel,
      noiseTolerance: Nowprofile?.noiseTolerance,

      pet: Nowprofile?.pet,
      smoke: Nowprofile?.smoke,

      interests: Nowprofile?.interests
    })
  }

  onDistrictSelected(d: District) {
    var cityname = this.locsev.cities().find(x=> x.id == d.cityId)?.cityName;
    this.userProfileForm.patchValue({
      districtId: d.id
    });
  }

  onSubmit() {
    var form: UserProfile = this.userProfileForm.getRawValue();
    this.usersev.updateProfile(form);
  }
}
