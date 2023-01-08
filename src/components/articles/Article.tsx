import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Title, Paragraph, Text} from 'react-native-paper';

const IMG_URL = 'https://static01.nyt.com/';

type ArticleProps = {
  title: string;
  abstract: string;
  content: string;
  images: {url: string}[];
  date: Date;
  author: string;
};

const Article = ({
  title,
  abstract,
  content,
  images,
  date,
  author,
}: ArticleProps) => {
  return (
    <Card style={styles.cardContainer} mode="elevated">
      {images?.length > 0 ? (
        <Card.Cover
          style={{marginBottom: 20}}
          key={0}
          source={{uri: IMG_URL + images[0].url}}
        />
      ) : null}
      <View>
        <Card.Title
          titleStyle={styles.cardTitle}
          titleVariant="headlineLarge"
          titleNumberOfLines={2}
          title={title}
        />
      </View>
      <Card.Content>
        <Title style={styles.abstract}>{abstract}</Title>
        <Paragraph style={styles.content}>{content}</Paragraph>
        <View>
          <Text style={styles.date}>
            Published at: {date.toString().split('T')[0]}
          </Text>
        </View>
        <Text style={styles.author}>{author}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    margin: 20,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  abstract: {paddingBottom: 20, margin: 5},
  content: {justifyContent: 'center', alignContent: 'center', margin: 10},
  date: {paddingVertical: 15},
  author: {paddingVertical: 2},
});

export default memo(Article);
