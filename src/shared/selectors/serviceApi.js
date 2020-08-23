// import { createSelector } from 'reselect';

export const isAuthorization = state => state.authorization.authorization;

export const isInitializedAuthorization = state => state.authorization.isInitialized;

export const getDepartmentIds = state => state.department.ids;

export const isFetchingDepartments = state => state.department.isFetching;

export const getDepartmentById = (state, id) => state.entities.department[id] || {};

export const getAllDepartment = state => state.entities.department;

export const getStaffIds = state => state.staff.ids;

export const getAllStaff = state => state.entities.staff;

export const isFetchingStaff = state => state.staff.isFetching;

export const getStaffById = (state, id) => state.entities.staff[id] || {};

export const getStaffCurrentPageIndex = state => state.staff.paginations.currentPageIndex;

export const getStaffLastPageIndex = state => state.staff.paginations.lastPageIndex;

export const getStaffTotalCount = state => state.staff.paginations.totalCount;

export const getLastSearchText = state => state.staff.lastSearchText;
