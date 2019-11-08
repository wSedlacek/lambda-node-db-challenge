export interface Task {
  id?: string | number;
  project_id: string | number;
  description: string;
  notes?: string;
  completed: boolean | 1 | 0;
}
