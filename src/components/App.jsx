import { useState } from 'react';

import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';

import {
  countPositiveFeedbackPercentage,
  countTotalFeedback,
} from './utils/stats';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stats = { good, neutral, bad };

  const incrementStat = stat => {
    switch (stat) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;

      default:
        console.log('default');
        break;
    }
  };

  const totalFeedbacks = countTotalFeedback(stats);
  const positivePercentage = countPositiveFeedbackPercentage(
    stats,
    totalFeedbacks
  );

  return (
    <div className="root__div">
      <Section title="Please leave feedback">
        <FeedbackOptions options={stats} incrementOption={incrementStat} />
      </Section>
      <Section title="Statistics">
        {totalFeedbacks ? (
          <Statistics
            stats={stats}
            totalFeedbacks={totalFeedbacks}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
