import React from "react";
import { inject, observer } from "mobx-react";
import moment from "moment";

// antd
import { Modal, DatePicker } from "antd";

const StartDateModal = inject("app")(
  observer(function StartDateModal({ app: { bStore }, bl }) {
    // hack! Fix it.
    const width = window.screen.width;
    const margin = (width - 280 - 24) / 2;

    // spray label button
    let sprayButtonLabel;
    const count = bl.dates.filter(date => date).length;
    if (count === 0) sprayButtonLabel = "startDate";
    if (count === 1) sprayButtonLabel = "firstSpray";
    if (count === 2) sprayButtonLabel = "secondSpray";
    if (count === 3) sprayButtonLabel = "thirdSpray";

    // disable dates
    const disablePreviousSprayDates = (prev, curr) => {
      if (prev) {
        return curr && curr < moment(prev).endOf("day");
      } else {
        return curr && curr.valueOf() > Date.now();
      }
    };

    return (
      <Modal
        // width={280}
        closable={false}
        footer={null}
        visible={bStore.isDateModal}
        onCancel={() => bStore.hideModal("isDateModal", bl.id)}
        bodyStyle={{
          marginLeft: width <= 768 ? `${margin}px` : 0,
          padding: 0
        }}
        style={{
          opacity: 0,
          animation: "none"
        }}
      >
        <DatePicker
          open={bStore.isDateModal}
          showTime={{ format: "HH:00" }}
          value={moment(bStore.block[sprayButtonLabel])}
          allowClear={false}
          format="MMM Do YYYY, HH:00"
          placeholder={`Select Date and Time`}
          disabledDate={curr =>
            disablePreviousSprayDates(bl.lastSelectableDate, curr)
          }
          showToday={true}
          onChange={date => bStore.addField(sprayButtonLabel, date)}
          onOk={() =>
            bStore.block.startDate ? bStore.fetchAndUploadData() : null
          }
        />
      </Modal>
    );
  })
);

export default StartDateModal;
