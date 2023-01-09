import {View, Text, StyleSheet, RefreshControl, FlatList} from 'react-native';
import {ActivityIndicator, TextInput, Button} from 'react-native-paper';
import {useFetchArticlesQuery} from '../redux/api/articlesApi';
import React, {useState, useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {defaultState} from '../redux/auth/authSlice';
import {
  defaultArticles,
  clearFilteredArticles,
  filterArticles,
  setArticles,
} from '../redux/articles/articlesSlice';
import {articleData} from '../redux/articles/articlesSlice';
import Article from '../components/articles/Article';
import * as Keychain from 'react-native-keychain';

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {data, error, isError, isFetching, isSuccess} =
    useFetchArticlesQuery(page);
  const {articlesData, filteredData, isEnd} = useAppSelector(
    state => state.articles,
  );

  useEffect(() => {
    if (data?.response?.docs) {
      dispatch(setArticles({data: data?.response?.docs}));
    }
  }, [dispatch, data]);

  const handleLoadMore = useCallback(() => {
    if (!isEnd && !isFetching && !search) {
      return setPage(page + 1);
    } else {
      return;
    }
  }, [isEnd, isFetching, page, search]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (page !== 0 && !search) {
      dispatch(defaultArticles());
      setPage(0);
    }
    setIsRefreshing(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    dispatch(filterArticles(text));
  };

  const handleClearSearch = () => {
    dispatch(clearFilteredArticles());
    setSearch('');
  };

  const resetAccessToken = async () => {
    try {
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.log('Keychain cannot be accessed', error);
    }
  };

  const handleLogout = async () => {
    dispatch(defaultState());
    dispatch(defaultArticles());
    await resetAccessToken();
  };

  const renderFooterComponent = () =>
    isFetching || !isEnd ? (
      <ActivityIndicator animating={true} />
    ) : (
      <View style={styles.noArticlesFoundContainer}>
        <Text style={styles.noArticlesFound}>
          You have reached the end of the list
        </Text>
      </View>
    );

  const renderListEmptyComponent = () =>
    !isFetching && isSuccess ? (
      <View style={styles.noArticlesFoundContainer}>
        <Text style={styles.noArticlesFound}>No articles fetched</Text>
      </View>
    ) : null;

  const renderArticle = ({item}: {item: articleData}) => (
    <Article
      title={item.headline.main}
      abstract={item.abstract}
      content={item.lead_paragraph}
      images={item.multimedia}
      date={item.pub_date}
      author={item.byline.original}
    />
  );

  return (
    <View style={styles.screen}>
      <TextInput
        style={{backgroundColor: '#aab1eebb'}}
        mode="flat"
        label="Search articles"
        textColor="#8A2BE2"
        autoCapitalize="none"
        value={search}
        onChangeText={handleSearch}
      />
      {search && (
        <Button style={styles.actions} onPress={handleClearSearch}>
          Clear Search
        </Button>
      )}
      {isError && (
        <View style={styles.apiErrorsContainer}>
          <Text style={styles.apiErrors}>
            {(error as any).error || (error as any).data?.message}
          </Text>
        </View>
      )}
      {search ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index: number) => index.toString()}
          ListEmptyComponent={() => (
            <View style={styles.noArticlesFoundContainer}>
              <Text style={styles.noArticlesFound}>No articles found!</Text>
            </View>
          )}
          renderItem={renderArticle}
        />
      ) : (
        <FlatList
          data={articlesData}
          keyExtractor={(item, index: number) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.8}
          ListEmptyComponent={renderListEmptyComponent}
          ListFooterComponent={renderFooterComponent}
          refreshControl={
            <RefreshControl
              onRefresh={handleRefresh}
              refreshing={isRefreshing}
            />
          }
          renderItem={item => renderArticle(item)}
        />
      )}
      <Button style={styles.actions} onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#aab1eebb',
  },
  actions: {
    width: '100%',
    marginBottom: 30,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  apiErrorsContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  apiErrors: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 7,
    color: 'red',
  },
  noArticlesFoundContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noArticlesFound: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 7,
    color: '#8A2BE2',
  },
});

export default Dashboard;
