sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("purchaseorder.controller.Main", {
            onInit: function () {
                // oModelLocal.create("/ZC_PURCHASE_ORDER_API01", oEntry, {

                // });
            },

            onClickSendCPI: function () {
                const oModel = this.getOwnerComponent().getModel();
                let oSmartTable = this.byId("LineItemsSmartTable");
                let oTable = oSmartTable.getTable();
                let aDados = [];

                // sap.ui.table.Table
                let aIndices = oTable.getSelectedIndices();

                if (aIndices.length === 0) { return; }

                aIndices.forEach(function (iIndex) {
                    let oData = oTable.getContextByIndex(iIndex).getObject();
                    const requisicao = {
                        PurchaseOrder: oData.PurchaseOrder,
                        PurchaseOrderType: oData.PurchaseOrderType,
                        PurchasingDocumentOrigin: oData.PurchasingDocumentOrigin,
                        CreatedByUser: oData.CreatedByUser,
                        CreationDate: oData.CreationDate,
                        PurchaseOrderDate: oData.PurchaseOrderDate,
                        CompanyCode: oData.CompanyCode,
                        PurchasingOrganization: oData.PurchasingOrganization,
                        PurchasingGroup: oData.PurchasingGroup,
                        Supplier: oData.Supplier
                    };

                    aDados.push(requisicao);
                });

                let json = JSON.stringify(aDados);

                sap.ui.core.BusyIndicator.show();
                oModel.callFunction("/send_cpi", {
                    method: "POST",
                    urlParameters: json,
                    success: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                        console.log(oData);
                    },
                    error: function (oError) {
                        console.log(oError);
                        sap.ui.core.BusyIndicator.hide();
                    },
                });
            }
        });
    });