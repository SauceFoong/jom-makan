import React, { useState } from "react";
import { BellIcon, LinkIcon } from "@chakra-ui/icons";
import { Heading, IconButton, useColorModeValue } from "@chakra-ui/react";
import styles from "../../styles/Notification.module.css";
import { NotificationItem } from "./NotificationItem";

const NotificationButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div>
      <IconButton
        aria-label={"Notification"}
        onClick={toggleModal}
        rounded="xl"
        icon={<BellIcon />}
        m={2}
      />
      {openModal ? (
        <div>
          <div className={styles.noti_modal}>
            <div className={styles.noti_modal_header}>
              <Heading as="h2" size="md">
                Notifications
              </Heading>
              <button className={styles.mark_all_read_btn}>
                Mark all as read
              </button>
            </div>
            <hr className={styles.divider} />
            <div className={styles.modal_body}>
              {/* <NotificationsCategories
                :notifications="displayNotifications"
                :longNoti="false"
                v-if="displayNotifications.length"
            /> */}
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />

              <div className={styles.no_noti_text}>
                Looks likes you have no notifications yet.
              </div>
            </div>
            <div className={styles.modal_footer}>
              <button className={styles.view_all_btn}>
                View All Notifications
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NotificationButton;
