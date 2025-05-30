"use strict";
function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}
(function () {
    function objectTag(data) {
        return Object.prototype.toString.call(data).slice(8, -1);
    }
    function merge(source, merged) {
        for (var key in merged) {
            if (objectTag(merged[key]) === "Object") {
                if (_typeof(source[key]) !== "object") source[key] = {};
                source[key] = merge(source[key], merged[key]);
            } else {
                source[key] = merged[key];
            }
        }
        return source;
    }
    function detectIE() {
        var ua = window.navigator.userAgent,
            msie = ua.indexOf("MSIE "),
            trident = ua.indexOf("Trident/"),
            edge = ua.indexOf("Edge/");
        if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
        }
        if (trident > 0) {
            var rv = ua.indexOf("rv:");
            return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
        }
        if (edge > 0) {
            return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
        }
        return false;
    }
    function ZemezCore(options) {
        var _this = this;
        var isIE = detectIE();
        if (isIE !== false && isIE < 12) {
            console.warn("[ZemezCore] detected IE" + isIE + ", load alert");
            var script = document.createElement("script");
            script.src = "./assets/js/support.js";
            document.querySelector("head").appendChild(script);
        } else {
            this.init(options);
        }
    }
    ZemezCore.defaults = { observeDOM: true, debug: false };
    ZemezCore.prototype.init = function (options) {
        var _this2 = this;
        merge(this, ZemezCore.defaults);
        merge(this, options);
        this.initComponents();
        if (this.observeDOM) {
            var observer = new MutationObserver(function (mutationsList) {
                mutationsList.forEach(function (mutation) {
                    if (mutation.type === "childList" && mutation.addedNodes.length) {
                        mutation.addedNodes.forEach(function (node) {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                _this2.initComponents(node);
                            }
                        });
                    }
                });
            });
            observer.observe(document, { childList: true, subtree: true });
        }
    };
    ZemezCore.prototype.checkComponent = function (name) {
        return new Promise(function (resolve) {
            var component = window.components[name];
            if (!component || component.state === "absent") {
                resolve();
            } else {
                if (component.state === "ready") {
                    resolve();
                } else {
                    window.addEventListener("".concat(name, ":readyScripts"), resolve);
                }
            }
        });
    };
    ZemezCore.prototype.makeAsync = function (params, cb) {
        var inclusions = [];
        params.forEach(function (path) {
            inclusions.push(cb(path));
        });
        return Promise.all(inclusions);
    };
    ZemezCore.prototype.makeSync = function (params, cb) {
        var chain = Promise.resolve();
        params.forEach(function (path) {
            chain = chain.then(cb.bind(null, path));
        });
        return chain;
    };
    ZemezCore.prototype.includeStyles = function (path) {
        return new Promise(function (resolve) {
            if (document.querySelector('link[href="'.concat(path, '"]'))) {
                resolve();
            } else {
                var link = document.createElement("link");
                link.setAttribute("rel", "stylesheet");
                link.setAttribute("href", path);
                link.addEventListener("load", resolve);
                document.querySelector("head").appendChild(link);
            }
        });
    };
    ZemezCore.prototype.includeScript = function (path) {
        return new Promise(function (resolve) {
            //var node = document.querySelector('script[src="'.concat(path, '"]'));
			var node = document.querySelector('script[src="' + path + '"]');			
            if (node) {
                if (node.getAttribute("data-loaded") === "true") {
                    resolve();
                } else {
                    node.addEventListener("load", resolve);
                }
            } else {
                var script = document.createElement("script");
                script.src = path;
                script.addEventListener("load", function () {
                    script.setAttribute("data-loaded", "true");
                    resolve();
                });
                document.querySelector("head").appendChild(script);
            }
        });
    };
    ZemezCore.prototype.initComponent = function (component) {
        var stylesState = Promise.resolve(),
            scriptsState = Promise.resolve();
        if (this.debug) console.log("%c[".concat(component.name, "] init:"), "color: lightgreen; font-weight: 900;", component.nodes.length);
        component.state = "load";
        if (component.styles) {
            stylesState = stylesState.then(this.makeAsync.bind(null, component.styles, this.includeStyles));
        }
        if (component.script) {
            scriptsState = scriptsState.then(this.makeSync.bind(null, component.script, this.includeScript));
        }
        if (component.dependencies) {
            scriptsState = scriptsState.then(this.makeSync.bind(null, component.dependencies, this.checkComponent));
        }
        if (component.init) {
            scriptsState = scriptsState.then(component.init.bind(null, component.nodes));
        }
        stylesState.then(function () {
            window.dispatchEvent(new CustomEvent("".concat(component.name, ":readyStyles")));
        });
        scriptsState.then(function () {
            window.dispatchEvent(new CustomEvent("".concat(component.name, ":readyScripts")));
            component.state = "ready";
        });
        return { scriptsState: scriptsState, stylesState: stylesState };
    };
    ZemezCore.prototype.initComponents = function (node) {
        var _this3 = this;
        var stylesPromises = [],
            scriptsPromises = [];
        if (!window.components) throw new Error("window.components is not defined");
        components = window.components;
        node = node || document;
        for (var key in components) {
            var component = components[key];
            component.name = key;
            component.nodes = Array.from(node.querySelectorAll(component.selector));
            if (node.constructor.name === "HTMLElement" && node.matches(component.selector)) {
                component.nodes.unshift(node);
            }
            if (component.styles && !(component.styles instanceof Array)) {
                component.styles = [component.styles];
            }
            if (component.script && !(component.script instanceof Array)) {
                component.script = [component.script];
            }
            if (component.dependencies && !(component.dependencies instanceof Array)) {
                component.dependencies = [component.dependencies];
            }
            if (component.nodes.length) {
                component.state = "pending";
            } else {
                component.state = "absent";
            }
        }
        for (var _key in components) {
            var _component = components[_key];
            if (_component.state === "pending") {
                var componentPromises = this.initComponent(_component);
                stylesPromises.push(componentPromises.stylesState);
                scriptsPromises.push(componentPromises.scriptsState);
            }
        }
        Promise.all(scriptsPromises).then(function () {
            if (_this3.debug) console.log("%c[components]: ready", "color: orange; font-weight: 900;");
            window.dispatchEvent(new CustomEvent("components:ready"));
        });
        Promise.all(stylesPromises).then(function () {
            if (_this3.debug) console.log("%c[components]: stylesReady", "color: orange; font-weight: 900;");
            window.dispatchEvent(new CustomEvent("components:stylesReady"));
        });
    };
    if (!window.ZemezCore) {
        window.ZemezCore = ZemezCore;
    }
}.call());
