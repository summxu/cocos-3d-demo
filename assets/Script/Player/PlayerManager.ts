/*
 * @Author: Chenxu
 * @Date: 2023-06-27 10:19:51
 * @LastEditTime: 2023-06-28 17:59:20
 * @Description: 
 */
import { Component, EventKeyboard, Input, KeyCode, RigidBody, Vec3, _decorator, input } from 'cc';
import { JOYSTICK_EVENT_ENUM, LANE_ENUM } from '../../Enum';
import EventManage from '../../RunTime/EventManage';
import DataManager from '../../RunTime/DataManage';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {

  maxForwardForce: number = 1000 // 最大前进的力
  maxBrakeForce: number = 1000 // 最大刹车的力
  lane: LANE_ENUM = LANE_ENUM.RIGHT
  isForward: Boolean = false
  isBrake: Boolean = false

  private tempPos: Vec3 = new Vec3()
  private translateSpeed: number = 5 // 平移速度
  private tempX: number = -0.5 // 记录左右移动的x

  start() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    EventManage.Instance.on(JOYSTICK_EVENT_ENUM.FORWARD, this.forwardHandle, this)
    EventManage.Instance.on(JOYSTICK_EVENT_ENUM.BRAKE, this.brakeHandle, this)
  }

  onDestroy() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    EventManage.Instance.off(JOYSTICK_EVENT_ENUM.FORWARD, this.forwardHandle)
    EventManage.Instance.off(JOYSTICK_EVENT_ENUM.BRAKE, this.brakeHandle)
  }

  update(deltaTime: number) {
    this.move(deltaTime)
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_D:
        this.lane = LANE_ENUM.RIGHT
        break;
      case KeyCode.KEY_A:
        this.lane = LANE_ENUM.LEFT
        break;
    }
  }

  // 前进处理函数
  forwardHandle() {
    this.isBrake = false
    const gasPedal = DataManager.Instance.gasPedal
    gasPedal > 0 ? this.isForward = true : this.isForward = false
  }

  // 刹车处理函数
  brakeHandle() {
    this.isForward = false
    const gasPedal = DataManager.Instance.gasPedal
    gasPedal < 0 ? this.isBrake = true : this.isBrake = false
  }

  move(deltaTime: number) {
    this.node.getPosition(this.tempPos)

    if (this.isForward) {
      // 向前移动
      const gasPedal = DataManager.Instance.gasPedal
      const rigidBody = this.node.getComponent(RigidBody)
      rigidBody.applyForce(new Vec3(0, 0, this.maxForwardForce * gasPedal * deltaTime))
    }

    if (this.isBrake) {
      // 刹车
      const gasPedal = DataManager.Instance.gasPedal
      const rigidBody = this.node.getComponent(RigidBody)
      rigidBody.applyForce(new Vec3(0, 0, this.maxBrakeForce * gasPedal * deltaTime))
    }

    // 左右平移
    if (this.lane === LANE_ENUM.RIGHT) {
      const { y, z } = this.tempPos
      if (this.tempX > -0.5) {
        this.tempX -= this.translateSpeed * deltaTime
        this.node.setPosition(new Vec3(this.tempX, y, z))
      }
    } else if (this.lane === LANE_ENUM.LEFT) {
      const { y, z } = this.tempPos
      if (this.tempX < 0.5) {
        this.tempX += this.translateSpeed * deltaTime
        this.node.setPosition(new Vec3(this.tempX, y, z))
      }
    }
  }

}
