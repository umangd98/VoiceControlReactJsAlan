import React, { useState, useEffect, createRef } from 'react';
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';
import useStyles from './styles';
// import { act } from 'react-dom/test-utils';

const NewsCard = ({
  article: { description, publishedAt, source, title, url, urlToImage },
  i,
  activeArticle,
}) => {
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);
  useEffect(() => {
    setElRefs(
      (refs) =>
        Array(20)
          .fill()
          .map((_, j) => refs[j] || createRef()) //ElRef[j] = createRef()
    );
    return () => {};
  }, []);
  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
    return () => {};
  }, [i, activeArticle, elRefs]);
  const classes = useStyles();
  return (
    <Card
      ref={elRefs[i]}
      className={classNames(
        classes.card,
        activeArticle === i ? classes.activeCard : null
      )}
    >
      <CardActionArea href={url} target="_blank">
        <CardMedia
          className={classes.media}
          image={
            urlToImage ||
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fillustrations%2Fnews-headlines-newsletter-636978%2F&psig=AOvVaw0kS0_EnMKJlziqN0AQz2iR&ust=1597643980453000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMDNrOGFn-sCFQAAAAAdAAAAABAD'
          }
        />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">
          {title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Typography variant="h5" color="textSecondary">
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
