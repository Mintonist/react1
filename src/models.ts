export interface IUser {
  _id: string;
  name: string;
  email: string;
  sex: string;
  profession?: IProfession;
  qualities: IQuality[];
  completedMeetings: number;
  rate: number;
  bookmark: boolean;
}

export interface IProfession {
  _id: string;
  name: string;
}

export interface IQuality {
  _id: string;
  name: string;
  color: string;
}

export interface IComment {
  _id: string;
  userId: string;
  pageId: string;
  content: string;
  created_at: number;
}
