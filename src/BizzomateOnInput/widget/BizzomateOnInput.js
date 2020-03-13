define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",

    "dojo/dom-class",
    "dojo/dom-prop",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/lang",
    "dojo/html",

    "dojo/text!BizzomateOnInput/widget/template/BizzomateOnInput.html"
], function (declare, _WidgetBase, _TemplatedMixin, dojoClass, dojoProp, dojoStyle, dojoConstruct, dojoLang, dojoHtml, widgetTemplate) {
    "use strict";

    return declare("BizzomateOnInput.widget.BizzomateOnInput", [_WidgetBase, _TemplatedMixin], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // DOM elements
        onInputNode: null,
        onInputDiv: null,

        // Internal variables.
        _handles: null,
        _contextObj: null,
        _onInputTimeOut: null,

        // Parameters configured in the Modeler.
        onInputAttribute: "",
        onInputDelay: "",
        onInputMF: "",
        onInputPlaceholder: "",

        constructor: function () {
            // Uncomment the following line to enable debug messages
            //logger.level(logger.DEBUG);

            this._handles = [];
        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate");

            if (this.onInputPlaceholder) {
                dojoProp.set(this.onInputNode, "placeholder", this.onInputPlaceholder);
            }
            this.connect(this.onInputNode, "oninput", dojoLang.hitch(this, this._onInput));
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            if (this._contextObj) {
                this._resetSubscriptions();
            }
            this._updateRendering(callback);
        },

        resize: function (box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function () {
            logger.debug(this.id + ".uninitialize");
        },

        _onInput: function (e) {
            logger.debug(this.id + "._onKeyDown");

            this._contextObj.set(this.onInputAttribute, this.onInputNode.value);
            clearTimeout(this._onInputTimeOut);
            this._onInputTimeOut = setTimeout(() => { this._execMf(this.onInputMF, this._contextObj.getGuid()) }, this.onInputDelay);
        },

        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");

            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");
                this.onInputNode.value = this._contextObj.get(this.onInputAttribute);
            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }

            this._clearValidations();
            this._executeCallback(callback, "_updateRendering");
        },

        // Handle validations.
        _handleValidation: function (validations) {
            logger.debug(this.id + "._handleValidation");
            this._clearValidations();

            var validation = validations[0],
                message = validation.getReasonByAttribute(this.onInputAttribute);

            if (!this._readOnly && message) {
                this._addValidation(message);
            }
            validation.removeAttribute(this.onInputAttribute);
        },

        // Clear validations.
        _clearValidations: function () {
            logger.debug(this.id + "._clearValidations");
            dojoClass.remove(this.domNode, "has-error");
            dojoConstruct.destroy(this._alertDiv);
            this._alertDiv = null;
        },

        // Add a validation.
        _addValidation: function (message) {
            logger.debug(this.id + "._addValidation");
            if (this._alertDiv !== null) {
                dojoHtml.set(this._alertDiv, message);
                return true;
            }
            this._alertDiv = dojoConstruct.create("div", {
                "class": "alert alert-danger mx-validation-message",
                "innerHTML": message
            });
            dojoConstruct.place(this._alertDiv, this.onInputDiv);
            dojoClass.add(this.domNode, "has-error");
        },

        // Shorthand for running a microflow
        _execMf: function (mf, guid, cb) {
            logger.debug(this.id + "._execMf");
            if (mf && guid) {
                mx.ui.action(mf, {
                    params: {
                        applyto: "selection",
                        guids: [guid]
                    },
                    callback: dojoLang.hitch(this, function (objs) {
                        if (cb && typeof cb === "function") {
                            cb(objs);
                        }
                    }),
                    error: function (error) {
                        console.debug(error.description);
                    }
                }, this);
            }
        },

        _resetSubscriptions: function () {
            logger.debug(this.id + "._resetSubscriptions");
            this.unsubscribeAll();

            // When a mendix object exists create subscribtions.
            if (this._contextObj) {
                this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: dojoLang.hitch(this, function (guid) {
                        this._updateRendering();
                    })
                });

                this.subscribe({
                    guid: this._contextObj.getGuid(),
                    attr: this.onInputAttribute,
                    callback: dojoLang.hitch(this, function (guid, attr, attrValue) {
                        this._updateRendering();
                    })
                });

                this.subscribe({
                    guid: this._contextObj.getGuid(),
                    val: true,
                    callback: dojoLang.hitch(this, this._handleValidation)
                });
            }
        },

        // Shorthand for executing a callback, adds logging to your inspector
        _executeCallback: function (cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["BizzomateOnInput/widget/BizzomateOnInput"]);
