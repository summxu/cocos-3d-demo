/*
 * @Author: Chenxu
 * @Date: 2023-06-28 16:06:48
 * @LastEditTime: 2023-06-29 10:24:59
 * @Description: 
 */
import { _decorator, Button, CCFloat, Component, Slider } from 'cc';
import { JOYSTICK_EVENT_ENUM } from '../../Enum';
import DataManager from '../../RunTime/DataManager';
import EventManager from '../../RunTime/EventManager';
const { ccclass, property } = _decorator;

@ccclass('SliderManager')
export class SliderManager extends Component {

  @property(CCFloat)
  sliderDefaultProgress: number

  private loosen: boolean = false // 松油门
  private sliderComponent: Slider
  private speed: number = 2 // 回弹速度

  update(deltaTime: number) {
    if (this.loosen) {
      const isForward = DataManager.Instance?.player.isForward
      const isBrake = DataManager.Instance?.player.isBrake
      if (isForward && this.sliderComponent.progress > this.sliderDefaultProgress) {
        this.sliderComponent.progress -= this.speed * deltaTime
      } else if (isBrake && this.sliderComponent.progress < this.sliderDefaultProgress) {
        this.sliderComponent.progress += this.speed * deltaTime
      } else {
        this.loosen = false
        this.sliderComponent.progress = this.sliderDefaultProgress
      }
    }
  }

  // slider滑动事件处理
  sliderEventHanlde(e: Slider) {
    const progress = e.progress
    this.loosen = false
    if (progress < this.sliderDefaultProgress) {
      // 刹车转换，0到默认进度之间->转换成 -0.5-0 之间
      // 线性映射公式 (原数值 - 0) / (sliderDefaultProgress - 0) * (0 - (-0.5)) + (-0.5)
      const tempNum = (progress - 0) / (this.sliderDefaultProgress - 0) * (0 - (-0.5)) + (-0.5)
      DataManager.Instance.gasPedal = Number(tempNum.toFixed(3))
      EventManager.Instance.emit(JOYSTICK_EVENT_ENUM.BRAKE)
    } else if (progress > this.sliderDefaultProgress) {
      // 油门转换，默认进度到1之间->转换成 0-1 之间
      const tempNum = (progress - this.sliderDefaultProgress) / (1 - this.sliderDefaultProgress)
      DataManager.Instance.gasPedal = Number(tempNum.toFixed(3))
      EventManager.Instance.emit(JOYSTICK_EVENT_ENUM.FORWARD)
    }
  }

  // slider 按钮事件，松开之后才会有
  sliderBtnClickEventHanlde(e: Button) {
    this.loosen = true
    DataManager.Instance.resetGasPedal() // 松手既清除油门
    this.sliderComponent = this.node.getComponent(Slider)
  }
}
