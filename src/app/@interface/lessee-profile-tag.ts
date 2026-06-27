export interface LesseeProfileTag {
  label: string;
  source: 'habit' | 'custom';
  icon?: string;
  checked?: boolean;
  isEditing?: boolean;
}
