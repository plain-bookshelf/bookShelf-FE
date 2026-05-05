export interface signupRequest{
  username: string;
  nickname?: string;
  password: string;
  address?: string;
  affiliation_name: string;
}

export interface signupResponse{
  user_id: number;
  user_name: string;
  nick_name: string;
  authority: string;
  emails: {
    email_id: number,
    address: string,
    verified: boolean,
    delivered: false
  }[]
}

export interface apiResponse<T>{
  status: string;
  message: string;
  data: T;
}



