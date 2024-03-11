import { type typeNotification } from '../../../shared/ui/page-notification';

export interface typeNotificationState {
    notificationList: typeNotification[],
}

export type typeCreateNotification = Omit<typeNotification, 'id'>
