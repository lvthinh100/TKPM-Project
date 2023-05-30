const catchAsync = require("../utils/catchAsync");

const helpers = {
  shortDesc: function () {
    return this.synopses.slice(0, 100);
  },
  times: function (n, block) {
    var accum = "";
    for (var i = 0; i < n; ++i) accum += block.fn(i + 1);
    return accum;
  },
  withCurItem: function (context, options) {
    const contextWithCurrentItem = context;
    contextWithCurrentItem.currentItem = options.hash.currentItem;
    return options.fn(contextWithCurrentItem);
  },
  isActiveLink: function (page) {
    return page === this.curPage ? "active" : "";
  },
};

exports.renderHome = catchAsync(async (req, res, next) => {
  // const data = await accountModel.getAll();
  res.render("home", {
    template: "asd",
  });
});

exports.renderOFPForm = catchAsync(async (req, res, next) => {
  const sender = req.params.id;
  res.render("makeOFP", {
    sender,
  });
});

exports.renderTransaction = catchAsync(async (req, res, next) => {
  const sender = req.params.id;
  const data = await transactionModel.getAccountTransactions(+sender);
  console.log(data);
  res.render("transactions", {
    transactions: data,
  });
});
