import React from "react";
import { inject, observer } from "mobx-react";

import { Row, Col, Button } from "antd";

const SprayButton = inject("app")(
  observer(function SprayButton({ app: { bpts, bStore }, bl, breakpoints }) {
    let sprayButtonLabel;
    const count = bl.dates.filter(date => date).length;
    if (count === 1) sprayButtonLabel = "Set 1st Spray";
    if (count === 2) sprayButtonLabel = "Set 2nd Spray";
    if (count === 3) sprayButtonLabel = "Set 3rd Spray";

    return (
      <Row
        type="flex"
        justify="center"
        align="center"
        style={{ marginTop: 16 }}
      >
        <Col span={4}>
          <Button
            type="primary"
            size={breakpoints.xs ? "small" : "default"}
            ghost={true}
            onClick={() => bStore.selectBlock("isSprayModal", bl.id)}
          >
            {sprayButtonLabel}
          </Button>
        </Col>
        <Col span={4}>
          <Button
            icon={"table"}
            type="primary"
            size={breakpoints.xs ? "small" : "default"}
            ghost={bStore.isTable ? false : true}
            onClick={bStore.toggleTable}
          >
            Growth Table
          </Button>
        </Col>
        <Col span={4}>
          <Button
            icon={"dot-chart"}
            type="primary"
            size={breakpoints.xs ? "small" : "default"}
            ghost={bStore.isGraph ? false : true}
            onClick={bStore.toggleGraph}
          >
            Growth Graph
          </Button>
        </Col>
        <Col span={4}>
          <Button
            icon={"environment-o"}
            type="primary"
            size={breakpoints.xs ? "small" : "default"}
            ghost={bStore.isMap ? false : true}
            onClick={bStore.toggleMap}
          >
            Map
          </Button>
        </Col>
      </Row>
    );
  })
);

export default SprayButton;
