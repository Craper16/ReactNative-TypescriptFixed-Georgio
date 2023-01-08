import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface articleData {
  abstract: string;
  lead_paragraph: string;
  headline: {main: string};
  byline: {original: string};
  _id: string;
  multimedia: {url: string}[];
  pub_date: Date;
}

interface articlesModel {
  articlesData: articleData[];
  filteredData: articleData[];
  isEnd: boolean;
}

const initialState: articlesModel = {
  articlesData: [],
  filteredData: [],
  isEnd: false,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<{data: articleData[]}>) => {
      state.articlesData = [...state.articlesData, ...action.payload.data];
      state.isEnd = action.payload.data?.length === 0;
    },
    defaultArticles: state => {
      state.articlesData = initialState.articlesData;
      state.filteredData = initialState.filteredData;
      state.isEnd = initialState.isEnd;
    },
    filterArticles: (state, action: PayloadAction<string>) => {
      state.filteredData = state.articlesData.filter(
        article =>
          article.headline.main.includes(action.payload) ||
          article.lead_paragraph.includes(action.payload),
      );
    },
    clearFilteredArticles: state => {
      state.filteredData = initialState.filteredData;
    },
  },
});

export const {
  setArticles,
  defaultArticles,
  filterArticles,
  clearFilteredArticles,
} = articlesSlice.actions;

export default articlesSlice.reducer;
