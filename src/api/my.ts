import { instance } from "./axios"

export const getMyPage = async (userId: string) => {
  return await instance.get(`/mypage/${userId}`);
}

export const getMyInfo = async (userId: string) => {
  return await instance.get(`/mypage/${userId}/info`);
}

export const putEditUserName = async (userId: string, userName: string) => {
  return await instance.patch(`/api/mypage/${userId}/retouch`, { nick_name: userName });
}

export const patchEditUserImg = async (userId: string, userImg: string) => {
  return await instance.patch(`/api/mypage/${userId}/profile-upload`, { member_profile: userImg });
}

export const deleteUser = async () => {
  return await instance.delete(`/api/auth/delete`);
} 