// 送出預約用的格式 (對應 Modal 填寫的內容)
import { LesseeProfileTag } from './lessee-profile-tag';

export interface CreateViewingOrderRequest {

  houseId: number;
  viewingSlotId?: number | null;
  viewingTime?: string | null;
  expectedMoveIn?: string | null;
  expectedMoveInText?: string | null;
  preferredTimeSlots?: string[];
  lesseeProfileTags?: LesseeProfileTag[];
  message?: string;
  matchScore: number;


  // houseId: number;
  // viewingTime: string;

  // expectedMoveIn: string;
  // expectedMoveInText?: string;

  // preferredTimeSlots?: string[];
  // tenantProfiles?: string[];

  // message: string;
  // matchScore: number;
}
