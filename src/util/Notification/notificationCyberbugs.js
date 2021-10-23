import { Button, notification, Space } from 'antd';


export const notifiFunction = (type, message, description ='') => {

    notification[type]({
        //typeNotification  = "success" || "error" || "warning" || "info" 
        message: message,
        description: description,
      });

}




