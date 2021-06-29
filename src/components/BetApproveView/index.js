import _                   from 'lodash';
import BetSummaryContainer from '../BetSummaryContainer';
import BetSummaryHelper    from '../../helper/BetSummary';
import Icon                from '../Icon';
import IconTheme           from '../Icon/IconTheme';
import IconType            from '../Icon/IconType';
import moment              from 'moment';
import React               from 'react';
import styles              from './styles.module.scss';
import { connect }         from 'react-redux';

const BetApproveView = ({ closed, betId, investmentAmount, outcome, bet, outcomes }) => {
    const getSummaryRows = () => {
        const betOutcome    = _.get(bet, ['outcomes', outcome]);
        const outcomeValue  = _.get(betOutcome, 'name');
        const outcomeReturn = _.get(outcomes, [outcome, 'outcome']);

        return [
            BetSummaryHelper.getDivider(),
            BetSummaryHelper.getKeyValue('Your Invest', investmentAmount + ' EVNT'),
            BetSummaryHelper.getKeyValue('Your Trade', outcomeValue),
            BetSummaryHelper.getDivider(),
            BetSummaryHelper.getKeyValue('Possible Win', outcomeReturn + ' EVNT', false, true),
        ];
    };

    const renderBetSummary = () => {
        const marketQuestion = _.get(bet, 'marketQuestion');
        const endDateTime    = moment(
            _.get(bet, 'date', new Date()),
        );
        const summaryRows    = getSummaryRows();

        return (
            <BetSummaryContainer
                marketQuestion={marketQuestion}
                endDate={endDateTime}
                summaryRows={summaryRows}
            />
        );
    };

    return (
        <div className={styles.approveBetContainer}>
            <span className={styles.approveBetHeadline}>
                <Icon
                    width={25}
                    iconTheme={IconTheme.primary}
                    iconType={IconType.success}
                    className={styles.headlineIcon}
                />
                Bet placed successfully!
            </span>
            <div className={styles.betSummaryContainer}>
                <div>
                    {renderBetSummary()}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const { betId, investmentAmount } = ownProps;
    const findBetInEvent              = (event, betId) => {
        if (event) {
            return _.find(
                event.bets,
                {
                    _id: betId,
                },
            );
        }
    };
    const event                       = _.head(
        _.filter(
            state.event.events,
            (event) => !_.isEmpty(findBetInEvent(event, betId)),
        ),
    );
    const bet                         = findBetInEvent(event, betId);
    let outcomes                      = _.get(
        state.bet.outcomes,
        betId,
    );

    if (outcomes) {
        const amount = investmentAmount;
        outcomes     = _.get(outcomes, 'values', {});
        outcomes     = _.get(outcomes, amount);
    }

    return {
        event,
        bet,
        outcomes,
    };
};

export default connect(
    mapStateToProps,
    null,
)(BetApproveView);
