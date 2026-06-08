export interface AvailableViewingSlot {
  id: number;
  houseId: number;
  lessorId: number;
  availableDate?: string | null;
  startTime: string;
  endTime: string;
  label: string;
  isEnabled?: boolean;
}
