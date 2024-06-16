import React, {
     createContext,
     useContext,
     PropsWithChildren,
     useState,
} from "react";
import { MessagePayload, onMessage } from "firebase/messaging";
import { messaging } from "../utils/firebase/firebaseConfigs";

interface NotificationType {
     notification?: MessagePayload;
}

export const NotificationContext = createContext<NotificationType | undefined>(
     undefined
);

export const NotificationContextProvider = ({
     children,
}: PropsWithChildren) => {
     const [notification, setNotification] = useState<
          MessagePayload | undefined
     >();
     onMessage(messaging, (payload: MessagePayload) =>
          setNotification(payload)
     );
     const contextValue: NotificationType = {
          notification,
     };
     return (
          <NotificationContext.Provider value={contextValue}>
               {children}
          </NotificationContext.Provider>
     );
};

export const useNotificationContext = (): NotificationType => {
     const context = useContext(NotificationContext);
     if (!context) {
          throw new Error(
               "useNotificationContext must be used within a NotificationContextProvider"
          );
     }
     return context;
};
