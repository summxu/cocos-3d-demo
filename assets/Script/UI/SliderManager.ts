/*
 * @Author: Chenxu
 * @Date: 2023-06-28 16:06:48
 * @LastEditTime: 2023-06-29 09:17:40
 * @Description: 
 */
import { _decorator, CCFloat, Component, Slider } from 'cc';
import { JOYSTICK_EVENT_ENUM } from '../../Enum';
import DataManagerr from '../../RunTime/DataManager';
import EventManager from '../../RunTime/EventManager';
const { ccclass, property } = _decorator;

@ccclass('SliderManager')
export class SliderManager extends Component {

  @property(CCFloat)
  sliderDefaultProgress: number

  // slider事件处理
  sliderEventHanlde(e: Slider) {
    const progress = e.progress
    if (progress < this.sliderDefaultProgress) {
      // 刹车转换，0到默认进度之间->转换成 -0.5-0 之间
      // 线性映射公式 (原数值 - 0) / (sliderDefaultProgress - 0) * (0 - (-0.5)) + (-0.5)
      const tempNum = (progress - 0) / (this.sliderDefaultProgress - 0) * (0 - (-0.5)) + (-0.5)
      DataManagerr.Instance.gasPedal = Number(tempNum.toFixed(3))
      EventManager.Instance.emit(JOYSTICK_EVENT_ENUM.BRAKE)
    } else if (progress > this.sliderDefaultProgress) {
      // 油门转换，默认进度到1之间->转换成 0-1 之间
      const tempNum = (progress - this.sliderDefaultProgress) / (1 - this.sliderDefaultProgress)
      DataManagerr.Instance.gasPedal = Number(tempNum.toFixed(3))
      EventManager.Instance.emit(JOYSTICK_EVENT_ENUM.FORWARD)
    }
  }
}
