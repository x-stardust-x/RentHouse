export interface AvailableViewingSlot {
  id: number;
  houseId: number;
  lessorId: number;
  availableDate: string;
  startTime: string;
  endTime: string;
  label: string;
}
