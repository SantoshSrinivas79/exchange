/*!
 * # Semantic UI 2.3.0 - Visibility
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

(function ($, window, document, undefined) {
    window = (typeof window !== 'undefined' && window.Math == Math)
        ? window
        : (typeof self !== 'undefined' && self.Math == Math)
            ? self
            : Function('return this')();
    $.fn.visibility = function(parameters) {
        const
            $allModules = $(this);
        const moduleSelector = $allModules.selector || '';

        let time = new Date().getTime();
        let performance = [];

        const query = arguments[0];
        const methodInvoked = (typeof query === 'string');
        const queryArguments = [].slice.call(arguments, 1);
        let returnedValue;

        const moduleCount = $allModules.length;
        let loadedCount = 0;
        $allModules
            .each(function() {
                const
                    settings = ($.isPlainObject(parameters))
                        ? $.extend(true, {}, $.fn.visibility.settings, parameters)
                        : $.extend({}, $.fn.visibility.settings);

                const { className } = settings;
                const { namespace } = settings;
                const { error } = settings;
                const { metadata } = settings;

                const eventNamespace = `.${namespace}`;
                const moduleNamespace = `module-${namespace}`;

                const $window = $(window);

                const $module = $(this);
                const $context = $(settings.context);

                let $placeholder;

                const selector = $module.selector || '';
                let instance = $module.data(moduleNamespace);

                const requestAnimationFrame = window.requestAnimationFrame
          || window.mozRequestAnimationFrame
          || window.webkitRequestAnimationFrame
          || window.msRequestAnimationFrame
          || function(callback) { setTimeout(callback, 0); };

                const element = this;
                let disabled = false;

                let contextObserver;
                let observer;
                let module;
                module = {

                    initialize() {
                        module.debug('Initializing', settings);

                        module.setup.cache();

                        if (module.should.trackChanges()) {
                            if (settings.type == 'image') {
                                module.setup.image();
                            }
                            if (settings.type == 'fixed') {
                                module.setup.fixed();
                            }

                            if (settings.observeChanges) {
                                module.observeChanges();
                            }
                            module.bind.events();
                        }

                        module.save.position();
                        if (!module.is.visible()) {
                            module.error(error.visible, $module);
                        }

                        if (settings.initialCheck) {
                            module.checkVisibility();
                        }
                        module.instantiate();
                    },

                    instantiate() {
                        module.debug('Storing instance', module);
                        $module
                            .data(moduleNamespace, module);
                        instance = module;
                    },

                    destroy() {
                        module.verbose('Destroying previous module');
                        if (observer) {
                            observer.disconnect();
                        }
                        if (contextObserver) {
                            contextObserver.disconnect();
                        }
                        $window
                            .off(`load${eventNamespace}`, module.event.load)
                            .off(`resize${eventNamespace}`, module.event.resize);
                        $context
                            .off(`scroll${eventNamespace}`, module.event.scroll)
                            .off(`scrollchange${eventNamespace}`, module.event.scrollchange);
                        if (settings.type == 'fixed') {
                            module.resetFixed();
                            module.remove.placeholder();
                        }
                        $module
                            .off(eventNamespace)
                            .removeData(moduleNamespace);
                    },

                    observeChanges() {
                        if ('MutationObserver' in window) {
                            contextObserver = new MutationObserver(module.event.contextChanged);
                            observer = new MutationObserver(module.event.changed);
                            contextObserver.observe(document, {
                                childList: true,
                                subtree: true,
                            });
                            observer.observe(element, {
                                childList: true,
                                subtree: true,
                            });
                            module.debug('Setting up mutation observer', observer);
                        }
                    },

                    bind: {
                        events() {
                            module.verbose('Binding visibility events to scroll and resize');
                            if (settings.refreshOnLoad) {
                                $window
                                    .on(`load${eventNamespace}`, module.event.load);
                            }
                            $window
                                .on(`resize${eventNamespace}`, module.event.resize)
                            ;
                            // pub/sub pattern
                            $context
                                .off(`scroll${eventNamespace}`)
                                .on(`scroll${eventNamespace}`, module.event.scroll)
                                .on(`scrollchange${eventNamespace}`, module.event.scrollchange);
                        },
                    },

                    event: {
                        changed(mutations) {
                            module.verbose('DOM tree modified, updating visibility calculations');
                            module.timer = setTimeout(function() {
                                module.verbose('DOM tree modified, updating sticky menu');
                                module.refresh();
                            }, 100);
                        },
                        contextChanged(mutations) {
                            [].forEach.call(mutations, function(mutation) {
                                if (mutation.removedNodes) {
                                    [].forEach.call(mutation.removedNodes, function(node) {
                                        if (node == element || $(node).find(element).length > 0) {
                                            module.debug('Element removed from DOM, tearing down events');
                                            module.destroy();
                                        }
                                    });
                                }
                            });
                        },
                        resize() {
                            module.debug('Window resized');
                            if (settings.refreshOnResize) {
                                requestAnimationFrame(module.refresh);
                            }
                        },
                        load() {
                            module.debug('Page finished loading');
                            requestAnimationFrame(module.refresh);
                        },
                        // publishes scrollchange event on one scroll
                        scroll() {
                            if (settings.throttle) {
                                clearTimeout(module.timer);
                                module.timer = setTimeout(function() {
                                    $context.triggerHandler(`scrollchange${eventNamespace}`, [$context.scrollTop()]);
                                }, settings.throttle);
                            } else {
                                requestAnimationFrame(function() {
                                    $context.triggerHandler(`scrollchange${eventNamespace}`, [$context.scrollTop()]);
                                });
                            }
                        },
                        // subscribes to scrollchange
                        scrollchange(event, scrollPosition) {
                            module.checkVisibility(scrollPosition);
                        },
                    },

                    precache(images, callback) {
                        if (!(images instanceof Array)) {
                            images = [images];
                        }
                        let
                            imagesLength = images.length;
                        let loadedCounter = 0;
                        const cache = [];
                        let cacheImage = document.createElement('img');
                        const handleLoad = function() {
                            loadedCounter++;
                            if (loadedCounter >= images.length) {
                                if ($.isFunction(callback)) {
                                    callback();
                                }
                            }
                        };
                        while (imagesLength--) {
                            cacheImage = document.createElement('img');
                            cacheImage.onload = handleLoad;
                            cacheImage.onerror = handleLoad;
                            cacheImage.src = images[imagesLength];
                            cache.push(cacheImage);
                        }
                    },

                    enableCallbacks() {
                        module.debug('Allowing callbacks to occur');
                        disabled = false;
                    },

                    disableCallbacks() {
                        module.debug('Disabling all callbacks temporarily');
                        disabled = true;
                    },

                    should: {
                        trackChanges() {
                            if (methodInvoked) {
                                module.debug('One time query, no need to bind events');
                                return false;
                            }
                            module.debug('Callbacks being attached');
                            return true;
                        },
                    },

                    setup: {
                        cache() {
                            module.cache = {
                                occurred: {},
                                screen: {},
                                element: {},
                            };
                        },
                        image() {
                            const
                                src = $module.data(metadata.src);
                            if (src) {
                                module.verbose('Lazy loading image', src);
                                settings.once = true;
                                settings.observeChanges = false;

                                // show when top visible
                                settings.onOnScreen = function() {
                                    module.debug('Image on screen', element);
                                    module.precache(src, function() {
                                        module.set.image(src, function() {
                                            loadedCount++;
                                            if (loadedCount == moduleCount) {
                                                settings.onAllLoaded.call(this);
                                            }
                                            settings.onLoad.call(this);
                                        });
                                    });
                                };
                            }
                        },
                        fixed() {
                            module.debug('Setting up fixed');
                            settings.once = false;
                            settings.observeChanges = false;
                            settings.initialCheck = true;
                            settings.refreshOnLoad = true;
                            if (!parameters.transition) {
                                settings.transition = false;
                            }
                            module.create.placeholder();
                            module.debug('Added placeholder', $placeholder);
                            settings.onTopPassed = function() {
                                module.debug('Element passed, adding fixed position', $module);
                                module.show.placeholder();
                                module.set.fixed();
                                if (settings.transition) {
                                    if ($.fn.transition !== undefined) {
                                        $module.transition(settings.transition, settings.duration);
                                    }
                                }
                            };
                            settings.onTopPassedReverse = function() {
                                module.debug('Element returned to position, removing fixed', $module);
                                module.hide.placeholder();
                                module.remove.fixed();
                            };
                        },
                    },

                    create: {
                        placeholder() {
                            module.verbose('Creating fixed position placeholder');
                            $placeholder = $module
                                .clone(false)
                                .css('display', 'none')
                                .addClass(className.placeholder)
                                .insertAfter($module);
                        },
                    },

                    show: {
                        placeholder() {
                            module.verbose('Showing placeholder');
                            $placeholder
                                .css('display', 'block')
                                .css('visibility', 'hidden');
                        },
                    },
                    hide: {
                        placeholder() {
                            module.verbose('Hiding placeholder');
                            $placeholder
                                .css('display', 'none')
                                .css('visibility', '');
                        },
                    },

                    set: {
                        fixed() {
                            module.verbose('Setting element to fixed position');
                            $module
                                .addClass(className.fixed)
                                .css({
                                    position: 'fixed',
                                    top: `${settings.offset}px`,
                                    left: 'auto',
                                    zIndex: settings.zIndex,
                                });
                            settings.onFixed.call(element);
                        },
                        image(src, callback) {
                            $module
                                .attr('src', src);
                            if (settings.transition) {
                                if ($.fn.transition !== undefined) {
                                    if ($module.hasClass(className.visible)) {
                                        module.debug('Transition already occurred on this image, skipping animation');
                                        return;
                                    }
                                    $module.transition(settings.transition, settings.duration, callback);
                                } else {
                                    $module.fadeIn(settings.duration, callback);
                                }
                            } else {
                                $module.show();
                            }
                        },
                    },

                    is: {
                        onScreen() {
                            const
                                calculations = module.get.elementCalculations();
                            return calculations.onScreen;
                        },
                        offScreen() {
                            const
                                calculations = module.get.elementCalculations();
                            return calculations.offScreen;
                        },
                        visible() {
                            if (module.cache && module.cache.element) {
                                return !(module.cache.element.width === 0 && module.cache.element.offset.top === 0);
                            }
                            return false;
                        },
                        verticallyScrollableContext() {
                            const
                                overflowY = ($context.get(0) !== window)
                                    ? $context.css('overflow-y')
                                    : false;
                            return (overflowY == 'auto' || overflowY == 'scroll');
                        },
                        horizontallyScrollableContext() {
                            const
                                overflowX = ($context.get(0) !== window)
                                    ? $context.css('overflow-x')
                                    : false;
                            return (overflowX == 'auto' || overflowX == 'scroll');
                        },
                    },

                    refresh() {
                        module.debug('Refreshing constants (width/height)');
                        if (settings.type == 'fixed') {
                            module.resetFixed();
                        }
                        module.reset();
                        module.save.position();
                        if (settings.checkOnRefresh) {
                            module.checkVisibility();
                        }
                        settings.onRefresh.call(element);
                    },

                    resetFixed () {
                        module.remove.fixed();
                        module.remove.occurred();
                    },

                    reset() {
                        module.verbose('Resetting all cached values');
                        if ($.isPlainObject(module.cache)) {
                            module.cache.screen = {};
                            module.cache.element = {};
                        }
                    },

                    checkVisibility(scroll) {
                        module.verbose('Checking visibility of element', module.cache.element);

                        if (!disabled && module.is.visible()) {
                            // save scroll position
                            module.save.scroll(scroll);

                            // update calculations derived from scroll
                            module.save.calculations();

                            // percentage
                            module.passed();

                            // reverse (must be first)
                            module.passingReverse();
                            module.topVisibleReverse();
                            module.bottomVisibleReverse();
                            module.topPassedReverse();
                            module.bottomPassedReverse();

                            // one time
                            module.onScreen();
                            module.offScreen();
                            module.passing();
                            module.topVisible();
                            module.bottomVisible();
                            module.topPassed();
                            module.bottomPassed();

                            // on update callback
                            if (settings.onUpdate) {
                                settings.onUpdate.call(element, module.get.elementCalculations());
                            }
                        }
                    },

                    passed(amount, newCallback) {
                        const
                            calculations = module.get.elementCalculations();
                        let amountInPixels
          ;
          // assign callback
                        if (amount && newCallback) {
                            settings.onPassed[amount] = newCallback;
                        } else if (amount !== undefined) {
                            return (module.get.pixelsPassed(amount) > calculations.pixelsPassed);
                        } else if (calculations.passing) {
                            $.each(settings.onPassed, function(amount, callback) {
                                if (calculations.bottomVisible || calculations.pixelsPassed > module.get.pixelsPassed(amount)) {
                                    module.execute(callback, amount);
                                } else if (!settings.once) {
                                    module.remove.occurred(callback);
                                }
                            });
                        }
                    },

                    onScreen(newCallback) {
                        const
                            calculations = module.get.elementCalculations();
                        const callback = newCallback || settings.onOnScreen;
                        const callbackName = 'onScreen';
                        if (newCallback) {
                            module.debug('Adding callback for onScreen', newCallback);
                            settings.onOnScreen = newCallback;
                        }
                        if (calculations.onScreen) {
                            module.execute(callback, callbackName);
                        } else if (!settings.once) {
                            module.remove.occurred(callbackName);
                        }
                        if (newCallback !== undefined) {
                            return calculations.onOnScreen;
                        }
                    },

                    offScreen(newCallback) {
                        const
                            calculations = module.get.elementCalculations();
                        const callback = newCallback || settings.onOffScreen;
                        const callbackName = 'offScreen';
                        if (newCallback) {
                            module.debug('Adding callback for offScreen', newCallback);
                            settings.onOffScreen = newCallback;
                        }
                        if (calculations.offScreen) {
                            module.execute(callback, callbackName);
                        } else if (!settings.once) {
                            module.remove.occurred(callbackName);
                        }
                        if (newCallback !== undefined) {
                            return calculations.onOffScreen;
                        }
                    },

                    passing(newCallback) {
                        const
                            calculations = module.get.elementCalculations();
                        const callback = newCallback || settings.onPassing;
                        const callbackName = 'passing';
                        if (newCallback) {
                            module.debug('Adding callback for passing', newCallback);
                            settings.onPassing = newCallback;
                        }
                        if (calculations.passing) {
                            module.execute(callback, callbackName);
                        } else if (!settings.once) {
                            module.remove.occurred(callbackName);
                        }
                        if (newCallback !== undefined) {
                            return calculations.passing;
                        }
                    },


                    topVisible(newCallback) {
                        const
                            calculations = module.get.elementCalculations();
                        const callback = newCallback || settings.onTopVisible;
                        const callbackName = 'topVisible';
                        if (newCallback) {
                            module.debug('Adding callback for top visible', newCallback);
                            settings.onTopVisible = newCallback;
                        }
                        if (calculations.topVisible) {
                            module.execute(callback, callbackName);
                        } else if (!settings.once) {
                            module.remove.occurred(callbackName);
                        }
                        if (newCallback === undefined) {
                            return calculations.topVisible;
                        }
                    },

                    bottomVisible(newCallback) {
                        const
                            calculations = module.get.elementCalculations();
                        const callback = newCallback || settings.onBottomVisible;
                        const callbackName = 'bottomVisible';
                        if (newCallback) {
                            module.debug('Adding callback for bottom visible', newCallback);
                            settings.onBottomVisible = newCallback;
                        }
                        if (calculations.bottomVisible) {
                            module.execute(callback, callbackName);
                        } else if (!settings.once) {
                            module.remove.occurred(callbackName);
                        }
                        if (newCallback === undefined) {
                            return calculations.bottomVisible;
                        }
                    },

                    topPassed(newCallback) {
                        const
                            calculations = module.get.elementCalculations();
                        const callback = newCallback || settings.onTopPassed;
                        const callbackName = 'topPassed';
                        if (newCallback) {
                            module.debug('Adding callback for top passed', newCallback);
                            settings.onTopPassed = newCallback;
                        }
                        if (calculations.topPassed) {
                            module.execute(callback, callbackName);
                        } else if (!settings.once) {
                            module.remove.occurred(callbackName);
                        }
                        if (newCallback === undefined) {
                            return calculations.topPassed;
                        }
                    },

                    bottomPassed(newCallback) {
                        const
                            calculations = module.get.elementCalculations();
                        const callback = newCallback || settings.onBottomPassed;
                        const callbackName = 'bottomPassed';
                        if (newCallback) {
                            module.debug('Adding callback for bottom passed', newCallback);
                            settings.onBottomPassed = newCallback;
                        }
                        if (calculations.bottomPassed) {
                            module.execute(callback, callbackName);
                        } else if (!settings.once) {
                            module.remove.occurred(callbackName);
                        }
                        if (newCallback === undefined) {
                            return calculations.bottomPassed;
                        }
                    },

                    passingReverse(newCallback) {
                        const
                            calculations = module.get.elementCalculations();
                        const callback = newCallback || settings.onPassingReverse;
                        const callbackName = 'passingReverse';
                        if (newCallback) {
                            module.debug('Adding callback for passing reverse', newCallback);
                            settings.onPassingReverse = newCallback;
                        }
                        if (!calculations.passing) {
                            if (module.get.occurred('passing')) {
                                module.execute(callback, callbackName);
                            }
                        } else if (!settings.once) {
                            module.remove.occurred(callbackName);
                        }
                        if (newCallback !== undefined) {
                            return !calculations.passing;
                        }
                    },


                    topVisibleReverse(newCallback) {
                        const
                            calculations = module.get.elementCalculations();
                        const callback = newCallback || settings.onTopVisibleReverse;
                        const callbackName = 'topVisibleReverse';
                        if (newCallback) {
                            module.debug('Adding callback for top visible reverse', newCallback);
                            settings.onTopVisibleReverse = newCallback;
                        }
                        if (!calculations.topVisible) {
                            if (module.get.occurred('topVisible')) {
                                module.execute(callback, callbackName);
                            }
                        } else if (!settings.once) {
                            module.remove.occurred(callbackName);
                        }
                        if (newCallback === undefined) {
                            return !calculations.topVisible;
                        }
                    },

                    bottomVisibleReverse(newCallback) {
                        const
                            calculations = module.get.elementCalculations();
                        const callback = newCallback || settings.onBottomVisibleReverse;
                        const callbackName = 'bottomVisibleReverse';
                        if (newCallback) {
                            module.debug('Adding callback for bottom visible reverse', newCallback);
                            settings.onBottomVisibleReverse = newCallback;
                        }
                        if (!calculations.bottomVisible) {
                            if (module.get.occurred('bottomVisible')) {
                                module.execute(callback, callbackName);
                            }
                        } else if (!settings.once) {
                            module.remove.occurred(callbackName);
                        }
                        if (newCallback === undefined) {
                            return !calculations.bottomVisible;
                        }
                    },

                    topPassedReverse(newCallback) {
                        const
                            calculations = module.get.elementCalculations();
                        const callback = newCallback || settings.onTopPassedReverse;
                        const callbackName = 'topPassedReverse';
                        if (newCallback) {
                            module.debug('Adding callback for top passed reverse', newCallback);
                            settings.onTopPassedReverse = newCallback;
                        }
                        if (!calculations.topPassed) {
                            if (module.get.occurred('topPassed')) {
                                module.execute(callback, callbackName);
                            }
                        } else if (!settings.once) {
                            module.remove.occurred(callbackName);
                        }
                        if (newCallback === undefined) {
                            return !calculations.onTopPassed;
                        }
                    },

                    bottomPassedReverse(newCallback) {
                        const
                            calculations = module.get.elementCalculations();
                        const callback = newCallback || settings.onBottomPassedReverse;
                        const callbackName = 'bottomPassedReverse';
                        if (newCallback) {
                            module.debug('Adding callback for bottom passed reverse', newCallback);
                            settings.onBottomPassedReverse = newCallback;
                        }
                        if (!calculations.bottomPassed) {
                            if (module.get.occurred('bottomPassed')) {
                                module.execute(callback, callbackName);
                            }
                        } else if (!settings.once) {
                            module.remove.occurred(callbackName);
                        }
                        if (newCallback === undefined) {
                            return !calculations.bottomPassed;
                        }
                    },

                    execute(callback, callbackName) {
                        const
                            calculations = module.get.elementCalculations();
                        const screen = module.get.screenCalculations();
                        callback = callback || false;
                        if (callback) {
                            if (settings.continuous) {
                                module.debug('Callback being called continuously', callbackName, calculations);
                                callback.call(element, calculations, screen);
                            } else if (!module.get.occurred(callbackName)) {
                                module.debug('Conditions met', callbackName, calculations);
                                callback.call(element, calculations, screen);
                            }
                        }
                        module.save.occurred(callbackName);
                    },

                    remove: {
                        fixed() {
                            module.debug('Removing fixed position');
                            $module
                                .removeClass(className.fixed)
                                .css({
                                    position: '',
                                    top: '',
                                    left: '',
                                    zIndex: '',
                                });
                            settings.onUnfixed.call(element);
                        },
                        placeholder() {
                            module.debug('Removing placeholder content');
                            if ($placeholder) {
                                $placeholder.remove();
                            }
                        },
                        occurred(callback) {
                            if (callback) {
                                const
                                    { occurred } = module.cache;
                                if (occurred[callback] !== undefined && occurred[callback] === true) {
                                    module.debug('Callback can now be called again', callback);
                                    module.cache.occurred[callback] = false;
                                }
                            } else {
                                module.cache.occurred = {};
                            }
                        },
                    },

                    save: {
                        calculations() {
                            module.verbose('Saving all calculations necessary to determine positioning');
                            module.save.direction();
                            module.save.screenCalculations();
                            module.save.elementCalculations();
                        },
                        occurred(callback) {
                            if (callback) {
                                if (module.cache.occurred[callback] === undefined || (module.cache.occurred[callback] !== true)) {
                                    module.verbose('Saving callback occurred', callback);
                                    module.cache.occurred[callback] = true;
                                }
                            }
                        },
                        scroll(scrollPosition) {
                            scrollPosition = scrollPosition + settings.offset || $context.scrollTop() + settings.offset;
                            module.cache.scroll = scrollPosition;
                        },
                        direction() {
                            const
                                scroll = module.get.scroll();
                            const lastScroll = module.get.lastScroll();
                            let direction;
                            if (scroll > lastScroll && lastScroll) {
                                direction = 'down';
                            } else if (scroll < lastScroll && lastScroll) {
                                direction = 'up';
                            } else {
                                direction = 'static';
                            }
                            module.cache.direction = direction;
                            return module.cache.direction;
                        },
                        elementPosition() {
                            const
                                { element } = module.cache;
                            const screen = module.get.screenSize();
                            module.verbose('Saving element position');
                            // (quicker than $.extend)
                            element.fits = (element.height < screen.height);
                            element.offset = $module.offset();
                            element.width = $module.outerWidth();
                            element.height = $module.outerHeight();
                            // compensate for scroll in context
                            if (module.is.verticallyScrollableContext()) {
                                element.offset.top += $context.scrollTop() - $context.offset().top;
                            }
                            if (module.is.horizontallyScrollableContext()) {
                                element.offset.left += $context.scrollLeft - $context.offset().left;
                            }
                            // store
                            module.cache.element = element;
                            return element;
                        },
                        elementCalculations() {
                            const
                                screen = module.get.screenCalculations();
                            const element = module.get.elementPosition()
            ;
            // offset
                            if (settings.includeMargin) {
                                element.margin = {};
                                element.margin.top = parseInt($module.css('margin-top'), 10);
                                element.margin.bottom = parseInt($module.css('margin-bottom'), 10);
                                element.top = element.offset.top - element.margin.top;
                                element.bottom = element.offset.top + element.height + element.margin.bottom;
                            } else {
                                element.top = element.offset.top;
                                element.bottom = element.offset.top + element.height;
                            }

                            // visibility
                            element.topPassed = (screen.top >= element.top);
                            element.bottomPassed = (screen.top >= element.bottom);
                            element.topVisible = (screen.bottom >= element.top) && !element.topPassed;
                            element.bottomVisible = (screen.bottom >= element.bottom) && !element.bottomPassed;
                            element.pixelsPassed = 0;
                            element.percentagePassed = 0;

                            // meta calculations
                            element.onScreen = (element.topVisible && !element.bottomPassed);
                            element.passing = (element.topPassed && !element.bottomPassed);
                            element.offScreen = (!element.onScreen);

                            // passing calculations
                            if (element.passing) {
                                element.pixelsPassed = (screen.top - element.top);
                                element.percentagePassed = (screen.top - element.top) / element.height;
                            }
                            module.cache.element = element;
                            module.verbose('Updated element calculations', element);
                            return element;
                        },
                        screenCalculations() {
                            const
                                scroll = module.get.scroll();
                            module.save.direction();
                            module.cache.screen.top = scroll;
                            module.cache.screen.bottom = scroll + module.cache.screen.height;
                            return module.cache.screen;
                        },
                        screenSize() {
                            module.verbose('Saving window position');
                            module.cache.screen = {
                                height: $context.height(),
                            };
                        },
                        position() {
                            module.save.screenSize();
                            module.save.elementPosition();
                        },
                    },

                    get: {
                        pixelsPassed(amount) {
                            const
                                element = module.get.elementCalculations();
                            if (amount.search('%') > -1) {
                                return (element.height * (parseInt(amount, 10) / 100));
                            }
                            return parseInt(amount, 10);
                        },
                        occurred(callback) {
                            return (module.cache.occurred !== undefined)
                                ? module.cache.occurred[callback] || false
                                : false;
                        },
                        direction() {
                            if (module.cache.direction === undefined) {
                                module.save.direction();
                            }
                            return module.cache.direction;
                        },
                        elementPosition() {
                            if (module.cache.element === undefined) {
                                module.save.elementPosition();
                            }
                            return module.cache.element;
                        },
                        elementCalculations() {
                            if (module.cache.element === undefined) {
                                module.save.elementCalculations();
                            }
                            return module.cache.element;
                        },
                        screenCalculations() {
                            if (module.cache.screen === undefined) {
                                module.save.screenCalculations();
                            }
                            return module.cache.screen;
                        },
                        screenSize() {
                            if (module.cache.screen === undefined) {
                                module.save.screenSize();
                            }
                            return module.cache.screen;
                        },
                        scroll() {
                            if (module.cache.scroll === undefined) {
                                module.save.scroll();
                            }
                            return module.cache.scroll;
                        },
                        lastScroll() {
                            if (module.cache.screen === undefined) {
                                module.debug('First scroll event, no last scroll could be found');
                                return false;
                            }
                            return module.cache.screen.top;
                        },
                    },

                    setting(name, value) {
                        if ($.isPlainObject(name)) {
                            $.extend(true, settings, name);
                        } else if (value !== undefined) {
                            settings[name] = value;
                        } else {
                            return settings[name];
                        }
                    },
                    internal(name, value) {
                        if ($.isPlainObject(name)) {
                            $.extend(true, module, name);
                        } else if (value !== undefined) {
                            module[name] = value;
                        } else {
                            return module[name];
                        }
                    },
                    debug() {
                        if (!settings.silent && settings.debug) {
                            if (settings.performance) {
                                module.performance.log(arguments);
                            } else {
                                module.debug = Function.prototype.bind.call(console.info, console, `${settings.name}:`);
                                module.debug.apply(console, arguments);
                            }
                        }
                    },
                    verbose() {
                        if (!settings.silent && settings.verbose && settings.debug) {
                            if (settings.performance) {
                                module.performance.log(arguments);
                            } else {
                                module.verbose = Function.prototype.bind.call(console.info, console, `${settings.name}:`);
                                module.verbose.apply(console, arguments);
                            }
                        }
                    },
                    error() {
                        if (!settings.silent) {
                            module.error = Function.prototype.bind.call(console.error, console, `${settings.name}:`);
                            module.error.apply(console, arguments);
                        }
                    },
                    performance: {
                        log(message) {
                            let
                                currentTime;
                            let executionTime;
                            let previousTime;
                            if (settings.performance) {
                                currentTime = new Date().getTime();
                                previousTime = time || currentTime;
                                executionTime = currentTime - previousTime;
                                time = currentTime;
                                performance.push({
                                    Name: message[0],
                                    Arguments: [].slice.call(message, 1) || '',
                                    Element: element,
                                    'Execution Time': executionTime,
                                });
                            }
                            clearTimeout(module.performance.timer);
                            module.performance.timer = setTimeout(module.performance.display, 500);
                        },
                        display() {
                            let
                                title = `${settings.name}:`;
                            let totalTime = 0;
                            time = false;
                            clearTimeout(module.performance.timer);
                            $.each(performance, function(index, data) {
                                totalTime += data['Execution Time'];
                            });
                            title += ` ${totalTime}ms`;
                            if (moduleSelector) {
                                title += ` '${moduleSelector}'`;
                            }
                            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
                                console.groupCollapsed(title);
                                if (console.table) {
                                    console.table(performance);
                                } else {
                                    $.each(performance, function(index, data) {
                                        console.log(`${data.Name}: ${data['Execution Time']}ms`);
                                    });
                                }
                                console.groupEnd();
                            }
                            performance = [];
                        },
                    },
                    invoke(query, passedArguments, context) {
                        let
                            object = instance;
                        let maxDepth;
                        let found;
                        let response;
                        passedArguments = passedArguments || queryArguments;
                        context = element || context;
                        if (typeof query === 'string' && object !== undefined) {
                            query = query.split(/[\. ]/);
                            maxDepth = query.length - 1;
                            $.each(query, function(depth, value) {
                                const camelCaseValue = (depth != maxDepth)
                                    ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                                    : query;
                                if ($.isPlainObject(object[camelCaseValue]) && (depth != maxDepth)) {
                                    object = object[camelCaseValue];
                                } else if (object[camelCaseValue] !== undefined) {
                                    found = object[camelCaseValue];
                                    return false;
                                } else if ($.isPlainObject(object[value]) && (depth != maxDepth)) {
                                    object = object[value];
                                } else if (object[value] !== undefined) {
                                    found = object[value];
                                    return false;
                                } else {
                                    module.error(error.method, query);
                                    return false;
                                }
                            });
                        }
                        if ($.isFunction(found)) {
                            response = found.apply(context, passedArguments);
                        } else if (found !== undefined) {
                            response = found;
                        }
                        if ($.isArray(returnedValue)) {
                            returnedValue.push(response);
                        } else if (returnedValue !== undefined) {
                            returnedValue = [returnedValue, response];
                        } else if (response !== undefined) {
                            returnedValue = response;
                        }
                        return found;
                    },
                };

                if (methodInvoked) {
                    if (instance === undefined) {
                        module.initialize();
                    }
                    instance.save.scroll();
                    instance.save.calculations();
                    module.invoke(query);
                } else {
                    if (instance !== undefined) {
                        instance.invoke('destroy');
                    }
                    module.initialize();
                }
            });
        return (returnedValue !== undefined)
            ? returnedValue
            : this;
    };

    $.fn.visibility.settings = {

        name: 'Visibility',
        namespace: 'visibility',

        debug: false,
        verbose: false,
        performance: true,

        // whether to use mutation observers to follow changes
        observeChanges: true,

        // check position immediately on init
        initialCheck: true,

        // whether to refresh calculations after all page images load
        refreshOnLoad: true,

        // whether to refresh calculations after page resize event
        refreshOnResize: true,

        // should call callbacks on refresh event (resize, etc)
        checkOnRefresh: true,

        // callback should only occur one time
        once: true,

        // callback should fire continuously whe evaluates to true
        continuous: false,

        // offset to use with scroll top
        offset: 0,

        // whether to include margin in elements position
        includeMargin: false,

        // scroll context for visibility checks
        context: window,

        // visibility check delay in ms (defaults to animationFrame)
        throttle: false,

        // special visibility type (image, fixed)
        type: false,

        // z-index to use with visibility 'fixed'
        zIndex: '10',

        // image only animation settings
        transition: 'fade in',
        duration: 1000,

        // array of callbacks for percentage
        onPassed: {},

        // standard callbacks
        onOnScreen: false,
        onOffScreen: false,
        onPassing: false,
        onTopVisible: false,
        onBottomVisible: false,
        onTopPassed: false,
        onBottomPassed: false,

        // reverse callbacks
        onPassingReverse: false,
        onTopVisibleReverse: false,
        onBottomVisibleReverse: false,
        onTopPassedReverse: false,
        onBottomPassedReverse: false,

        // special callbacks for image
        onLoad() {},
        onAllLoaded() {},

        // special callbacks for fixed position
        onFixed() {},
        onUnfixed() {},

        // utility callbacks
        onUpdate: false, // disabled by default for performance
        onRefresh() {},

        metadata: {
            src: 'src',
        },

        className: {
            fixed: 'fixed',
            placeholder: 'placeholder',
            visible: 'visible',
        },

        error: {
            method: 'The method you called is not defined.',
            visible: 'Element is hidden, you must call refresh after element becomes visible',
        },

    };
}(jQuery, window, document));