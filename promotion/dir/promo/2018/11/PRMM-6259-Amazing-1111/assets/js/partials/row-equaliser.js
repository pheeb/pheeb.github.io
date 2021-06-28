/*-----------------------------------------------------------------------------
      Utilities
-----------------------------------------------------------------------------*/


/**
 * Only log messages when explicitly desired. Enabled by setting `loud = true;`
 * in the global scope.
 *
 * Use this to provide an option of showing non-essential information that
 * could be helpful for debugging.
 */
window.loud = {
    enabled: (typeof window.loud === 'boolean') ? window.loud : undefined
};

$.each(['warn', 'info', 'log'], function(index, val) {
    loud[val] = function() {
        if(this.enabled) console[val].apply(console, arguments);
    };
});


/**
 * Get a data attribute as an array of arguments.
 *
 * Assuming we use $('[data-instance]').dataArgs('instance'), below is what we
 * can expect the function to return:
 *
 *      var argsVariable = { item: '.selector', force: true };
 *
 *      <div data-instance></div> // Returns [''];
 *      <div data-instance=".selector"></div> // Returns ['.selector'];
 *      <div data-instance="false"></div> // Returns [false];
 *      <div data-instance="item: .selector; force: true;"></div> // Returns [{ item: '.selector', force: true }];
 *      <div data-instance="argsVariable"></div> // Returns [{ item: '.selector', force: true }];
 */
(function() {
    var argsListRegex = /([^:;]*):([^:;]*);/g;
    var numberRegex = /^[\d.\-\+]+$/;

    function normaliseKey(str) {
        return str.trim();
    };

    function normaliseVal(str) {
        var normalisedStr = str.trim();
        
        if(normalisedStr === 'true') {
            return true;
        } else if(normalisedStr === 'false') {
            return false;
        } else if(normalisedStr === 'null') {
            return null;
        } else if(normalisedStr === 'undefined') {
            return undefined;
        } else if(numberRegex.test(normalisedStr)) {
            return parseFloat(normalisedStr, 10);
        } else {
            return normalisedStr;
        }
    };

    $.fn.dataArgs = function(key) {
        var data = this.data(key);

        if(typeof data === 'string' && data) {
            // Check if the string is a reference to a global variable

            var variableReference = window[data];

            if(typeof variableReference === 'object') {
                if(variableReference instanceof Array) {
                    return variableReference;
                }

                return [variableReference];
            }

            // Check if it's an argument list

            var matches = data.match(argsListRegex);

            if(matches !== null) {
                var dataObj = {};

                data.replace(argsListRegex, function(match, key, val) {
                    var normalisedKey = normaliseKey(key);
                    var normalisedVal = normaliseVal(val);
                    dataObj[normalisedKey] = normalisedVal;
                });

                return [dataObj];
            }
        }

        // For everything else, leave the data untouched, but wrap
        // it in an array.
        return [data];
    };
})();

function publicClone(obj) {
    var cloneObj = $.extend({}, obj);

    $.each(cloneObj, function(key) {
        if(key.charAt(0) === '_') {
            delete cloneObj[key];
        }
    });

    return cloneObj;
}

/**
 * Returns a function that is throttled. Throttled functions run only
 * once every XXX ms, no matter how often the user triggers it.
 *
 * @param {Function / Object} props - The function that you want to throttle, or alternatively
 *                                    an object containing several properties.
 *
 * If passing in an object, the usable properties are as follows:
 *
 * @property {String} runWhen - Determines whether the function should run at the beginning or
 *                              at the end of its throttle.
 * @property {Number} duration - Determines the duration of each throttle.
 * @property {Function} fn - The function that you want to throttle.
 *
 * @return {Function}
 */
