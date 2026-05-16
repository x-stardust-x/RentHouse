import { UserProfile } from './../../../@interface/user-profile';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserService } from '../../../@service/user-service';
import { LocationService } from '../../../@service/location-service';

@Component({
  selector: 'app-member-dashborad-component',
  imports: [RouterLink],
  templateUrl: './member-dashborad-component.html',
  styleUrl: './member-dashborad-component.scss',
})
export class MemberDashboradComponent {
  public usersev = inject(UserService);
  public locsev = inject(LocationService);
  userId = 1;

  profile = this.usersev.profile;

  constructor() {
    this.usersev.loadProfile(this.userId);
    this.locsev.getUserLocation(this.userId);
  }

  // computed 自動同步
  tags = computed(() => {

    const profile = this.profile();

    const tags: string[] = [];

    if (!profile) return tags;

    // 早睡
    if (profile.sleepTime <= 23) {
      tags.push('早睡早起');
    }

    // 愛乾淨
    if (profile.cleanLevel >= 4) {
      tags.push('愛乾淨');
    }

    // 可接受寵物
    if (profile.pet) {
      tags.push('可接受寵物');
    }

    // 不抽菸
    if (!profile.smoke) {
      tags.push('不抽菸');
    }

    // 耐噪音
    if (profile.noiseTolerance >= 4) {
      tags.push('耐噪音');
    }

    return tags;
  });
}
