import { instance } from "./axios";

/**
 * manage.ts
 *
 * 관리자(admin) 화면에서 사용하는 서버 요청을 모아 둔 파일이다.
 *
 * 현재 관리자 화면은 테스트 데이터와 로컬 상태를 함께 사용하고 있지만,
 * 실제 서버 연동으로 전환할 때는 이 파일을 통해 목록 조회 / 승인 / 반납 확인을 수행한다.
 *
 * 함수 구분
 * - getAllowList: 대여 요청 목록 조회
 * - patchRentalAllow: 특정 요청을 대여 승인 처리
 * - getRentalList: 현재 대여 중인 목록 조회
 * - patchBookRetrun: 반납 처리
 * - getOverdueList: 연체 목록만 조회
 * - getUserSearch: 특정 사용자 기준 검색
 */

/**
 * 대여 요청 목록 조회
 *
 * @param page 서버 페이지 번호
 *
 * 요청함 화면의 표를 채울 때 사용한다.
 * 현재는 테스트 데이터 중심으로 동작하지만,
 * 실제 서버 데이터를 붙일 때는 이 함수의 응답을 페이지 state에 넣어 쓰면 된다.
 */
export const getAllowList = async (page: number) => {
  return await instance.get(`/manage/approval-page?page=${page}`);
};

/**
 * 대여 승인 처리
 *
 * @param registrationNumber 도서 등록번호
 *
 * 관리자가 "대여" 버튼을 눌렀을 때
 * 해당 등록번호를 가진 도서를 승인 상태로 바꾸는 요청이다.
 */
export const patchRentalAllow = async (registrationNumber: string) => {
  return await instance.patch(`/api/manage/rental-pass?registrationNumber=${registrationNumber}`);
};

/**
 * 현재 대여 상태 목록 조회
 *
 * 승인되어 실제로 대여 중인 책들의 상태 확인 화면을 구성할 때 사용한다.
 */
export const getRentalList = async (page: number) => {
  return await instance.get(`/manage/rental-status?page=${page}`);
};

/**
 * 반납 처리
 *
 * 함수 이름의 Retrun은 기존 코드의 오타를 유지한 것이다.
 * 호출부를 크게 바꾸지 않기 위해 이름은 유지하고,
 * 실제 역할은 "반납 확인 PATCH 요청"으로 이해하면 된다.
 */
export const patchBookRetrun = async (registrationNumber: string) => {
  return await instance.patch(`/api/manage/return-check?registrationNumber=${registrationNumber}`);
};

/**
 * 연체 도서 목록만 별도로 조회
 *
 * 관리자 화면의 "연체만 보기" 필터를
 * 서버 기준으로 처리하고 싶을 때 사용할 수 있다.
 */
export const getOverdueList = async (page: number) => {
  return await instance.get(`/manage/rental-status/overdue?page=${page}`);
};

/**
 * 사용자 닉네임 기준 검색
 *
 * @param nickName 검색할 사용자 닉네임
 *
 * 관리자 표에서 특정 사용자의 대여 현황만 빠르게 보고 싶을 때 사용한다.
 */
export const getUserSearch = async (nickName: string) => {
  return await instance.get(`/manage/rental-status/nickname?nickName=${nickName}`);
};
