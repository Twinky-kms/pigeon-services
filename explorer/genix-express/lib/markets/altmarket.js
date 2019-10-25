var request = require('request');

var base_url = 'https://altmarkets.io/api/v2/tickers/genixbtc';
function get_summary(coin, exchange, cb) {
    var summary = {};
    request({ uri: base_url, json: true }, function (error, response, body) {
        if (error) {
            return cb(error, null);
        } else if (body != undefined) {
            summary['bid'] = body['ticker']['buy'];
            summary['ask'] = body['ticker']['sell'];
            summary['volume'] = body['ticker']['vol'];
            summary['high'] = body['ticker']['high'];
            summary['low'] = body['ticker']['low'];
            summary['last'] = body['ticker']['last'];
          //  summary['change'] = body.Data['Change'];
            return cb(null, summary);
        } else {
            return cb(error, null);
        }
    });

}
function get_trades(coin, exchange, cb) {
    // var req_url = base_url + '/GetMarketHistory/' + crytopia_id;
    // request({ uri: req_url, json: true }, function (error, response, body) {
    //     if (body.Success == true) {
    //         var tTrades = body.Data;
    //         var trades = [];
    //         for (var i = 0; i < tTrades.length; i++) {
    //             var Trade = {
    //                 orderpair: tTrades[i].Label,
    //                 ordertype: tTrades[i].Type,
    //                 amount: parseFloat(tTrades[i].Amount).toFixed(8),
    //                 price: parseFloat(tTrades[i].Price).toFixed(8),
    //                 //  total: parseFloat(tTrades[i].Total).toFixed(8)
    //                 // Necessary because API will return 0.00 for small volume transactions
    //                 total: (parseFloat(tTrades[i].Amount).toFixed(8) * parseFloat(tTrades[i].Price)).toFixed(8),
    //                 timestamp: tTrades[i].Timestamp
    //             }
    //             trades.push(Trade);
    //         }
    //         return cb(null, trades);
    //     } else {
    //         return cb(body.Message, null);
    //     }
    // });
}

function get_orders(coin, exchange, cb) {
    // var req_url = base_url + '/GetMarketOrders/' + cryptopia_id + '/50';
    // request({ uri: req_url, json: true }, function (error, response, body) {
    //     if (body.Success == true) {
    //         var orders = body.Data;
    //         var buys = [];
    //         var sells = [];
    //         if (orders['Buy'].length > 0){
    //             for (var i = 0; i < orders['Buy'].length; i++) {
    //                 var order = {
    //                     amount: parseFloat(orders.Buy[i].Volume).toFixed(8),
    //                     price: parseFloat(orders.Buy[i].Price).toFixed(8),
    //                     //  total: parseFloat(orders.Buy[i].Total).toFixed(8)
    //                     // Necessary because API will return 0.00 for small volume transactions
    //                     total: (parseFloat(orders.Buy[i].Volume).toFixed(8) * parseFloat(orders.Buy[i].Price)).toFixed(8)
    //                 }
    //                 buys.push(order);
    //             }
    //             } else {}
    //             if (orders['Sell'].length > 0) {
    //             for (var x = 0; x < orders['Sell'].length; x++) {
    //                 var order = {
    //                     amount: parseFloat(orders.Sell[x].Volume).toFixed(8),
    //                     price: parseFloat(orders.Sell[x].Price).toFixed(8),
    //                     //    total: parseFloat(orders.Sell[x].Total).toFixed(8)
    //                     // Necessary because API will return 0.00 for small volume transactions
    //                     total: (parseFloat(orders.Sell[x].Volume).toFixed(8) * parseFloat(orders.Sell[x].Price)).toFixed(8)
    //                 }
    //                 sells.push(order);
    //             }
    //         } else {
    //         }
    //         return cb(null, buys, sells);
    //         } else {
    //         return cb(body.Message, [], [])
    //     }
    // });
}


module.exports = {
    get_data: function (coin, exchange, cb) {
        var error = null;
        get_orders(coin, exchange, function (err, buys, sells) {
            if (err) { error = err; }
            get_trades(coin, exchange, function (err, trades) {
                if (err) { error = err; }
                get_summary(coin, exchange, function (err, stats) {
                    if (err) { error = err; }
                    return cb(error, { buys: buys, sells: sells, chartdata: [], trades: trades, stats: stats });
                });
            });
        });
    }
};
