import React from "react";
import GeneralInfos from "./SiteInfoComponents/GeneralInfos";
import BestExcelist from "./SiteInfoComponents/BestExcelist";

import { Tabs } from "antd";
import { FileExclamationTwoTone, ScheduleTwoTone } from "@ant-design/icons";
import Sponsor from "./SiteInfoComponents/Sponsor";

const { TabPane } = Tabs;

class SiteInfo extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <FileExclamationTwoTone />
              Ընդհանուր տվյալներ
            </span>
          }
          key="1"
        >
          <GeneralInfos />
        </TabPane>
        <TabPane
          tab={
            <span>
              <ScheduleTwoTone />
              ԼԱՎԱԳՈՒՅՆ ԷՔՍԵԼԻՍՏ
            </span>
          }
          key="2"
        >
          <BestExcelist />
        </TabPane>
        <TabPane
          tab={
            <span>
              <ScheduleTwoTone />
              Մեր հովանավորները
            </span>
          }
          key="3"
        >
          <Sponsor />
        </TabPane>
      </Tabs>
    );
  }
}

export default SiteInfo;
