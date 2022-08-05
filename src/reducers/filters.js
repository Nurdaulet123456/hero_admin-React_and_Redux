import { createReducer } from "@reduxjs/toolkit"
import {
filtersFetching,
filtersFetched,
filtersFetchingError,
activeFilterChanged
} from '../actions'

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

const filters = createReducer(initialState, builder => {
    builder
        .addCase(filtersFetching, state => {
            state.filtersLoadingStatus = 'loading'
        })
        .addCase(filtersFetched, (state, action) => {
            state.filters = action.payload
            state.filtersLoadingStatus = 'idle'
        })
        .addCase(filtersFetchingError, state => {
            state.filtersLoadingStatus = 'error'
        })
        .addCase(activeFilterChanged, (state, action) => {
            state.activeFilter = action.payload
        })
        .addDefaultCase(() => {})
})
// const filters = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FILTERS_FETCHING':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'loading'
//             }
//         case 'FILTERS_FETCHED':
//             return {
//                 ...state,
//                 filters: action.payload,
//                 filtersLoadingStatus: 'idle'
//             }
//         case 'FILTERS_FETCHING_ERROR':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'error'
//             }
//         case 'ACTIVE_FILTER_CHANGED':
//             return {
//                 ...state,
//                 activeFilter: action.payload
//             }
//         default: return state
//     }
// }

export default filters;