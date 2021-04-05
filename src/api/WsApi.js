/*
 * @Author: lzd
 * @Date: 2020-09-21 17:05:30
 * @LastEditors: lzd
 * @LastEditTime: 2021-01-23 15:50:34
 * @Description: content description
 */

class wsApi {
  constructor() {
    // this.baseUrl = "ws://" + location.host + "/ws";
    // this.baseUrl = "ws://10.129.41.91:7090";
    this.baseUrl = window.CONFIG.wSocketUrl;
    this.status = null;
    this.resolve = null;
  }
  start(resolve) {
    this.resolve = resolve;
    this.status = 1; //0关，1开
    this.websocket.onmessage = res => {
      resolve(res);
    };
    this.websocket.onopen = message => {
      console.log(message);
    };
    this.websocket.onerror = evnt => {
      console.log("发生错误", evnt);
    };
    this.websocket.onclose = evnt => {
      console.log("连接断开", evnt);
      //连接关闭启动定时任务 五秒后在创建
      this.reConnection();
    };
  }
  close() {
    this.status = 0;
    this.websocket.close();
  }
  reConnection() {
    setTimeout(() => {
      this.status && this.start(this.resolve);
    }, 1000);
  }

  devicestatus(resolve) {
    //Online Offline
    // const url = "/Devicestatus";
    const url = "";
    this.websocket = new WebSocket(this.baseUrl + url);
    this.start(resolve);
  }
}
/**
 * {
    "code": number;                     // 状态代码
    "msg": string,                      // 消息描述
    "data": {                           // 数据
        "devTime": string,              // 设备时间（2021-01-01 08:00:00）
        "devLng": number,               // 设备经度
        "devLat": number,               // 设备纬度
        "devHeight": number,            // 设备高度
        "carCourse": number,            // 载车航向
        "cheatDevState": [
            {
                "id": string,           // ID
                "state": string,        // 欺骗设备状态（正常、异常）
            },
        ],
        "probeDevState": [
            {
                "id": string,           // ID
                "state": string,        // 探测设备状态（正常、异常）
            },
        ],
        "defenceMode": string,          // 防御模式（车载模式、定向驱离模式）
        "workMode": string,             // 工作模式（自动、手动）
        "signalState": string,          // 信号状态（开、关）
        "defenceRange": number,         // 防御范围
        "expelDirection": string        // 驱离方向（东、东南...）
        "expelLocation": {              // 驱离位置（默认null）
            "longitude": number,
            "latitude": number,
        },
        "uavList":[                     // 无人机列表（默认null）
            {
                "id": string,           // ID
                "name": string,         // 自定义名称
                "model": string,        // 型号
                "frequency": string,    // 频段（2.4GHz、5.8GHz）
                "longitude": number,    // 经度
                "latitude": number,     // 纬度
                "height": number,       // 高度
                "azimuth": number,      // 方位
                "distance": number,     // 距离
                "isWhite": bool,        // 是否在白名单（true、false）
                "isExpel": bool,        // 是否在被驱离（true、false）
                "establishTime": string,// 首次捕获时间
            },
        ],
    }
}
 */
export default new wsApi();
