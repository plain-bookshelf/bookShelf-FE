import axiosInstance from "./apiClient";

export const getMyPage = async (userId: string) => {
  return await axiosInstance.get(`/mypage/${userId}`);
}

export const getMyInfo = async (userId: string) => {
  return await axiosInstance.get(`/mypage/${userId}/info`);
}

export const putEditUserName = async (userId: string, userName: string) => {
  return await axiosInstance.patch(`/api/mypage/${userId}/retouch`, { nick_name: userName });
}

export const patchEditUserImg = async (userId: string, userImg: string) => {
  return await axiosInstance.patch(`/api/mypage/${userId}/profile-upload`, { member_profile: userImg });
}

export const deleteUser = async () => {
  return await axiosInstance.delete(`/api/auth/delete`);
} 

export const postLogout = async () => {
  return await axiosInstance.post(`/api/auth/logout`);
}