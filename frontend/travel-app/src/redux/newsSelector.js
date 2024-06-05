import { createSelector } from "reselect";


export const getNewsSuper = createSelector(
    (state) => state.newsPage,
    (newsPage) => {
        return newsPage
    }
)

export const getNewNews = (state) => {
    return state.newsPage.news_Data
}

export const getNewsIsLoad = (state) => {
    return state.newsPage.isLoad
}

