import createNumberMask from 'text-mask-addons/dist/createNumberMask';

/**
 * Mask for Currency format (USD).
 */
const currencyMask = createNumberMask({
  prefix: '$',
  allowDecimal: true,
  decimalLimit: 2,
});

const maskUtils = {
  currencyMask,
};

export default maskUtils;
