sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("br.com.filters.filters.controller.Filters", {
            onInit: function () {

            },

            onFilterSimples: function (evt) {

                //new sap.ui.model.Filter(sPath, sOperator, vValue1, vValue2);
                //new sap.ui.model.Filter(sPath, fnTest);
                //new sap.ui.model.Filter(aFilters, bAnd);

                debugger;
                //Recebendo o valor do objeto Search Field
                var oValor = evt.getSource().getValue();

                // Cria o objeto Filter baseado no valor do objeto Search Field
                //var oFilter = new Filter("ProductName", FilterOperator.Contains, oValor);
                var oFilter = new Filter("UnitsInStock", FilterOperator.BT, oValor, 90);


                // Criação do objeto List e acesso a agregação Items onde sabemos qual a entidade onde será aplicado o filtro
                var oList = this.getView().byId("list0");
                var binding = oList.getBinding("items");

                // É aplicado o filtro para o Databinding
                binding.filter(oFilter);


            },

            onFilterComplexo: function (evt) {
                debugger;

                //Recebendo o valor do objeto Search Field
                var oValor = evt.getSource().getValue();

                var oFilter = new Filter({
                    filters: [
                        new Filter("ProductName", FilterOperator.Contains, oValor),
                        new Filter("QuantityPerUnit", FilterOperator.Contains, oValor),
                        new Filter("Category/CategoryName", FilterOperator.Contains, oValor)
                    ],
                    and: false
                })

                // Criação do objeto List e acesso a agregação Items onde sabemos qual a entidade onde será aplicado o filtro
                var oList = this.getView().byId("list0");
                var binding = oList.getBinding("items");

                // É aplicado o filtro para o Databinding
                binding.filter(oFilter);


            }

        });
    });
