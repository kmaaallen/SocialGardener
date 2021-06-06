import React, { Component, Fragment } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

//Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

//Redux stuff
import { connect } from 'react-redux';
import { markNotificationsRead } from '../redux/actions/userActions';

class Notifications extends Component {
    state = {
        anchorEl: null
    }

    handleOpen = (event) => {
        this.setState({
            anchorEl: event.target
        });
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    }

    onMenuOpened = () => {
        let unreadNotificationIds = this.props.notifications
            .filter(notification => notification.read === false)
            .map(notification => notification.notificationId);
        this.props.markNotificationsRead(unreadNotificationIds);
    }

    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationIcon;

        if (notifications && notifications.length > 0) {
            (notifications.filter(notification => notification.read === false).length > 0) ? 
            notificationIcon = (
                    <Badge
                        badgeContent={notifications.filter(notification => notification.read === false).length}
                        color="error">
                        <NotificationsIcon />
                    </Badge>
                ) : notificationIcon = <NotificationsIcon />;
        } else {
            notificationIcon = <NotificationsIcon />
        }

        let notificationsMarkUp = notifications && notifications.filter(notification => notification.read === false).length > 0 ? (
            notifications.filter(notification => notification.read === false).map(notification => {
                const verb = notification.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(notification.created).fromNow();
                const iconColor = notification.read ? 'primary' : 'secondary';
                const icon = notification.type === 'like' ? (
                    <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
                ) : (
                    <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                )

                return (
                    <MenuItem key={notification.created} onClick={this.handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            variant="body1"
                            to={`/user/${notification.recipient}/post/${notification.postId}`}>
                            {notification.sender} {verb} your post {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={this.handleClose}>You have no notifications yet</MenuItem>
        )


        return (
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}>
                        {notificationIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}>
                    {notificationsMarkUp}
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

const mapActionsToProps = {
    markNotificationsRead
}

export default connect(mapStateToProps, mapActionsToProps)(Notifications);
