import { TestBed } from '@angular/core/testing';
import { TxItem, TxItemOption } from "./tx-item";
import { Purchasable } from './purchasable';
import { Option } from './option';
import {before} from "selenium-webdriver/testing";

describe('Tx_item', () => {
  let testPurchasable: Purchasable;
  let testTxItemOption: TxItemOption;
  let testTxItem: TxItem;

  beforeEach(()=> {
    testPurchasable = new Purchasable({
      id: 1,
      name: 'testPurch',
      base_price: 100,
      options: [new Option({
        name: 'testOption',
        base_price: 10,
        quantity: 2,
        total_price: 20,
      })]
    });
    testTxItemOption = new TxItemOption({
      optionName: 'testOption',
      basePrice: 10,
      qty: 2,
      totalPrice: 20,
    });
    testTxItem = new TxItem({
      purchasable: testPurchasable,
      purchasableName: testPurchasable.name,
      purchasableBasePrice: testPurchasable.base_price,
      qty: 2,
      price: testPurchasable.base_price,
      options: [testTxItemOption],
      totalPrice: (testPurchasable.base_price * 2),
      createdAt: "testBed",
      state: "tested",
    });
  });

  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations: [ TxItem, TxItemOption ],
      imports: [ Purchasable ],
    });
  });

  it ('loadTxItemOption should convert Option to TxItemOption', ()=>{
    const newTxItemOption = testTxItem.loadTxItemOption({
      name: 'testOption',
      base_price: 10,
      qty: 2,
      total_price: 20,
    });
    expect(newTxItemOption).toEqual(testTxItemOption);
  })
});
