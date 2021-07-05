import _                        from 'lodash';
import classNames               from 'classnames';
import Logo                     from '../../data/images/logo-demo.svg';
import React                    from 'react';
import style                    from './styles.module.scss';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import Link                     from '../Link';
import Routes                   from '../../constants/Routes';

const Navbar = ({ user }) => {
    const getProfileStyle = () => {
        const profilePicture = getProfilePictureUrl(_.get(user, 'profilePicture'));

        return {
            backgroundImage: 'url("' + profilePicture + '")',
        };
    };

    const getBalance = () => {
        const userBalance = user.balance;

        if (!_.isNull(userBalance)) {
            return userBalance;
        }

        return '-';
    };

    return (
        <div className={style.navbar}>
            <div
                className={classNames(
                    style.navbarItems,
                    style.hideOnMobile,
                )}
            >
                <img
                    src={Logo}
                    width={200}
                    alt="Wallfair"
                />
                <Link
                    to={Routes.home}
                    className={style.active}
                >
                    Home
                </Link>
                <Link to={Routes.betOverview}>
                    My Trades
                </Link>
                <Link to={Routes.wallet}>
                    My Wallet
                </Link>
            </div>
            <div className={style.navbarItems}>
                <Link
                    to={Routes.wallet}
                    className={style.balanceOverview}
                >
                    <span className={style.actualBalanceText}>
                        Your current Balance
                    </span>
                    {getBalance()} EVNT
                </Link>
                <div
                    className={style.profile}
                    style={getProfileStyle()}
                >
                </div>
            </div>
        </div>
    );
};

export default Navbar;