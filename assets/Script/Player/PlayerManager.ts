import { _decorator, Component, Node, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {


  start() {

  }

  update(deltaTime: number) {
    const rigidBody = this.node.getComponent(RigidBody)
    rigidBody.applyForce(new Vec3(0, 0, -500 / deltaTime))
  }
}


