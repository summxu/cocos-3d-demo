/*
 * @Author: Chenxu
 * @Date: 2023-06-28 15:53:28
 * @LastEditTime: 2023-06-28 17:22:03
 * @Description: 
 */
import Singleton from "../Base/Singleton";

class DataManager extends Singleton {
  static get Instance() {
    return super.GetInstance<DataManager>();
  }

  gasPedal: number = 0 // 油门 -0.5 到 1 ，负值代表刹车

  reset() {
    this.gasPedal = 0
  }
}

export default DataManager;
