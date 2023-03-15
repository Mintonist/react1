export interface IUser {
  _id: string;
  name: string;
  profession?: IProffession;
  qualities: IQuality[];
  completedMeetings: number;
  rate: number;
  bookmark: boolean;
}

export interface IProffession {
  _id: string;
  name: string;
}

export interface IQuality {
  _id: string;
  name: string;
  color: string;
}
