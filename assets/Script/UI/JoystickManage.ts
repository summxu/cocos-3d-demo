/*
 * @Author: Chenxu
 * @Date: 2023-06-28 16:15:04
 * @LastEditTime: 2023-06-28 17:22:53
 * @Description: 
 */
import { _decorator, CCFloat, Component, Node, Slider, Vec3 } from 'cc';
import EventManage from '../../RunTime/EventManage';
import { JOYSTICK_EVENT_ENUM } from '../../Enum';
import DataManager from '../../RunTime/DataManage';
const { ccclass, property } = _decorator;

@ccclass('JoystickManage')
export class JoystickManage extends Component {

  @property(CCFloat)
  sliderDefaultProgress: number

  start() {

  }

  // slider事件处理
  sliderEventHanlde(e: Slider) {
    const progress = e.progress
    if (progress < this.sliderDefaultProgress) {
      // 刹车转换，0到默认进度之间->转换成 -0.5-0 之间
      // 线性映射公式 (原数值 - 0) / (sliderDefaultProgress - 0) * (0 - (-0.5)) + (-0.5)
      const tempNum = (progress - 0) / (this.sliderDefaultProgress - 0) * (0 - (-0.5)) + (-0.5)
      DataManager.Instance.gasPedal = Number(tempNum.toFixed(2))
      EventManage.Instance.emit(JOYSTICK_EVENT_ENUM.BRAKE)
    } else if (progress > this.sliderDefaultProgress) {
      // 油门转换，默认进度到1之间->转换成 0-1 之间
      const tempNum = (progress - this.sliderDefaultProgress) / (1 - this.sliderDefaultProgress)
      DataManager.Instance.gasPedal = Number(tempNum.toFixed(2))
      EventManage.Instance.emit(JOYSTICK_EVENT_ENUM.FORWARD)
    }
  }

}