function throttle(props) {
    var defaults = {
        fn: undefined,
        duration: 250,
        runWhen: 'end'
    };

    if(typeof props === 'function') {
        props = $.extend(defaults, {
            fn: props
        });
    } else {
        props = $.extend(defaults, props);
    }

    var throttledFn;

    if(typeof props.fn === 'undefined') {
        console.warn('_utilities.js: Throttle function is missing an actual function to throttle.');
        throttledFn = function() {};
    } else {
        var last = new Date(
                (props.runWhen === 'end')
                ? undefined
                : 0
            ),
            timer;

        throttledFn = function() {
            var now = new Date(),
                diff = now - last;

            clearTimeout(timer);

            if(props.runWhen === 'end'
            && diff >= Math.min(props.duration*2, props.duration+1000)) {
                last = now;

                timer = setTimeout(function() {
                    props.fn.apply(this, arguments);
                    last = new Date();
                }, props.duration);
            } else if(diff >= props.duration) {
                props.fn.apply(this, arguments);
                last = now;
            } else {
                timer = setTimeout(function() {
                    props.fn.apply(this, arguments);
                    last = new Date();
                }, props.duration-diff);
            }
        };
    }

    return throttledFn;
};

window.throttle = throttle;

/* Check if the A is B OR if A is inside B, e.g. $(A).isInside(B). */
$.fn.isInside = function isInside(target) {
    return target.is(this) || target.find(this).length;
};



function publicClone(obj) {
    var cloneObj = $.extend({}, obj);

    $.each(cloneObj, function(key) {
        if(key.charAt(0) === '_') {
            delete cloneObj[key];
        }
    });

    return cloneObj;
}

function jQueryElemExists(a) {
    return typeof a === 'object'
        && a instanceof jQuery
        && a.length;
}

function isFilledArray(a) {
    return typeof a === 'object'
        && a instanceof Array
        && a.length;
}

function isExistingJqueryElem(a) {
    return typeof a === 'object'
        && a instanceof jQuery
        && a.length;
}

