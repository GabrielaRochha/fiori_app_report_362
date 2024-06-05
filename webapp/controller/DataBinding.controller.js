sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/TextArea",
    "sap/ui/layout/form/SimpleForm"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
        function (Controller, Label, Input, TextArea, SimpleForm) {
        "use strict";

        return Controller.extend("br.com.gestao.fioriappreport362.controller.DataBinding", {
            onInit: function () {

                var ObjModelJSON = new sap.ui.model.json.JSONModel();
                ObjModelJSON.loadData("dados/Produtos.Json");
                this.getView().setModel(ObjModelJSON, "Model_JSON_Produtos");

            }
            
            
        });
    });
