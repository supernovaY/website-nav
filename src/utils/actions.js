function emptyAction() {
  //警告：提示当前使用的是空Action
  console.warn('Current execute action empty!');
}

class Actions {
  //默认值 Action
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction
  };

  /*
  * 设置 actions
  * */
  setActions(actions) {
    this.actions = actions;
  }

  /*
  * 映射
  * */
  onGlobalStateChange(...args) {
    return this.actions.onGlobalStateChange(...args);
  }

  /*
  * 映射
  * */
  setGlobalState(...args) {
    return this.actions.setGlobalState(...args);
  }

}

const actions = new Actions();
export default actions;