function getNumFromFontFamily($a) {
    if ($a.css('font-family')) {
        return parseInt($a.css('font-family').replace(/['"]/g, ''), 10);
    }
    return 0;
}

window.getNumFromFontFamily = getNumFromFontFamily;






/**
 *  Data attribute:                     data-row-equaliser
 *  Global defaults:                    No
 *  Default data attribute parameter:   items
 *
 *  Parameters list for `data-row-equaliser`:
 *  
 *      items: '.your-item'
 *      context: '.item-context'    // OPTIONAL
 *      fixedRows: true             // OPTIONAL
 *  
 *-----------------------------------------------------------------------------
 *
 *  Simple sample:
 *
 *      <div data-row-equaliser=".plan-item">
 *          <div class="column">
 *              <div class="plan-item"> ... </div>
 *          </div>
 *          <div class="column">
 *              <div class="plan-item"> ... </div>
 *          </div>
 *          <div class="column">
 *              <div class="plan-item"> ... </div>
 *          </div>
 *      </div>
 *
 *  This function groups items into "rows" by comparing their positions on
 *  the page. An item is considered to be on the "next" row if its left offset
 *  position is less than or equal to the previous item. After that, each
 *  "row" will have their height synced to the tallest one.
 *
 *  This works fine most of the time, and it is also responsive-friendly, 
 *  but source order issues end up breaking the function. To fix that, you
 *  can either enable `fixedRows`, or use the `context` parameter.
 *
 *  If `fixedRows` is set to `true`, the function will assume that all the
 *  targetted items are ALWAYS in the same row. This allows you to freely
 *  adjust the horizontal position of your items, as long as they are all on
 *  a single row.
 *
 *  If `context` is set, the function will group the items together based on
 *  their index relative to the given context. Consider the markup below:
 *
 *      <div data-row-equaliser="items: .plan-item; context: .column;">
 *          <div class="column">
 *              <div class="plan-item"> ... </div>
 *              <div class="plan-item"> ... </div>
 *              <div class="plan-item"> ... </div>
 *          </div>
 *          <div class="column">
 *              <div class="plan-item"> ... </div>
 *              <div class="plan-item"> ... </div>
 *              <div class="plan-item"> ... </div>
 *          </div>
 *          <div class="column">
 *              <div class="plan-item"> ... </div>
 *              <div class="plan-item"> ... </div>
 *              <div class="plan-item"> ... </div>
 *          </div>
 *      </div>
 *
 *  In the above markup, there are multiple items within the same column, but
 *  each item breaks into the next line (and therefore, by position, isn't on
 *  the same "row" anymore). This will cause the function to no longer work as
 *  intended. By setting `context: .column;`, the function will now sync the
 *  height of the first `.plan-item` in each of the column, regardless of their
 *  positions. Then it will continue with the rest of the `.plan-item`.
 */
(function() {
    var heightSyncArray = [];

    function syncInstance(o) {
        var $context;

        if(typeof o.context === 'string') {
            $context = o.$instance.find(o.context);

            if(!$context.length) {
                $context = o.$instance;
            }
        } else {
            $context = o.$instance;
        }

        if($context.length > 1) {
            var maxIndex;
            var selector;
            var $group;
            var i, j;

            for(i = 0; i < o.selectors.length; i++) {
                selector = o.selectors[i];
                maxIndex = [];

                $context.each(function() {
                    maxIndex.push($(this).find(selector).length);
                });

                maxIndex = Math.max.apply(null, maxIndex);

                for(j = 0; j < maxIndex; j++) {
                    $group = $();

                    $context.each(function() {
                        $group = $group.add($(this).find(selector).eq(j));
                    });

                    syncGroup($group, o.fixedRows);
                }
            }
        } else {
            for(var i = 0; i < o.selectors.length; i++) {
                syncGroup($context.find(o.selectors[i]), o.fixedRows);
            }
        }
    }

    function syncGroup($group, fixedRows) {
        var total = $group.length;
        if(!total) return;

        var currentOffset = -9999;
        var rows = [];
        var row = [];
        var maxHeights = [];

        if(fixedRows === true) {
            rows.push($group);
        } else {
            $group.each(function(index) {
                var targetOffset = $(this).offset().left;

                if(targetOffset > currentOffset) {
                    row.push(this);
                } else {
                    rows.push(row);
                    row = [this];
                }

                if(index >= total-1) {
                    rows.push(row);
                } else {
                    currentOffset = targetOffset; 
                }
            });
        }

        $.each(rows, function(arrayIndex, rowArr) {
            var maxHeight = [];

            $(rowArr)
                .css('height', '')
                .each(function() {
                    maxHeight.push($(this).outerHeight());
                });

            maxHeights[arrayIndex] = maxHeight.slice(0);
        });

        $.each(maxHeights, function(arrayIndex, maxHeightArr) {
            if(maxHeightArr.length > 1) {
                $(rows[arrayIndex]).css(
                    'height',
                    Math.max.apply(null, maxHeightArr)
                );
            }
        });
    }

    function trimArrayValues(value) {
        return value.trim();
    }

    $('[data-row-equaliser]').each(function() {
        var $instance = $(this);
        var dataArgs = $instance.dataArgs('row-equaliser');

        $.each(dataArgs, function(index, instanceArgs) {
            var items;
            var normalisedArgs;

            if(typeof instanceArgs === 'string') {
                items = instanceArgs;
                normalisedArgs = { items: instanceArgs };
            } else {
                items = instanceArgs.items;
                normalisedArgs = instanceArgs;
            }

            if(typeof items !== 'string') {
                console.error('_row-equaliser.js: Expecting a selector string as either the data attribute\'s value, or as the `items` argument. For example, `data-row-equaliser=".your-selector"` or `data-row-equaliser="items: .your-selector;"`.');
                console.info('Instance:', $instance[0]);
                return;
            }

            var splitItems = items.split(',').map(trimArrayValues);

            heightSyncArray.push(
                $.extend({
                    $instance: $instance,
                    selectors: splitItems
                }, normalisedArgs)
            );

            var throttledSyncGroup = throttle(function() {
                for(var i = 0; i < splitItems.length; i++) {
                    syncGroup($instance.find(splitItems[i]));
                }
            });

            $instance.find('img').each(function() {
                if(!this.complete) {
                    $(this).on('load', throttledSyncGroup);
                }
            });
        });
    });

    if(heightSyncArray.length) {
        $(window)
            .on('resize.rowEqualiser', throttle(function(e, $scope) {
                for(var i = 0; i < heightSyncArray.length; i++) {
                    if(jQueryElemExists($scope)) {
                        if($scope.find(heightSyncArray[i].$instance).length) {
                            syncInstance(heightSyncArray[i]);
                        }
                    } else {
                        syncInstance(heightSyncArray[i]);
                    }
                }
            }))
            .trigger('resize.rowEqualiser');
    }



    // $(window).trigger('resize.rowEqualiser');
})();