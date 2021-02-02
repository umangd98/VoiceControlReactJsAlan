import React, { useEffect, useState } from 'react';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
// import classes from '*.module.css';
import useStyles from './styles';

const alanKey =
  '237bdd433275a654dae50b8171b8d52e2e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
  const classes = useStyles();

  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setactiveArticle] = useState(-1);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setactiveArticle(-1);
        } else if (command === 'highlight') {
          setactiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];
          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again');
          } else {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening..');
          }
        }
      },
    });
    return () => {};
  }, []);
  return (
    <div className="App">
      <div className={classes.logoContainer}>
        <img
          src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg"
          alt="alan-logo"
          className={classes.alanLogo}
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
