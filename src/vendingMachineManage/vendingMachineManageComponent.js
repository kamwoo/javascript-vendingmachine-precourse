import VendingMachineManageView from './vendingMachineManageView.js';
import LocalStorageUtils from '../utils/localStorageUtils.js';
import ValidateUtils from '../utils/validateUtils.js';
import { BUTTON, INPUT } from './vendingMachineManageViewInfo.js';
import { $ } from '../utils/common.js';

export default class VendingMachineManageComponent {
  constructor() {
    this.vendingMachineManageView = new VendingMachineManageView();
  }

  render() {
    this.vendingMachineManageView.render();
    this.configureButton();
  }

  configureButton() {
    $(`#${BUTTON.ID}`).addEventListener('click', this.onClickButton);
  }

  onClickButton = () => {
    const inputCoin = Number($(`#${INPUT.ID}`).value);

    if (ValidateUtils.checkInputAmount(inputCoin)) {
      this.saveRamdomCoins(inputCoin);
    }
  };

  generateRandomNumber(remain) {
    const numberList = [500, 100, 50, 10];
    let randomNumber = MissionUtils.Random.pickNumberInList(numberList);
    if (randomNumber > remain) {
      randomNumber = this.generateRandomNumber(remain);
    }
    return randomNumber;
  }

  saveRamdomCoins(coin) {
    let coinStatus = LocalStorageUtils.getMachineManageTableItem();

    while (coin) {
      const randomCoin = this.generateRandomNumber(coin);
      coinStatus[randomCoin] += 1;
      coin -= randomCoin;
    }

    LocalStorageUtils.setMachineManageTableItem(coinStatus);
  }
}
