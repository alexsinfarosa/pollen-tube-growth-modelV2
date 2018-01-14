import React from "react";
import { inject, observer } from "mobx-react";

// antd
import { Modal, DatePicker } from "antd";

const disabledStartDate = current => {
  // const { date } = this.props;
  // Try Date.now(date)
  return current && current.valueOf() > Date.now();
};

const StartDateModal = inject("app")(
  observer(function StartDateModal({ app: { formatDate, bStore }, bl }) {
    const width = window.screen.width;
    // hack! Fix it.
    const margin = (width - 280 - 24) / 2;

    return (
      <Modal
        width={280}
        closable={false}
        footer={null}
        visible={bStore.isDateModal}
        onCancel={bStore.hideDateModal}
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
          //  value={moment(bl.dates[0])}
          allowClear={false}
          format="MMM Do YYYY, HH:00"
          placeholder={`Select Date and Time`}
          disabledDate={disabledStartDate}
          showToday={true}
          onChange={date => bStore.setDate(date)}
          onOk={bStore.setStartDate}
        />
      </Modal>
    );
  })
);

export default StartDateModal;
