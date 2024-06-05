sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function (Controller) {
        "use strict";

        return Controller.extend("br.com.gestao.fioriappreport362.controller.Detalhes", {

            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Detalhes").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                var oArgs = oEvent.getParameter("arguments");
                var sProductId = oArgs.productId;
                this._bindView("/Produtos('" + sProductId + "')");
            },

            _bindView: function (sObjectPath) {
                var oView = this.getView();

                oView.bindElement({
                    path: sObjectPath,
                    parameters: { expand: 'to_cat' },
                    events: {
                        change: this._onBindingChange.bind(this),
                        dataRequested: function () {
                            oView.setBusy(true);
                        },
                        dataReceived: function () {
                            oView.setBusy(false);
                        }
                    }
                });
            },

            _onBindingChange: function () {
                var oView = this.getView();
                var oElementBinding = oView.getElementBinding();

                // Check if data is available
                if (!oElementBinding.getBoundContext()) {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.getTargets().display("objNotFound");
                }
            },

            onNavBack: function () {
                var oHistory = sap.ui.core.routing.History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("Lista", {}, true);
                }
            },

            date: function(value) {

                var oConfiguration= sap.ui.getCore().getConfiguration();
                var oLocale = oConfiguration.getFormatLocale();
                var oPattern = "";
                if(oLocale === "pt-BR"){
                    oPattern = "dd/MM//yyyy";
                }else{
                    oPattern = "MM/dd//yyyy";
                }

                if(value){
                    var year =new Date().getFullYear();
                    if (year === 9999) {
                        return "";
                    }else {
                        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                            pattern: oPattern
                        });
                        return oDateFormat.format(new Date(value));
                    }
                }else{
                    return value;
                }
            },

            statusProduto: function (value) {
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                try {
                    return oBundle.getText("status" + value);
                } catch (err) {
                    return "";
                }

                
            },

            stateProduto: function (value) {
                try {
                    if (value === "E"){
                        return "Success";
                    }else if (value === "P"){
                        return "Warning";
                    }else if (value === "F"){
                        return"Error";
                    }else{
                        return "None";
                    }
                    
                    } catch(err){
                        return "None";
                    }
            },

            iconProduto: function (value) {
                try {
                    switch (value) {
                        case "E":
                            return "sap-icon://sys-enter-2";
                        case "P":
                            return "sap-icon://alert";
                        case "F":
                            return "sap-icon://error";
                        default:
                            return "None";
                    }
                } catch (err) {
                    return "None";
                }
            },
        });
    }
);
