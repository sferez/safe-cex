import type { BaseExchange } from './exchanges/base';
import { BinanceExchange } from './exchanges/binance/binance.exchange';
import { BitgetExchange } from './exchanges/bitget/bitget.exchange';
import { BybitExchange } from './exchanges/bybit/bybit.exchange';
import { GateExchange } from './exchanges/gate/gate.exchange';
import { OKXExchange } from './exchanges/okx/okx.exchange';
import { WOOXExchange } from './exchanges/woo/woo.exchange';
import { DefaultStore } from './store/store.base';
import type { Store } from './store/store.interface';
import type { ExchangeName, ExchangeOptions } from './types';
import { virtualClock } from './utils/virtual-clock';

const exchanges: Record<ExchangeName, typeof BaseExchange> = {
  bybit: BybitExchange,
  binance: BinanceExchange,
  woo: WOOXExchange,
  okx: OKXExchange,
  gate: GateExchange,
  bitget: BitgetExchange,
};

export const createExchange = (
  exchangeName: keyof typeof exchanges,
  options: ExchangeOptions,
  store?: Store
) => {
  // start the virtual clock to contact exchanges
  // with a server timestamp
  virtualClock.start();
  // eslint-disable-next-line no-console
  console.log(`virtual clock started ${virtualClock}`);

  const Exchange = exchanges[exchangeName];
  return new Exchange(options, store || new DefaultStore());
};
