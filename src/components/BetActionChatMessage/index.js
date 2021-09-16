import _ from 'lodash';
import styles from './styles.module.scss';
import Routes from '../../constants/Routes';
import { useHistory } from 'react-router';
import ProfilePicture from '../ProfilePicture';
import ChatMessageType from '../ChatMessageWrapper/ChatMessageType';
import State from '../../helper/State';
import { formatToFixed } from '../../helper/FormatNumbers';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/selectors/authentication';
import { convert } from 'helper/Currency';

const BetActionChatMessage = ({
  chatMessageType,
  user,
  message,
  dateString,
}) => {
  const history = useHistory();

  const events = useSelector(state => state.event.events);
  const { currency } = useSelector(selectUser);

  if (!user) {
    return null;
  }

  const onClick = () => {
    history.push(
      Routes.getRouteWithParameters(Routes.bet, {
        eventId: message.eventId,
        betId: message.betId,
      })
    );
  };

  const getMessage = () => {
    const userName = _.get(user, 'name');
    const amount = _.get(message, 'amount');
    const tokenAmount = formatToFixed(convert(amount, currency));
    const outcome = _.get(message, 'outcome');

    const event = State.getEventByTrade(message.betId, events);
    const bet = State.getTradeByEvent(message.betId, event);

    const betOutcome = _.get(bet, ['outcomes', outcome]);
    const outcomeValue = _.get(betOutcome, 'name');

    switch (chatMessageType) {
      case ChatMessageType.createBet:
        return (
          <>
            {userName} created trade{' '}
            <strong>{tokenAmount + ' ' + currency}</strong> on{' '}
            <strong>{outcomeValue}</strong>.
          </>
        );

      case ChatMessageType.placeBet:
        return (
          <>
            {userName} bought <strong>{tokenAmount + ' ' + currency}</strong> of{' '}
            <strong>{outcomeValue}</strong>.
          </>
        );

      case ChatMessageType.pulloutBet:
        return (
          <>
            {userName} sold <strong>{outcomeValue}</strong> for{' '}
            <strong>{tokenAmount + ' ' + currency}</strong>.
          </>
        );
    }

    return null;
  };

  const renderText = () => {
    return <div>{getMessage()}</div>;
  };

  return (
    <div className={styles.betActionChatMessage} onClick={onClick}>
      <ProfilePicture user={user} width={20} height={20} />
      {renderText()}
      <small>{dateString}</small>
    </div>
  );
};

export default BetActionChatMessage;
