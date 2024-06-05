sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/ValueState"
],
    function (Controller, Filter, FilterOperator, ValueState) {
        "use strict";

        return Controller.extend("br.com.gestao.fioriappreport362.controller.Lista", {
            onInit: function () {
                var oConfiguration = sap.ui.getCore().getConfiguration();
                oConfiguration.setFormatLocale("pt-BR");
            },

            onSearch: function () {
                // Capturando individualmente cada objeto Input do objeto Filter Bar
                var oProdutoInput = this.getView().byId("productIdInput");
                var oProdutoNomeInput = this.getView().byId("productNameInput");

                var oFilter = new Filter({
                    filters: [
                        new Filter("ProductId", FilterOperator.Contains, oProdutoInput.getValue()),
                        new Filter("Name", FilterOperator.Contains, oProdutoNomeInput.getValue())
                    ],
                    and: true
                });

                // Criação do objeto List e acesso à agregação Items onde será aplicado o filtro
                var oTable = this.getView().byId("tableProdutos");
                var binding = oTable.getBinding("items");

                // Aplicação do filtro para o Databinding
                binding.filter(oFilter);
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

            onRouting: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Detalhes");
            },

            onSelectedItem: function (evt) {
                // Passo 1- Captura do valor do produto
                var oProductId = evt.getSource().getBindingContext().getProperty("Productid");

                // Passo 2- Envio para o Route de Detalhes com parâmetro
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Detalhes", {
                    productId: oProductId,
                    fornecedorId: "valorXPto",
                    ordemId: "valorZYW"
                });
            }
        });
    }
);
