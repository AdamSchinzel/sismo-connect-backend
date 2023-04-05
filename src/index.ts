global.atob = require("atob");

import express from "express";
import cors from "cors";
import {
  ZkConnect,
  ZkConnectServerConfig,
  AuthType,
} from "@sismo-core/zk-connect-server";


const zkConnectConfig: ZkConnectServerConfig = {
  appId: "0xa4bd963b0de72eb2f23207d8ed9f6e88",
};

const zkConnect = ZkConnect(zkConnectConfig);


const authRequest = {
  authType: AuthType.ANON,
};

const app = express();
app.use(cors());
app.use(express.json());

app.post("/verify", async (req, res) => {
  const { groupId, zkConnectResponse } = req.body;

  const claimRequest = {
  groupId,
  };

  try {
    const { verifiedAuths } = await zkConnect.verify(zkConnectResponse, {
      authRequest,
      claimRequest,
    });

    if (verifiedAuths.length > 0) {
      res.status(200).send({ verified: true });
    }

  } catch (e: any) {
    res.status(400).send({ verified: false });
  }
});


app.listen(8080);