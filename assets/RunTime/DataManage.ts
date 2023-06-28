/*
 * @Author: Chenxu
 * @Date: 2023-06-28 15:53:28
 * @LastEditTime: 2023-06-28 15:53:45
 * @Description: 
 */
import Singleton from "../Base/Singleton";

class DataManager extends Singleton {
  static get Instance() {
    return super.GetInstance<DataManager>();
  }

  reset() {
  }
}

export default DataManager;
