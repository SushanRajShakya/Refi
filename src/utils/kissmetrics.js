import config from '../configs/config';

/* eslint-disable */
var _kmk = _kmk || config.KISS_METRIC_KEY;

function _kms(u) {
  setTimeout(function() {
    const d = document,
      f = d.getElementsByTagName('script')[0],
      s = d.createElement('script');

    s.type = 'text/javascript';
    s.async = true;
    s.src = u;
    f.parentNode.insertBefore(s, f);
  }, 1);
}
_kms('//i.kissmetrics.com/i.js');
_kms('//scripts.kissmetrics.com/' + _kmk + '.2.js');

/* eslint-enable */
