/*!
 * jQuery Checkall - A Checkbox Checker
 *
 * The MIT License
 *
 * author:  Washington Botelho
 * github:  wbotelhos/checkall
 * version: 0.1.0
 *
 */

function Checkall(element, options) {
  'use strict';

  this.self  = $(element);
  this.opt   = $.extend(true, {}, $.fn.checkall.defaults, options);
  this.items = this.self.find(this.opt.item);
  this.total = this.items.length;
  this.all   = this.self.find(this.opt.all);
}

Checkall.prototype._bindAll = function() {
  'use strict';

  var that = this;

  this.all.on('change', function() {
    that.items.prop('checked', this.checked);
  });
};

Checkall.prototype._bindItems = function() {
  'use strict';

  this.items.on('change', this._inspect.bind(this));
};

Checkall.prototype._create = function() {
  'use strict';

  this._bindAll();
  this._bindItems();
  this._inspect();
};

Checkall.prototype._inspect = function() {
  'use strict';

  var checked = this.items.filter(':checked');

  this.all.prop('checked', checked.length === this.total);
};

(function($) {
  'use strict';

  $.fn.checkall = function(options) {
    var
      args   = Array.prototype.slice.call(arguments, 1),
      method = Checkall.prototype[options];

    return this.each(function() {
      var
        self     = $(this),
        instance = self.data('checkall');

      if (!instance) {
        instance = new Checkall(this, options);

        instance._create();

        self.data('checkall', instance);
      }

      if (method) {
        method.apply(instance, args);
      } else if (options && typeof options !== 'object') {
        $.error('Method ' + options + ' does not exist!');
      }
    });
  };

  $.fn.checkall.defaults = {
    all:  '.checkall__all',
    item: '.checkall__item'
  };
})(jQuery);